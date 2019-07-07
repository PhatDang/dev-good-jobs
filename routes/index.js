/* eslint-disable object-curly-newline */
// ===============================
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
//const { register, login } = require('../controllers/userController')
//const { UserValidator } = require('../controllers/validator')
const User = require('../models/user')
const passport = require('passport')
exports.isAuthenticated = (req, res, next) => {
    if (req.user && req.isAuthenticated()) {
        next()
    }
    res.redirect('/login')
}

// Get FIRST Page
router.get('/', (req, res) => {
    res.render('layouts/layout')
})

router.get('/nguoi-tim-viec', (req, res) => {
    res.render('pages/findjob')
})
router.get('/viec-tim-nguoi', (req, res) => {
    res.render('pages/createjob')
})

// GET LOGIN Page
router.get('/login', (req, res) => {
    res.render('pages/login')
})
router.post('/login', (req, res,next) => {
    passport.authenticate('local', {
        successRedirect: '/viec-tim-nguoi',
        failureRedirect: '/login',
        failureFlash:true
    })(req, res, next)
})
//REGISTER Page
router.get('/register', (req, res) => {
        res.render('pages/register')
})
router.post('/register', (req,res) => {
// register. valid
const {name,email, password, password2} = req.body
let errors = []
//Valid: No input
if(!name || !email ||!password ||!password2) {
    errors.push({msg:"Bạn phải nhập đầy đủ"})
}
//Valid: password match
if(password !== password2) {
    errors.push({msg: "Mật khẩu xác nhận không đúng"})
}
//Valid: password length
if(password.length <6) {
    errors.push({msg: "Mật khẩu không hợp lệ"})
}
///====Handle===
if(errors.length >0) {
    res.render('pages/register', {
        //Return errors to render to message
        errors,
        name, 
        email, 
        password,
        password2
    })
}else {
    User.findOne({email:email})
    .then((user) => {
        if(user) {
            //user exist
         errors.push({msg: "Email này đã được đăng kí"})   
         res.render('pages/register', {
           //Return errors to render to message
            errors,
            name, 
            email, 
            password,
             password2
        })  
        } else {
            const newUser = new User({
                name,email,password
            })
            //Hash password
            bcrypt.genSalt(10 , (err, salt) => bcrypt.hash(newUser.password,salt,(err,hash) => {
                if(err) throw err;
                //If no error ==>hash password
                newUser.password = hash
                //Save to database
                newUser.save()
                .then(user => {
                    req.flash('success_msg','Bạn đã đăng kí thành công')
                    res.redirect('/login')}
                    )
                .catch(err => console.log("err"))
            }))
        }
    })
}

})

module.exports = router
