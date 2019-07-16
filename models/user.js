/* eslint-disable object-curly-newline */
// ===============================
const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    // ===USER Login:
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    password_confirm: { type: String, required: true, trim: true, minlength: 6 },

    // ===USER Info:
    // _Type and Role of Users
    // active: { type: Boolean },
    // role_list: { type: String },
    user_type: { type: String, required: true, trim: true },
    // _Details Users
    // picture: { type: ImageBitmap },
    full_name: { type: String, required: true, trim: true, maxlength: 250 },
    display_name: { type: String, required: true, trim: true, maxlength: 50 },
    phone_number: { type: String, required: true, trim: true, maxlength: 10 },
    // birthday: { type: Date, trim: true, maxlength: 250 },
    // title: { type: String, required: true },

    // ===USER Register Date:
    create_date: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema)
module.exports = User
