/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcryptjs')

const LocalStrategy = require('passport-local').Strategy

// ===LOAD USER MODELS:
const User = require('../models/user')

module.exports = (passport) => {
    // Sign-in with {Email} && {Password}
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // MATCH EMAIL:
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Email đó chưa được đăng ký, vui lòng thử lại!' })
                }
                // MATCH PASSWORD:
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Mật khẩu không đúng, vui lòng thử lại!' })
                    }
                })
            })
            .catch(err => console.log(err))
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}
