//
//
//================================
const express = require('express')
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
<<<<<<< HEAD

router.get('/sign-in', ctrlUser.signIn);

router.get('/sign-up', ctrlUser.signUp);

router.post('/success', ctrlUser.signInValid);

=======
router.get('/sign-in', ctrlUser.signIn);
router.get('/sign-up', ctrlUser.signUp);
router.post('/success', ctrlUser.signInValid);
>>>>>>> 1b26fb91504213f5e4f22f7a00f2209036cf7d43
module.exports = router;
