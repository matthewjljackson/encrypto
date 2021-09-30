import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { Coin } from '../models/User';
const bcrypt = require('bcrypt');

const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors: any = { username: '', password: '' };
  // register username error
  if (err.code === 11000) {
    errors.username = 'that username is already registered';
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }
  //handle login errors here
  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password';
  }
  if (err.message === 'that username does not exist') {
    errors.username = 'that username does not exist';
  }
  return errors;
};

const maxAge = 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, 'super duper secret password', {
    expiresIn: maxAge, // expects time in seconds
  });
};

export const registerPost = async (req: Request, res: Response) => {
  console.log('register post request');
  const { username, password }: IUser = req.body;
  try {
    const user = await User.create<any>({ username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const loginPost = async (req: Request, res: Response) => {
  console.log('login post request');
  const { username, password } = req.body;
  console.log(password);
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    console.log(token, user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ id: user._id, username: user.username });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const coinsGet = async (req: Request, res: Response) => {
  console.log('coin getting');
  try {
    const user: any = await User.findById({ _id: res.locals.user.id }).populate(
      'coins'
    );
    console.log(user);
    res.status(200);
    if (user) {
      res.json(user.coins);
    } else {
      res.json({ error: "couldn't find coins" });
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const coinsPost = async (req: Request, res: Response) => {
  console.log('coin posting');
  const { symbol, openPrice, quantity, startDate } = req.body;
  try {
    const owner: any = await User.findById(res.locals.user.id);
    const addCoin = await Coin.create({
      owner: owner._id,
      symbol: symbol.toUpperCase(),
      openPrice,
      quantity,
      timestamp: startDate,
    });
    const addCoinsToUser = await owner.coins.push(addCoin._id);
    await owner.save();
    res.status(200).json({ status: 'coins added' });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const coinsDelete = async (req: Request, res: Response) => {
  console.log('coin deleting');
  const { _id } = req.body;
  try {
    const owner: any = await User.findById(res.locals.user.id);
    const coinDoc: any = await Coin.deleteOne({ _id });
    await owner.coins.pull({ _id });
    await owner.save();
    res.status(200).json({ status: 'coins deleted' });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
