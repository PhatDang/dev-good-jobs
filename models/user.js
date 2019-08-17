/* eslint-disable semi */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// ===============================
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    /**
     *  ===USERs Login:
     */
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },

    // _Setting first Registered:
    active: { type: Boolean, default: false },
    check_first: { type: Boolean, default: false },

    /**
     *  ===USERs Info:
     */
    // _Details Users:
    avatar: { type: String },
    full_name: { type: String, trim: true, maxlength: 250 },
    display_name: { type: String, trim: true, maxlength: 50 },
    gender: { type: String },
    birthday: { type: Date, trim: true, maxlength: 250 },
    phone_number: { type: String, trim: true, maxlength: 10 },
    address: { type: String, maxlength: 100 },
    ward: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    card_id: { type: String },
    date_card: { type: Date },

    // _Details User's work:
    title: { type: String },
    summary: { type: String },
    work_type: { type: String },
    job_tittle: { type: String },
    company_name: { type: String },
    company_address: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    skill_name: { type: String },
    skill_description: { type: String },
    skill_point: { type: Number },
    career: { type: String },
    // Still add: Education, Desired Salar

    /**
     *  ===USER Register Date:
     */
    create_date: { type: Date, default: Date.now },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
