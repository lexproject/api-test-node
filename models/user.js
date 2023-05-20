const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { loginError } = require('../errors/authError');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,    
		unique: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  toObject: { useProjection: true, versionKey: false },
  toJSON: { useProjection: true, versionKey: false },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(name, password) {
  return this.findOne({ name }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(loginError);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(loginError);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
