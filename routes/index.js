/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express');

const router = express.Router();

// ===Show HOME PAGE:
router.get('/', (req, res) => {
    res.render('layout', { _id: req.params.id, users: req.user });
});

module.exports = router;
