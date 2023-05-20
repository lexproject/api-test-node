const post = require('../models/post');
const { movieNotFaund } = require('../errors/notFaundError');
const { movieCreateError } = require('../errors/dataError');

module.exports.createPost = (req, res, next) => {
  const {
    text,
    image,
  } = req.body;
  post.create({
    text,
    image,
    owner: req.user._id,
  })
    .then((post) => res.status(201).send({ data: post }))
    .catch((err) => {
      console.log(err.message);
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(movieCreateError);
      } else {
        next(err);
      }
    });
};

module.exports.getCount = (req, res, next) => {
  post.find()
    .then((movie) => res.send( {data:movie.length} ))
    .catch(next);
};

module.exports.getPosts = (req, res, next) => {
  const { id } = req.params;
  post.find().populate('owner').sort({"createdAt":-1}).skip(id).limit(20)
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.postById = (req, res, next) => {
  const { id } = req.params;
  return post.findById(id)
    .then((item) => {
      if (!item) { return Promise.reject(movieNotFaund); }
      return res.send(item);
    })
    .catch(next);
};

module.exports.updatePost = (req, res, next) => {
  const { id, text } = req.body;
  post.findByIdAndUpdate(id, { text }, { new: true, runValidators: true })
    .then((item) => {
      if (!item) { return Promise.reject(movieNotFaund); }
      return res.send(item);
    })
    .catch(next);
};

module.exports.delPost = (req, res, next) => {
  const { id } = req.params;
  return post.verificPostByUser(id, req.user._id)
    .then((post) => {
      if (!post) { return Promise.reject(movieNotFaund); }
      return res.send({ message: `Пост был успешно удален из БД` });
    })
    .catch(next);
};
