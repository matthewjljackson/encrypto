"use strict";
const jwt = require('jwt');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'super duper secret password', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        console.log('not carrying verified jwt');
    }
};
