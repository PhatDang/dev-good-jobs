/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable max-statements-per-line */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcrypt')
const User = require('../models/user')

const errs = []
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user, password) => {
        if (err) {
            res.json({ err })
        } else if (!user) {
            res.json({
                err: 'Email hoặc mật khẩu không đúng',
            })
            errs.push(err)
            console.log(errs)
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result === true) {
                req.session.user = user
                req.session.password = password
                res.json({
                    user: user,
                    "login": "success",
                })
            } else {
                res.json({ err: 'Email hoặc mật khẩu không đúng' })
            }
        })
    })
}

exports.register = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user == null) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { next(err) }
                const user = new User(req.body)
                user.user_type = req.body.user_type
                user.full_name = req.body.full_name
                user.display_name = req.body.display_name
                user.password = hash
                user.password_confirm = hash
                user.save((err, result) => {
                    if (err) { res.json({ err }) }
                    res.json({ user: result })
                })
            })
        } else {
            res.json({ err: 'Email đã được sử dụng' })
        }
    })
}
