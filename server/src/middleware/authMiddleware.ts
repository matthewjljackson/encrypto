import jwt from 'jsonwebtoken';

import {NextFunction, Request,Response} from "express";

export const requireAuth = (req: Request, res: Response, next:NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'super duper secret password');
      console.log(decodedToken)
      res.locals.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
    } 
  } else {
     console.log('not carrying verified jwt')
    }
  }



    // jwt.verify(token, 'super duper secret password', (err, decodedToken) => {
    //   if (err) {
    //     console.log(err.message);
    //   } else {
    //     console.log(decodedToken)
    //     next();
    //   }
    // })