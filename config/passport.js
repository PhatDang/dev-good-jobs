/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable object-curly-newline */
// ===============================
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = (passport) => {
    // Used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    // Used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get())
            } else {
                done(user.errors, null)
            }
        })
    })
    // Local
    passport.use(new LocalStrategy((email, password, done) => {
        User.getUserByEmail(email, (err, user) => {
            if (err) throw err
            if (!user) {
                return done(null, false, { message: 'Email này đã được sử dụng.' })
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Email hoặc mật khẩu không đúng, vui lòng thử lại.' })
                }
            })
        })
    }))
}
