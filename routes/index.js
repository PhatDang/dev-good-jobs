/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')
const router = express.Router()

// ===HOME PAGE:
router.get('/', (req, res) => {
    res.render('layout')
})

module.exports = router
