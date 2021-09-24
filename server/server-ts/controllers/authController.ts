import {Request, Response} from 'express';
const User = require("../models/User");
const jwt = require('jsonwebtoken');
import { IUser } from '../interfaces/IUser';


// handle errors
const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors:any = { username: '', password: '' };

  // duplicate username error
  if (err.code === 11000) {
    errors.username = 'that username is already registered';
    // return errors;
    // console.log(errors)
  }
  
  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }:any) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
    // console.log(errors)
  }
  
  //handle login errors here
  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password'
  };
  if (err.message === 'that username does not exist') {
    errors.username = 'that username does not exist'
  }
  // console.log(errors)
  return errors;
}


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id:string) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge  // expects time in seconds
  });
};

// controller actions
module.exports.signup_get = (req:Request, res:Response) => {
  console.log('get sign up');
}

module.exports.login_get = (req:Request, res:Response) => {
  console.log('get login');
}

module.exports.signup_post = async (req:Request, res:Response) => {
  console.log('signup post')
  const { username, password }:IUser = req.body;

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // console.log(res.cookie)
    res.status(201).json({ id: user._id, username: user.username });
  }
  catch(err: any) {
    // res.status(400).send('an error occured');
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req:Request, res:Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.login( username, password );
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ id: user._id, username: user.username });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
  // console.log(username, password);
  // res.send('user login');
}