/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = (passport) => {
    // VALIDATE: {Email} && {Password}
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        User.findOne({ email: email.toLowerCase() })
            .then((user) => {
                // Check: MATCH EMAIL
                if (!user) {
                    return done(null, false, { message: `Email ${email} này không tìm thấy!` });
                }
                // Check: CURRENT USER
                if (!user.password) {
                    return done(null, false, { message: `Email ${email} này đã được đăng ký!` });
                }
                // Check: MATCH PASSWORD
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) {
                        return done(null, false, { message: 'Mật khẩu không đúng, vui lòng thử lại!' });
                    }
                    return done(null, user);
                });
            })
            .catch(err => console.log(err));
    }));
    // Serialize Sessions:
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Deserialize Sessions:
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
