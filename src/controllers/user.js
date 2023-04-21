const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

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
    image: `https://shop-bread.onrender.com/api/${req.file.path}`,
  });
  if (newUser) {
    res.status(200);
    res.json({ msg: 'create a new user successfully' });
  } else {
    throw new Error('could not add a new user');
  }
});

// login user
// post /login
// public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const user = await Users.findOne({ email }).lean();
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
    delete user._id;
    delete user.password;
    res.status(200).json({ accessToken, user });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

// get user info
// get /user-info
// private
const userInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await Users.findById(userId).lean();
  if (!user) {
    res.status(401);
    throw new Error('user is not exist');
  }
  delete user._id;
  delete user.password;
  res.status(200).json({ user });
});

module.exports = {
  registerUser,
  loginUser,
  userInfo,
};
