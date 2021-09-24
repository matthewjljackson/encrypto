const { Router } = require('express');
import {Request, Response} from 'express';
const authController = require('../controllers/authController');

const router = Router();

router.get('/ass', (req: any,res:Response) => {
  const token:any = req.cookies.jwt
  console.log(token)
  res.send();
})
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = { router };