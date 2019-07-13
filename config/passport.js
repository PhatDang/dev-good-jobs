/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcryptjs')

const LocalStrategy = require('passport-local').Strategy

// ===LOAD USER MODELS:
const User = require('../models/user')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    // Sign-in with {Email} && {Password}
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // CHECK MATCH EMAIL:
        User.findOne({ email: email.toLowerCase() })
            .then((user) => {
                if (!user) {
                    done(null, false, { msg: 'Email chưa được đăng ký, vui lòng đăng ký!' })
                }
                // CHECK MATCH PASSWORD:
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        done(null, user)
                    }
                    done(null, false, { msg: 'Mật khẩu không đúng, vui lòng thử lại!' })
                })
            })
    }))
}
