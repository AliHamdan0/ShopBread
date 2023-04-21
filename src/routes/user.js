const { Router } = require('express');
const multer = require('multer');
const { registerUser, loginUser, userInfo } = require('../controllers/user');
const validateToken = require('../middlewares/validateTokenHandler');
const userRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/upload/'); //null for error
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else cb(null, false); //it doesn't throw an error but it will reject the file
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

userRouter.post('/login', loginUser);

userRouter.post('/register', upload.single('image'), registerUser);

userRouter.get('/user-info', validateToken, userInfo);

module.exports = userRouter;
