const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json');
  fs.readFile(usersPath, 'utf8')
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch(() => res.send({ message: 'An error has occurred on the server' }).status(500));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const usersPath = path.join(__dirname, '../data/users.json');
  fs.readFile(usersPath, 'utf8')
    .then((users) => {
      const data = JSON.parse(users);
      const foundUser = data.find((user) => user._id === id);

      if (!foundUser) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send(foundUser);
      }
    })
    .catch(() => res.send({ message: 'An error has occurred on the server' }).status(500));
});

module.exports = router;
