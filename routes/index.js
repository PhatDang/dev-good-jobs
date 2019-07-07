/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')

const router = express.Router()

const { register, login } = require('../controllers/userController')
const { UserValidator } = require('../controllers/validator')

exports.isAuthenticated = (req, res, next) => {
    if (req.user && req.isAuthenticated()) {
        next()
    }
    res.redirect('/login')
}

// Get FIRST Page
router.get('/', (req, res) => {
    res.render('layouts/layout')
})

router.get('/nguoi-tim-viec', (req, res) => {
    res.render('pages/findjob')
})
router.get('/viec-tim-nguoi', (req, res) => {
    res.render('pages/createjob')
})

// GET LOGIN Page
router.get('/login', (req, res) => {
    res.render('pages/login')
})
router.post('/login', login)

// GET REGISTER Page
router.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('pages/register')
    }
})
router.post('/register', UserValidator, register)

module.exports = router
