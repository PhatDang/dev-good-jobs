/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')

const router = express.Router()

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// ===GET FIRST LAYOUT PAGE:forwardAuthenticated,
router.get('/', forwardAuthenticated, (req, res) => res.render('layout'))

// ===GET USERS Or PARTNERS PAGES:
// Get Users PAGE:
router.get('/nguoi-tim-viec', (req, res) => res.render('pages/findjob'))
// Get Partners PAGE:
router.get('/viec-tim-nguoi', (req, res) => res.render('pages/createjob'))

module.exports = router
