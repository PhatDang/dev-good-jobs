/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable max-statements-per-line */
/* eslint-disable object-curly-newline */
// ===============================
const LocalStrategy = require('passport').Strategy
const User = require('../models/user')

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        (req, email, password, done) => {
            console.log(req)
            User.findOne({ 'email': email }, (err, user) => {
                if (err) { return done(err) }
                if (!user) { return done(null, false) }
                if (!user.verifyPassword(password)) { return done(null, false) }
                done(null, user)
            })
        },
    ))
}
