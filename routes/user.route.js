const express = require('express')
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
router.get('/sign-in', ctrlUser.signIn);

router.get('/sign-up', ctrlUser.signUp);

router.post('/success', ctrlUser.signInValid);

module.exports = router;
