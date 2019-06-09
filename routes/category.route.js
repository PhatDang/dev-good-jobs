//
//
//
const express = require('express');
const router = express.Router();
const ctrlCategory = require('../controllers/category.controller');
const ctrlHome = require('../controllers/user.controller');
router.get('/nguoi-tim-viec', ctrlCategory.findjob);
router.get('/viec-tim-nguoi', ctrlCategory.createjob);

module.exports = router;
