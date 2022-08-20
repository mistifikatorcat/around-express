const express = require('express');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(usersRoute);
app.use(cardsRoute);

app.use('*',(req, res) => {
  res.status(404).send({message: 'Requested resource not found'})
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
