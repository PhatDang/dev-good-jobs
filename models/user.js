/* eslint-disable consistent-return */
/* eslint-disable consistent-this */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
// ===============================
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
    user_type: { type: String, required: true, trim: true },
    full_name: { type: String, required: true, trim: true, maxlength: 250 },
    display_name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    password_confirm: { type: String, required: true, trim: true, minlength: 6 },
})

const User = mongoose.model('user', userSchema)
module.exports = User

// Authenticate input against database
userSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec((err, user) => {
            if (err) {
                callback(err)
            } else if (!user) {
                const err = new Error('Email không tồn tại hoặc không đúng, vui lòng thử lại!')
                err.status(401)
                return callback(err)
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user)
                }
                return callback()
            })
        })
}
// Hashing a password before saving it to the database
userSchema.pre('save', (next) => {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})
