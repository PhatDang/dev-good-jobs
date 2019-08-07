/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// ===============================
// ===CHECK Is Logged-in:
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('error_msg', 'Bạn vui lòng đăng nhập để được vào trang!')
        res.redirect('/page/login')
    }
}
// ===CHECK Ensure Authenticated:
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Bạn vui lòng đăng nhập để được vào trang!')
    res.redirect('/page/login')
}
// ===CHECK Forward Authenticated:
exports.forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }
}
// ============== ROLEs:
// ===CHECK Seeker:
exports.isSeeker = (req, res, next) => {
    next()
}
// ===CHECK Hunter:
exports.isHunter = (req, res, next) => {
    next()
}
