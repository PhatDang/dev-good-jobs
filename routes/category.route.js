//
//
//================================
const express = require('express');
const router = express.Router();
const ctrlCategory = require('../controllers/category.controller');
const ctrlHome = require('../controllers/user.controller');
<<<<<<< HEAD

router.get('/nguoi-tim-viec', ctrlCategory.findjob);

router.get('/viec-tim-nguoi', ctrlCategory.createjob);

=======
router.get('/nguoi-tim-viec', ctrlCategory.findjob);
router.get('/viec-tim-nguoi', ctrlCategory.createjob);
>>>>>>> 1b26fb91504213f5e4f22f7a00f2209036cf7d43
module.exports = router;
