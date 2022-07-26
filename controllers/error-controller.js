
exports.errorHandler = (err, req, res, next) => {
    if (err === "Not Found" || err.code === "23503") res.status(404).send({ msg: "Not Found" });
    else if (err === 'Bad Request') res.status(400).send({ msg: "Bad Request" });
    else next(err);
};

exports.error500 = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: "Internal sever error" });
};