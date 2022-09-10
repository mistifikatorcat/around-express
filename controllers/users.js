const User = require('../models/user')


const getAllUsers = (req, res) => {

  User.find({})
  .then(users => {
    res.status(200).send({data: users})
  })
  .catch(() => req.status(500).send({message: 'Internal server error'}))
}

const getUser = (req, res) => {
const { id } = req.params;
  User.findById(id)
  .orFail(() => {
    const error = new Error('User is not found')
    throw error
  })
  .then(user => {

    res.status(200).send({data: user})
  })
  .catch((err) => {
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

const createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  User.create({name, avatar, about})
  .then(user => {
    res.status(201).send({data: user})
  })
  .catch(err => {
      if (err.name === 'Validation Error'){
        res.status(400).send({message: 'err.message'})
      } else{
        res.status(500).send({message: err.message})
      }
  })
}


const updateData = (req, res) => {
  const body = req.body;
  User.findByIdAndUpdate(id, body, {new: true})
  .orFail(() => {
    const error = new Error('User with such id is not found');
    error.status = 404;

    throw error
  })
  .then(user => {
    res.send({data: user})
  })
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

const updateProfilePicture = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  if(!avatar){
    return res.status(400).send({message: 'avatar cant be empty'})
  }

  updateData(req,res);

}

const updateProfile = (req, res) => {
  const {name, about} = req.body;
  const id = req.user._id;

  if(!name || !about){
    return res.status(400).send({message: 'Information cant be empty'})
  }

  updateData(req,res);
}

module.exports = {createUser, getUser, getAllUsers, updateProfile, updateProfilePicture};
