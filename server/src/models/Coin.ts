import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';

export class Coin {
  @prop({ ref: () => 'User' })
  owner!: Ref<User>;

  @prop()
  symbol!: string;

  @prop()
  openPrice!: number;

  @prop()
  quantity!: number;

  @prop()
  timestamp!: number;
}

const CoinModel = getModelForClass(Coin);

export default CoinModel;
