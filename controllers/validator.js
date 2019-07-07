/* eslint-disable object-curly-newline */
// ===============================
const User = require('../models/user')

exports.UserValidator = (req, res, next) => {
    // CHECK FIELDS INPUT
    req.check('user_type', 'Tôi không biết bạn là ai?').not().isEmpty()
    req.check('full_name', 'Vui lòng nhập vào họ và tên').not().isEmpty()
    req.check('full_name', 'Họ và tên không được nhiều hơn 250 ký tự').isLength({ max: 250 })
    req.check('display_name', 'Vui lòng nhập vào tên hiện thị').not().isEmpty()
    req.check('display_name', 'Tên hiển thị không được nhiều hơn 50 ký tự').isLength({ max: 50 })
    req.check('email', 'Email không hợp lệ').isEmail()
    req.check('email', 'Vui lòng nhập email').not().isEmpty()
    req.check('password', 'Vui lòng nhập mật khẩu').not().isEmpty()
    req.check('password', 'Mật khẩu phải có hơn 6 ký tự').isLength({ min: 6 })
    req.check('password_confirm', 'Vui lòng xác nhận mật khẩu').not().isEmpty()
    req.check('password_confirm', 'Mật khẩu xác nhận không đúng').equals(req.body.password)
    // CHECK ERRORS
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        res.status(400).json({ error: firstError })
    }
    next()
}
