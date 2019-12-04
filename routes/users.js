/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable semi */
// ===============================
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/user');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// =================================== GET Information User:
// ===Show FIRST UPLOAD PAGE:
router.get('/first_upload', ensureAuthenticated, (req, res) => {
    res.render('seekers/first_upload', {
        _id: req.params.id,
        users: req.user,
    });
});
// ===Edit and Update => FIRST UPLOAD PAGE:
router.put('/update', (req, res) => {
    const updateUser = {
        full_name: req.body.full_name,
        display_name: req.body.display_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        email: req.body.email,
        phone_number: req.body.phone_number,
        title: req.body.title,
        address: req.body.address,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        card_id: req.body.card_id,
        date_card: req.body.date_card,
        career: req.body.career,
    };
    User.findByIdAndUpdate(req.params.id, { $set: updateUser }, (err) => {
        if (err) {
            req.flash('error_msg', 'Có gì đó sai sai ở đây!');
            res.redirect('/users/first_upload');
        } else {
            req.flash('success_msg', 'Cập nhật thành công!');
            res.redirect('/users/detail');
        }
    });
});
// ===GET DETAIL_PROFILE:
// router.get('/profile', (req, res) => {
//     User.findById(req.params.id, (err) => {
//         if (err) {
//             console.log(err)
//             req.flash('error_msg', 'Có gì đó sai sai ở đây!')
//             res.redirect('/users/detail')
//         }
//         res.render('seekers/profile', {
//             user: req.user,
//         })
//     })
// })
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('seekers/profile', {
        _id: req.params.id,
        users: req.user,
    });
});

module.exports = router;
