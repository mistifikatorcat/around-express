const router = require('express').Router();
const { createUser, getUser, getAllUsers, updateProfile, updateProfilePicture } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateProfilePicture);


module.exports = router;