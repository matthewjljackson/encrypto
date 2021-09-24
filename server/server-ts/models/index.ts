import mongoose from "mongoose";

const connectDb = () => {
  try {
    console.log('connecting to mongoose');
    return mongoose.connect('mongodb://localhost:27017/loginjwt');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {connectDb};