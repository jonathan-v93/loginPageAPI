const usersRouter = require('express').Router();
const { getUserWithUsername, postUser, postUserWithUsername } = require('../controllers/users-controller.js');


usersRouter.route('/:username')
    .get(getUserWithUsername)
    .post(postUserWithUsername);

usersRouter.route('/')
    .post(postUser)

module.exports = usersRouter;