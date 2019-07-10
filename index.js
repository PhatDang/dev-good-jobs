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
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
// const passport = require('passport')

// require('./config/passport')(passport)
// TOKEN CODECOV
const CODECOV_TOKEN = '8dfaf1c4-c91d-43c2-bb3c-a2fc964f0bc6'

// CONNECT DB
const MONGODB_URI = 'mongodb://func_admin:8512930.Phat@ds147207.mlab.com:47207/heroku_wzkkq1xr'
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('DB Connected!'))
const db = mongoose.connection
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
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        secure: false,
    },
    store: new MongoStore({
        mongooseConnection: db,
    }),
}))
// goodjob.use(passport.initialize())
// goodjob.use(passport.session())
goodjob.use(flash())
goodjob.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_msg')
    res.locals.error_messages = req.flash('error_msg')
    next()
})

// GET ROUTER INDEX
goodjob.use('/', require('./routes/index'))

// CATCH 404
goodjob.use((req, res, next) => {
    const err = new Error('404')
    res.status(404).render('pages/404')
    next(err)
})

// ERROR HANDLER
goodjob.use((err, req, res, next) => {
    log(req)
    res.status(err.status || 500)
    res.send(err.message)
})

// LOADING SERVER...
goodjob.listen(PORT, () => {
    log('SERVER STARTED LISTENING ON PORT 2019!')
})

module.exports = goodjob
