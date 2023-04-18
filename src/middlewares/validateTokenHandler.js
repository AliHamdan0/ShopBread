const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req?.headers?.Authorization || req?.headers?.authorization;
  if (token && token.startsWith('Bearer')) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('token is not valid');
      }
      req.user = decoded.user; //we add user info that we got from the token to the request
      next();
    });
  } else {
    res.status(401);
    throw new Error('no access token is provided');
  }
};
module.exports = validateToken;
