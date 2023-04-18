const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// login user
// post /login
// public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const user = await Users.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('user is not exist');
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1week',
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

// register user
// post /register
// public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const checkUser = await Users.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error('user already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(200);
    res.json({ msg: 'create a new user successfully' });
  } else {
    throw new Error('could not add a new user');
  }
});

module.exports = {
  loginUser,
  registerUser,
};
