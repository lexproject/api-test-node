const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const { userNotFaund } = require('../errors/notFaundError');
const { dubleNameError } = require('../errors/conflictError');
const { userCreateError } = require('../errors/dataError');
const { secretKey } = require('../utils/utils');

module.exports.login = (req, res, next) => {
  const {
    name, password,
  } = req.body;
  return User.findUserByCredentials(name, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretKey,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      password: hash, name,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(dubleNameError);
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(userCreateError);
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { return Promise.reject(userNotFaund); }
      return res.send({ data: user });
    })
    .catch(next);
};

