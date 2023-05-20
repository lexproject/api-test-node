const router = require('express').Router();
const userRouter = require('./users');
const postRouter = require('./posts');
const { createUser, login } = require('../controllers/users');
const { getPosts,getCount } = require('../controllers/posts');
const auth = require('../middlewares/auth');
const {
  signinValidate,
  signupValidate,
} = require('../utils/validate');


router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.get('/count', getCount);
router.get('/posts/:id', getPosts);
router.use(auth);
router.use('/users', userRouter);
router.use('/post', postRouter);

module.exports = router;