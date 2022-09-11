const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const userModel = require('./models/user');
const cardModel = require('./models/card');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // paste the _id of the test user created in the previous step
  };

  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser);

app.use(userRouter);
app.use(cardRouter);


app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
