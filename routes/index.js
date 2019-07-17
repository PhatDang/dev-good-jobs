/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')

const router = express.Router()

// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// ===GET FIRST LAYOUT PAGE:forwardAuthenticated,
router.get('/', (req, res) => {
    res.render('layout')
})

// // ===GET INDEX PAGE:ensureAuthenticated,
// router.get('/', (req, res) => {
//     res.render('pages/index')
// })

// ===GET USERS Or PARTNERS PAGES:
// Get Users PAGE:
router.get('/nguoi-tim-viec', (req, res) => {
    res.render('pages/findjob')
})
// Get Partners PAGE:
router.get('/viec-tim-nguoi', (req, res) => {
    res.render('pages/createjob')
})
router.get('/them-thong-tin', (req, res) => {
    res.render('pages/uploadprofile')
})
router.get('/profile', (req, res) => {
    res.render('pages/profile')
})
// ===============================
// GET REGISTER Page
router.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('pages/register')
    }
})
// === PROCESS THE REGISTER FORM
router.post('/register', (req, res) => {
    // const mess_err = []
    // const { email, password, password_confirm, user_type, full_name, display_name } = req.body
    // if (!email || !password || !password_confirm || !user_type || !full_name || !display_name) {
    //     mess_err.push({ msg: ' Vui lòng nhập đầy đủ thông tin' })
    // }
    // if (password.length < 6) {
    //     mess_err.push({ msg: 'Mật khẩu không hợp lệ' })
    // }
    const { password } = req.body
    const { password_confirm } = req.body
    if (password === password_confirm) {
        const newUser = new User({
            user_type: req.body.user_type,
            full_name: req.body.full_name,
            display_name: req.body.display_name,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm,
        })
        User.createUser(newUser, (err, user) => {
            if (err) throw err
            if (req.user) {
                console.log(user)
                user.save((result) => {
                    res.json({ user: result, 'success_msg': 'Bạn đã đăng ký thành công!' })
                })
                res.render('pages/login')
            }
        })
    } else {
        res.status(500).redirect('/register')
    }
})

// GET LOGIN Page
router.get('/login', (req, res) => {
    res.render('pages/login')
})
// === PROCESS THE LOGIN FORM
router.post('/login', (req, res) => {
    res.send(req.user).redirect('/nguoi-tim-viec')
})

// GET LOGOUT Page
router.get('/logout', (req, res) => {
    req.logout()
    res.send(null)
    res.redirect('/login')
})

// MAKE SURE User is logged in
exports.isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        next()
    }
    // if they aren't redirect them to the home page
    res.redirect('/login')
}

module.exports = router
