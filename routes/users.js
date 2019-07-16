/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcryptjs')
const express = require('express')
const passport = require('passport')

const router = express.Router()
const User = require('../models/user')

const { forwardAuthenticated } = require('../config/auth')

// =================================== LOGIN
// ===GET LOGIN PAGE:
router.get('/login', forwardAuthenticated, (req, res) => {
    if (req.user) {
        res.redirect('/nguoi-tim-viec')
    }
    res.render('pages/login')
})
// ===PROCESS LOGIN FOR USERS:
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/nguoi-tim-viec',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next)
})

// =================================== REGISTER
// ===GET REGISTER PAGE:
router.get('/register', forwardAuthenticated, (req, res) => {
    if (req.user) {
        res.redirect('/nguoi-tim-viec')
    }
    res.render('pages/register')
})
// ===PROCESS REGISTER FOR USERS:
router.post('/register', (req, res) => {
    const { user_type, full_name, display_name, email, password, password_confirm } = req.body
    const errors = []

    if (!user_type || !full_name || !display_name || !email || !password || !password_confirm) {
        errors.push({ msg: 'Vui lòng nhập đầy đủ thông tin đăng ký!' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Mật khâu phải từ 6 ký tự trở lên!' })
    }

    if (password !== password_confirm) {
        errors.push({ msg: 'Mật khẩu không trùng khớp, vui lòng thử lại!' })
    }

    if (errors.length > 0) {
        res.render('pages/register', {
            errors,
            user_type,
            full_name,
            display_name,
            email,
            password,
            password_confirm,
        })
    } else {
        User.findOne({ email }).then((user) => {
            if (user) {
                errors.push({ msg: 'Email đã tồn tại, xin vui lòng dùng email khác!' })
                res.render('pages/register', {
                    errors,
                    user_type,
                    full_name,
                    display_name,
                    email,
                    password,
                    password_confirm,
                })
            } else {
                const newUser = new User({
                    user_type,
                    full_name,
                    display_name,
                    email,
                    password,
                    password_confirm,
                })
                bcrypt.genSalt(10, (_err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.password_confirm = hash
                        newUser
                            .save()
                            .then((_user) => {
                                req.flash('success_msg', 'Bạn đã đăng ký thành công, hãy đăng nhập')
                                return res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
    }
})

// =================================== LOG-OUT
router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if (err) {
            console.log('Không thể hủy phiên trong khi đã đăng xuất!', err)
            req.flash('error_msg', 'Không thể hủy phiên trong khi đã đăng xuất!')
        }
        req.user = null
        req.flash('success_msg', 'Bạn đã đăng xuất thành công!')
        return res.redirect('/users/login')
    })
})

// =================================== USER PROFILE
// ===GET DETAIL PROFILE PAGE:
router.get('/demo_detail', (_req, res) => {
    res.render('detail_profile')
})

// ===GET UPLOAD PROFILE PAGE:
router.get('/demo_edit', (_req, res) => {
    res.render('update_profile')
})

module.exports = router
