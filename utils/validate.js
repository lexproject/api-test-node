const { celebrate, Joi } = require('celebrate');

const { linkValid } = require('./utils');

const postIdValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});
const postValidate = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex(),
    text: Joi.string(),
    image: Joi.string().pattern(linkValid),
  }),
});
const userDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});
const signupValidate = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});
const signinValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});
module.exports = {
  postValidate,
  postIdValidate,
  userDataValidate,
  signupValidate,
  signinValidate,
};
