const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const cors = require('cors');

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const { errorHandler, error500 } = require('./controllers/error-controller')

app.use('/api', apiRouter);

app.use(errorHandler);
app.use(error500);
app.all("/api/*", (req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
});

module.exports = app;