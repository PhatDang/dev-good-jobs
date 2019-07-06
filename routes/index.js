/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')

const router = express.Router()
const { register, login } = require('../controllers/userController')
const { UserValidator } = require('../controllers/validator')

// Get First Page
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/nguoi-tim-viec', (req, res) => {
    res.render('category/findjob')
})
router.get('/viec-tim-nguoi', (req, res) => {
    res.render('category/createjob')
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', login)

router.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('register')
    }
})
router.post('/register', UserValidator, register)

module.exports = router