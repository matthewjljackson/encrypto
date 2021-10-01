import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { Coin } from './Coin';

export class User {
  @prop({ required: [true, 'Please enter a username'], unique: true })
  username!: string;

  @prop({
    required: [true, 'Please enter a password'],
    minLength: [6, 'Minimum password length is 6 characters'],
  })
  password!: string;

  @prop({ ref: () => 'Coin' })
  public coins?: Ref<Coin>[];

  public static async login(
    this: ReturnModelType<typeof User>,
    username: string,
    password: string
  ) {
    const user = await this.findOne({ username });

    if (!user) throw Error('that username does not exist');

    let isValidLogin = await bcrypt.compare(password, user.password);

    if (!isValidLogin) throw Error('incorrect password');

    return user;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
