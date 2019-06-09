const express = require('express')
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
router.get('/sign-in', ctrlUser.signin);

router.get('/sign-up', ctrlUser.signup);

module.exports = router;
