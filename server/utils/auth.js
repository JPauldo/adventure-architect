const jwt = require('jsonwebtoken');

// HIDE SECRET IN ENV
// Set token secret and expiration date
const secret = `secret`;
const expiration = '2h';

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function ({ req }) {
    // Allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log(err);
      console.log('\nInvalid token');
    }

    return req;
  },
  
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
