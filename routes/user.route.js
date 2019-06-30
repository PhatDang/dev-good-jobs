/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */

const express = require('express')

const router = express.Router()
// const passport = require('passport')

router.get('/signin', (req, res) => {
    console.log('GET Success!!!')
    res.render('users/signin', { message: req.flash('loginMessage') })
})

// router.post('/signin', passport.authenticate('local-login', {
//     successRedirect: '/success',
//     failureRedirect: '/signin',
//     failureFlash: true,
// }))
router.post('/signin', (req, res) => {
    console.log('POST Success!!!')
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('users/signup')
})

module.exports = router
