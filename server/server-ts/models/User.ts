import {Schema,model} from 'mongoose';
const bcrypt = require('bcrypt');

interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    // lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});


// fire a function before doc saved to db
userSchema.pre('save', async function(this: IUser, next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(username: string, password: string) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('that username does not exist')
}

const User = model<IUser>('user', userSchema);

module.exports = User;