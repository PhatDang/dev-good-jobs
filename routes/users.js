/* eslint-disable semi */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');
const { ensureAuthenticated,
    forwardAuthenticated } = require('../config/auth');

// =================================== LOGIN
// ===GET LOGIN PAGE:
router.get('/login', forwardAuthenticated, (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('pages/login', { message: req.flash('message') });
    }
});
// ===PROCESS LOGIN FOR USERS:
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/first_upload',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
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
// ===PROCESS REGISTER FOR USERS:
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
                errors.push({ msg: 'Email đã được đăng ký!' });
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
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// =================================== RESET-PASSWORD
router.get('/reset-password', ensureAuthenticated, (req, res) => {
    res.render('pages/reset-password');
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

// =================================== GET Information User:
// ===Show FIRST UPLOAD PAGE:
router.get('/first_upload', ensureAuthenticated, (req, res) => {
    res.render('seekers/first_upload', { user_id: req.params.id });
});
// ===Edit and Update => FIRST_UPLOAD Page:
// router.put('/:id/', ensureAuthenticated, (req, res) => {
//     if (err) {
//         console.log(err)
//         res.render('seekers/edit_detail');
//     }
// });
// router.put('/edit', (req, res) => {
//     const updateUser = {
//         full_name: req.body.full_name,
//         display_name: req.body.display_name,
//         gender: req.body.gender,
//         birthday: req.body.birthday,
//         email: req.body.email,
//         phone_number: req.body.phone_number,
//         title: req.body.title,
//         address: req.body.address,
//         city: req.body.city,
//         district: req.body.district,
//         ward: req.body.ward,
//         card_id: req.body.card_id,
//         date_card: req.body.date_card,
//         career: req.body.career,
//     }
//     User.findByIdAndUpdate(req.params.id, { $set: updateUser }, (err) => {
//         if (err) {
//             req.flash('error_msg', 'Có gì đó sai sai ở đây!')
//             res.redirect('/users/edit')
//         } else {
//             req.flash('success_msg', 'Cập nhật thành công!')
//             res.redirect('/users/detail')
//         }
//     })
// })
// // ===GET DETAIL_PROFILE:
// // router.get('/detail', (req, res) => {
// //     User.findById(req.params.id, (err) => {
// //         if (err) {
// //             console.log(err)
// //             req.flash('error_msg', 'Có gì đó sai sai ở đây!')
// //             res.redirect('/users/detail')
// //         }
// //         res.render('pages/profile', {
// //             user: req.user,
// //         })
// //     })
// // })
// router.get('/detail', ensureAuthenticated, (req, res) => {
//     res.render('pages/profile', {
//         user: req.user,
//     })
// })

module.exports = router;
