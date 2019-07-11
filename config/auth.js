/* eslint-disable consistent-return */
// ===============================
// ===CHECK Ensure Authenticated:
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Bạn vui lòng đăng nhập để được vào trang!')
    res.redirect('/users/login')
}

// ===CHECK Forward Authenticated:
exports.forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/index')
}
