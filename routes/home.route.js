const express = require('express')
const router = express.Router();
const ctrlHome = require('../controllers/home.controller');
router.get('/dang-nhap', ctrlHome.signin);

router.get('/dang-ki', ctrlHome.signup);

module.exports = router;
