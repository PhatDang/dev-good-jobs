/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable max-statements-per-line */
/* eslint-disable object-curly-newline */
// ===============================
const LocalStrategy = require('passport').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')


module.exports = function(passport) {
    passport.use('local', new LocalStrategy({username: 'email'}, (email,password,done) => {
         User.findOne({email: email})
         .then(user => {
             if(!user) {
                 return done(null, false, {message: "email này chưa được đăng kí"})
             }
             //If user regedited ==> match password
             bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) return done(err)
                if(isMatch) {
                     return done(null, user)
                 } else {
                     return done(null, false, {message: "Có gì đó ko đúng, kiểm tra lại"})
                 }
             })
         })
         .catch(err => console.log("err"))
    }
))

}