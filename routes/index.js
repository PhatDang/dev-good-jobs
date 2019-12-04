/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable semi */
// ===============================
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// ===GET HOME PAGE:
router.get('/', forwardAuthenticated, (req, res) => {
    res.render('layout', {
        _id: req.params.id,
        users: req.user,
    });
});

// // =================================== REGISTER
// ===GET REGISTER PAGE:
router.get('/register', forwardAuthenticated, (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('pages/register');
    }
});

// ===PROCESS REGISTER:
router.post('/register', (req, res) => {
    const { full_name, display_name, email, password, password_confirm } = req.body;
    let errors = [];

    // _Check required fields:
    if (!full_name || !display_name || !email || !password || !password_confirm) {
        errors.push({ msg: 'Bạn vui lòng nhập đầy đủ thông tin!' });
    }

    // _Check passwords match:
    if (password !== password_confirm) {
        errors.push({ msg: 'Mật khẩu không trùng khớp!' });
    }

    // _Check password length:
    if (password.length < 6) {
        errors.push({ msg: 'Mật khẩu phải từ 6 ký tự trở lên!' });
    }

    if (errors.length > 0) {
        res.render('pages/register', {
            errors,
            full_name,
            display_name,
            email,
            password,
            password_confirm,
        });
    } else {
        // _Validation passed:
        User.findOne({ email: email.toLowerCase() }).then((user) => {
            if (user) {
                errors.push({ msg: `Email ${email} này đã được đăng ký!` });
                res.render('pages/register', {
                    errors,
                    full_name,
                    display_name,
                    email,
                    password,
                    password_confirm,
                });
            } else {
                const newUser = new User({
                    active: true,
                    full_name,
                    display_name,
                    email,
                    password,
                });
                console.log(newUser);
                // _Hash password:
                bcrypt.genSalt(10, (_err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // _Set password to hashed:
                        newUser.password = hash;
                        // _Save User:
                        newUser.save()
                            .then((_user) => {
                                req.flash('success_msg', 'Bạn đã đăng ký thành công, hãy đăng nhập');
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// =================================== LOGIN
// ===GET LOGIN PAGE:
router.get('/login', forwardAuthenticated, (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('pages/login', { message: req.flash('message') });
    }
});

// ===PROCESS LOGIN:
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/first_upload',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

// =================================== RESET-PASSWORD
router.get('/reset-password', forwardAuthenticated, (req, res) => {
    res.render('pages/reset-password', {
        _id: req.params.id,
        users: req.user,
    });
});

// =================================== LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log('Không thể hủy phiên trong khi đã đăng xuất!', err);
            req.flash('error_msg', 'Không thể hủy phiên trong khi đã đăng xuất!');
        } else {
            req.user = null;
            console.log('Bạn đã đăng xuất thành công!');
            res.redirect('/');
        }
    });
});

module.exports = router;
