const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/cards', (req, res) => {
  const cardsPath = path.join(__dirname, '../data/cards.json');
  fs.readFile(cardsPath, 'utf8')
    .then((cards) => {
      res.send({ data: JSON.parse(cards) });
    })
    .catch(() => res.send({ message: 'An error has occurred on the server' }).status(500));
});

module.exports = router;
