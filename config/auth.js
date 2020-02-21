// ===LOGIN required Middleware:
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Bạn cần phải thực hiện đăng nhập!");
    res.redirect("/login");
}
export function forwardAuthenticated(req, _res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
}

// ===CHECK First User Update Info:
export function check_first_update(req, res, next) {
    if (req.user.check_first_update === true) {
        next();
    } else {
        req.flash(
            "error_msg",
            "Bạn vui lòng thực cập nhật thông tin lần đầu.!"
        );
        res.redirect("/users/first_upload");
    }
}

// ===CHECK Is Hunter:
// {Type code here}
