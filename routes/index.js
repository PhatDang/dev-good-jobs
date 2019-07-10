/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')

const router = express.Router()

const User = require('../models/user').default
// const { register, login } = require('../controllers/userController')
// const { UserValidator } = require('../controllers/validator')

// GET FIRST Page
router.get('/', (req, res) => {
    res.render('layouts/layout')
})

// GET USER Type
router.get('/nguoi-tim-viec', (req, res) => {
    res.render('pages/findjob')
})
router.get('/viec-tim-nguoi', (req, res) => {
    res.render('pages/createjob')
})
// ===============================
// GET REGISTER Page
router.get('/register', (req, res) => {
    res.render('pages/register')
})
// === PROCESS THE REGISTER FORM
router.post('/register', (req, res) => {
    if (req.body.password !== req.body.password_confirm) {
        const err = new Error('Mật khẩu không trùng khớp!')
        err.status(400)
        res.send("Mật khẩu không trùng khớp")
        return next(err)
    }
    if (req.body.email && req.body.password && req.body.password_confirm
        && req.body.user_type
        && req.body.full_name
        && req.body.display_name) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        }
        User.create(userData, (err, user) => {
            if (err) {
                throw err
            } else {
                req.session.userId = user._id
                res.redirect('/login')
            }
        })
    }
})

// GET LOGIN Page
router.get('/login', (req, res) => {
    res.render('pages/login')
})
// === PROCESS THE LOGIN FORM
router.post('/login', (req, res) => {
    res.send(req.user).redirect('/nguoi-tim-viec')
})

// GET LOGOUT Page
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // Delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err)
            }
            res.redirect('/login')
        })
    }
})

module.exports = router
