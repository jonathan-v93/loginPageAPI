const { createUser, fetchUserWithUsername, loginUser } = require('../models/users.models')

exports.getUserWithUsername = (req, res, next) => {
    fetchUserWithUsername(req.params.username).then((user) => {
        res.status(200).send({ user });
    }).catch(err => next(err))
}

exports.postUser = (req, res, next) => {
    createUser(req.body).then((user) => {
        res.status(201).send(user);
    }).catch(err => next(err))
}
exports.postUserWithUsername = (req, res, next) => {
    loginUser(req.body, req.params.username).then((user) => {
        res.status(200).send(user);
    }).catch(err => next(err))

}