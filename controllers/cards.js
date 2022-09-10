const Card = require('../models/card')


const getAllCards = (req, res) => {

  Card.find({})
  .then(cards => {
    res.status(200).send({data: cards})
  })
  .catch(() => req.status(500).send({message: 'Internal server error'}))
}

const createCard = (req, res) => {
  const { name, link, likes } = req.body; //do we need likes here?
  const owner = req.user._id
  Card.create({name, link, likes, owner})
  .then(card => {
    res.status(201).send({data: card})
  })
  .catch(err => {
      if (err.name === 'Validation Error'){
        res.status(400).send({message: 'err.message'})
      } else{
        res.status(500).send({message: err.message})
      }
  })
}


const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .orFail(() => {
    const error = new Error('Card is not found')
    error.status = 404;
    throw error
  })
  .then(() => res.status(200).send({message: 'Card is deleted', data: card}))
  .catch(err => {
    if(err.name === 'CastError'){
      res.status(400).send('Invalid ID format')
    }

    else if(err.status === 404 ) {
      res.status(404).send({message: err.message})
    }
    else{
      res.status(500).send({message: err.message})}
  })
}

const updateLikes = (req, res, operator) => {
  const cardId = req.params.cardId;
  const userId = req.user._id

  Card.findByIdAndUpdate(
  cardId,
  { [operator]: { likes: userId } }, // add _id to the array if it's not there yet
  { new: true },
)
.orFail(() => {
  const error = new Error('Card is not found')
  error.status = 404;
  throw error
})
.then(() => res.status(200).send({message: 'Card is deleted', data: card}))
.catch(err => {
  if(err.name === 'CastError'){
    res.status(400).send('Invalid ID format')
  }

  else if(err.status === 404 ) {
    res.status(404).send({message: err.message})
  }
  else{
    res.status(500).send({message: err.message})}
})
}

const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLikes(req, res, '$pull');


module.exports = { createCard, deleteCard, getAllCards, likeCard, dislikeCard };