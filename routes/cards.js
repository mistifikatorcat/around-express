const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/cards', (req, res) => {
  const cardsPath = path.join(__dirname, 'cards.json')
  fs.readFile(cardsPath, { encoding: 'utf8 '})
  .then((cards) => {
    res.send({ data: JSON.stringify(cards) });
  })
  .catch(() => res.send({ message: 'Cards Not Found' }).status(500));
});

module.exports = router