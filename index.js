/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
// ===============================
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
//Defind
const log = console.log
const PORT = process.env.PORT || 2019
const goodjob = express()
//db config
const db = require('./config/keys').MongoURL
//passport config
require('./config/passport')(passport)
//Connect to db
mongoose.connect(db, {useNewUrlParser:true})
.then(() => log("connected"))
.catch(() => log("err"))
//EJS
goodjob.set('views', path.join(__dirname, 'views'))
goodjob.set('view engine', 'ejs')
//Bodyparser
goodjob.use(morgan('dev'))
goodjob.use(bodyParser.json())
goodjob.use(express.urlencoded({extended:false}))
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(cookieParser())
goodjob.use(express.static(path.join(__dirname, 'static')))
//Session
goodjob.use(session({
    secret: 'Duclux',
    resave: true,
    saveUninitialized: true,
  }))
//Passport defind
goodjob.use(passport.initialize());
goodjob.use(passport.session());
//Flash
goodjob.use(flash())
//Defind func
goodjob.use((req, res,next) => {
    res.locals.sucess_msg = req.flash('success_msg');
    res.locals.err_msg = req.flash('error_msg')
    next()
})
// GET ROUTER INDEX
goodjob.use('/', require('./routes/index'))

// CATCH 404
goodjob.use((req, res) => {
    console.log(req)
    res.status(404).render('pages/404')
})

// LOADING SERVER...
goodjob.listen(PORT, () => {
    log('SERVER STARTED LISTENING ON PORT 2019!')
})

module.exports = goodjob
