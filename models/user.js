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
    date: { type: Date, default: Date.now },
})

const User = mongoose.model('user', userSchema)
module.exports = User

// HASH Password && Password Confirm
module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt, next) => {
        if (err) { next(err) }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { next(err) }
            newUser.password = hash
            newUser.password_confirm = hash
            newUser.save(callback)
        })
    })
}

// LOGIN METHOD
module.exports.getUserByEmail = (email, callback) => {
    const query = { email: email }
    User.findOne(query, callback)
}
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback)
}
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}
