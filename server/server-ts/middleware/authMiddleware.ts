const jwt = require('jwt');

const requireAuth = (req: any, res: any, next:()=>{}) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'super duper secret password', (err:Error, decodedToken: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(decodedToken)
        next();
      }
    })
  } else {
    console.log('not carrying verified jwt')
  }
}