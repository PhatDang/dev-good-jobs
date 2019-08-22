/* eslint-disable semi */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// ===============================
// ===LOGIN required Middleware:
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Bạn vui lòng thực hiện đăng nhập!');
    res.redirect('/users/login');
};
exports.forwardAuthenticated = (req, _res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
};
// ===CHECK First User Update Info:
exports.check_first_update = (req, res, next) => {
    if (req.user.check_first_update === true) {
        next();
    } else {
        req.flash('error_msg', 'Bạn vui lòng thực cập nhật thông tin lần đầu.!');
        res.redirect('/users/first_upload');
    }
};
