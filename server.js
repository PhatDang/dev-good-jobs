/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
// ===============================
/**
 * SETUP DEPENDENCY:
 */
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const express = require('express')
const flash = require('connect-flash')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

// ===PASSPORT CONFIG:
require('./config/passport')(passport)

// ===SETTING FIRST:
const log = console.log
const goodjob = express()
const PORT = process.env.PORT || 2019

// ===ADD TOKEN CODECOV: [For Github]
const CODECOV_TOKEN = '8dfaf1c4-c91d-43c2-bb3c-a2fc964f0bc6'

// ===CONNECT DATABASE MONGODB:
const MONGODB_URI = 'mongodb://func_admin:8512930.Phat@ds147207.mlab.com:47207/heroku_wzkkq1xr'
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
}).then(() => log(chalk.bgGreen('Database connection success!')))
    .catch(err => log(chalk.redBright(err)))

const database = mongoose.connection
database.on('error', (err) => {
    log(chalk.redBright('Database connection error: ', err.message))
})

// ===EJS TEMPLATE:
goodjob.set('views', path.join(__dirname, 'views'))
goodjob.set('view engine', 'ejs')

// ===GET STATIC FILES:
goodjob.use(express.static(path.join(__dirname, 'static')))

// ===EXPRESS BODY PARSER:
goodjob.use(morgan('dev'))
goodjob.use(bodyParser.json())
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(cookieParser())

// ===EXPRESS SESSION:
goodjob.use(session({
    secret: 'Good-Jobs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        secure: false,
    },
    store: new MongoStore({
        mongooseConnection: database,
    }),
}))

// ===PASSPORT MIDDLEWARE:
goodjob.use(passport.initialize())
goodjob.use(passport.session())

// ===CONNECT FLASH:
goodjob.use(flash())
goodjob.use((req, res, next) => {
    res.locals.current_user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// ===GET ROUTER:
goodjob.use('/', require('./routes/index'))
goodjob.use('/page', require('./routes/users'))

// ===CATCH 404:
goodjob.use((req, res, next) => {
    // log(req)
    res.status(404)
    res.render('pages/404')
})

// ===ERROR HANDLER:
goodjob.use((err, req, res, next) => {
    // log(req)
    res.status(err.status || 500)
    res.send(err.message)
})

// LOADING SERVER...
goodjob.listen(PORT, () => {
    log(chalk.whiteBright('SERVER STARTED LISTENING ON PORT ')
        + chalk.yellowBright(`http://localhost:${PORT}`))
})

module.exports = goodjob
