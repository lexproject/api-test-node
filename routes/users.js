const routerUser = require('express').Router();
const { getUserMe } = require('../controllers/users');

routerUser.get('/me', getUserMe);

module.exports = routerUser;