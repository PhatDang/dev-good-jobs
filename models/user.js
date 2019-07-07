/* eslint-disable object-curly-newline */
// ===============================
const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    user_type: { type: String, required: true, trim: true },
    full_name: { type: String, required: true, trim: true, maxlength: 250 },
    display_name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    password_confirm: { type: String, required: true, trim: true, minlength: 6 },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})

const User = mongoose.model('user', userSchema)
module.exports = User
