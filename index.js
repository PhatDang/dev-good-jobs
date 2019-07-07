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

// require('./config/passport')

// CONNECT DB
dotenv.config()
const db = mongoose.connection
const MongoStore = require('connect-mongo')(session)

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI,
    { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('DB Connected: https://cloud.mongodb.com/v2/5cf3a7479ccf64b1fca2bc91#clusters'))
db.on('error', (err) => {
    console.log('BD connection error: ', err.message)
})

const log = console.log
const PORT = process.env.PORT || 2019
const goodjob = express()

goodjob.set('views', path.join(__dirname, 'views'))
goodjob.set('view engine', 'ejs')

goodjob.use(morgan('dev'))
goodjob.use(bodyParser.json())
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(cookieParser())
goodjob.use(express.static(path.join(__dirname, 'static')))
goodjob.use(session({
    secret: 'Ezko',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        secure: false,
    },
    store: new MongoStore({ mongooseConnection: db }),
}))
goodjob.use(passport.initialize())
goodjob.use(passport.session())
goodjob.use(expressValidator())

goodjob.use(flash())
goodjob.use((req, res, next) => {
    res.locals.success_messages = req.flash('success')
    res.locals.error_messages = req.flash('error')
    next()
})

// GET ROUTER INDEX
goodjob.use('/', require('./routes/index'))

// CATCH 404
goodjob.use((req, res, next) => {
    res.render('notFound')
})

// LOADING SERVER...
goodjob.listen(PORT, () => {
    log('SERVER STARTED LISTENING ON PORT 2019!')
})

module.exports = goodjob
