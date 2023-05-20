const routerPost = require('express').Router();
const { createPost, delPost, postById, updatePost } = require('../controllers/posts');
const { postIdValidate, postValidate } = require('../utils/validate');

routerPost.post('/', postValidate, createPost);
routerPost.patch('/', postValidate, updatePost);
routerPost.delete('/:id', postIdValidate, delPost);
routerPost.get('/:id', postIdValidate, postById);

module.exports = routerPost;