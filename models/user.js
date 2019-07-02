const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    local: {
        _id: mongoose.Schema.Types.ObjectId,
        phoneID: Number,
        password: String,
    },
})

/**
 * METHODS
 */
// Hash Password
userSchema.methods.generateHash = (password) => {
    bcrypt.hashSync(password, bcrypt.genSaltSync(6), null)
}
// Check Password
userSchema.methods.validPassword = (password) => {
    bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
