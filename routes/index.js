/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express');

const router = express.Router();

// ===Show HOME PAGE:
router.get('/', (_req, res) => {
    res.render('layout');
});

module.exports = router;
