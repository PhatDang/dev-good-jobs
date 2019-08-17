/* eslint-disable semi */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// ===============================
const mongoose = require('mongoose');

const { Schema } = mongoose;

const hunterSchema = new Schema({
    // Type data here...
});

const Hunter = mongoose.model('Hunter', hunterSchema);
module.exports = Hunter;
