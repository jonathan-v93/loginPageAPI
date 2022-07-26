const usersRouter = require('express').Router();
const { getUserWithUsername, postUser } = require('../controllers/users-controller.js');


usersRouter.route('/:username')
    .get(getUserWithUsername);

usersRouter.route('/')
    .post(postUser)

module.exports = usersRouter;