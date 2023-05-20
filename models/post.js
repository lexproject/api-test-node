const mongoose = require('mongoose');
const validator = require('validator');
const { movieNotFaund } = require('../errors/notFaundError');
const { permisionError } = require('../errors/permisionError');
const { messageErrorLink } = require('../utils/utils');

const postSchema = new mongoose.Schema({
 
  text: {
    type: String,
    default:''
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: messageErrorLink,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.statics.verificPostByUser = function verificPostByUser(postId, userId) {
  return this.findById(postId)
    .then((item) => {
      if (!item) {
        return Promise.reject(movieNotFaund);
      }
      if (userId !== item.owner._id.toString()) {
        return Promise.reject(permisionError);
      }
      return this.findByIdAndRemove(postId)
        .then((movieDeleted) => movieDeleted);
    });
};

module.exports = mongoose.model('post', postSchema);
