/* eslint-disable max-statements-per-line */
/* eslint-disable object-curly-newline */

const LocalStrategy = require('passport-local').Strategy
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
    passport.use('local-login', new LocalStrategy({
        phoneidField: 'phone_id',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, phoneid, password, done) => {
        User.findOne({ 'local.phone_id': phoneid }, (err, user) => {
            if (err) { done(err) }
            if (!user) { done(null, false, req.flash('loginMessage', 'No phone number found.')) }
            if (!user.validPassword(password)) { done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')) }
            done(null, user)
        })
    }))
}
