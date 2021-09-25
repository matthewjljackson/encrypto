import {Request, Response} from 'express';
const User = require("../models/User");
const jwt = require('jsonwebtoken');
import { IUser } from '../interfaces/IUser';

const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors:any = { username: '', password: '' };

  // register username error
  if (err.code === 11000) {
    errors.username = 'that username is already registered';
  }
  
  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }:any) => {
      errors[properties.path] = properties.message;
    });
  }
  
  //handle login errors here
  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password'
  };
  if (err.message === 'that username does not exist') {
    errors.username = 'that username does not exist'
  }
  return errors;
}

const maxAge = 24 * 60 * 60;
const createToken = (id:string) => {
  return jwt.sign({ id }, 'super duper secret password', {
    expiresIn: maxAge  // expects time in seconds
  });
};

const registerPost = async (req:Request, res:Response) => {
  console.log('register post request');
  const { username, password }:IUser = req.body;
  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ id: user._id, username: user.username });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

const loginPost = async (req:Request, res:Response) => {
  console.log('login post request');
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
}

module.exports = {
  loginPost,
  registerPost
}