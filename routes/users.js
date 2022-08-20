const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json')
  fs.readFile(usersPath, { encoding: 'utf8 '})
  .then((users) => {
    res.send({ data: JSON.stringify(users) });
  })
  .catch((err) => res.send(err));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const usersPath = path.join(__dirname, '../data/users.json')
  fs.readFile(usersPath, { encoding: 'utf8 '})
  .then((users) => {
    const data = JSON.parse(JSON.stringify(users));
    const user = data.find((user) => user._id === id);

    if (!user) {
      res.send({ message: 'User ID not found' }).status(404);
    }
    else {
      res.send(user)
    }
  })
  .catch((err) => res.send(err));

})


module.exports = router