import { Schema,model, Model } from 'mongoose';
const bcrypt = require('bcrypt');

interface IUser {
  username: string;
  password: string;
  coins?: any[];
  login?: any
}

interface userModel extends Model<IUser> {
  login(a:any,b:any): any
}

const userSchema = new Schema<IUser, userModel>({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  coins: [{ type: Schema.Types.ObjectId, ref: 'coin', required: false }]
});

// fire a function before doc saved to db
userSchema.pre('save', async function(this: any, next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  const x = await bcrypt.compare('codeworks', "$2b$10$jW3ZBPXU8fc2C103nZ4x.uKOcpGrxbZWADzDJ7/rKHt0IxC2qgPjS")
  console.log('hi',x)
  next();
});

// static method to login user
// userSchema.statics.login = async function(username: string, password: string) {
//   const user = await this.findOne({ username });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password')
//   }
//   throw Error('that username does not exist')
// }

userSchema.static('login', async function(username: string, password: string) {
  const user = await this.findOne({ username });
  console.log(user)
  if (user) {
    let auth = await bcrypt.compare(password, user.password);
    console.log(auth)
    if (auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('that username does not exist')
} )

const coinSchema = new Schema<any>({
  owner: { type: Schema.Types.ObjectId, ref: 'user', required:true },
  symbol: { type: String, required: true },
  openPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Number, required: true }
})

export const Coin = model<any>('coin', coinSchema);
export const User = model<IUser, userModel>('user', userSchema);