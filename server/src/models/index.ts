import mongoose from 'mongoose';

export const connectDb = () => {
  try {
    console.log('connecting to mongoose');
    return mongoose.connect(
      `mongodb://localhost:27017/${
        process.env.NODE_ENV === 'test' ? 'encrypto-test' : 'encrypto'
      }`
    );
  } catch (error) {
    console.log(error);
  }
};
