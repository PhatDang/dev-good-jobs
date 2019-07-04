/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */

const express = require('express')

const session = require('express-session')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const mongoClient = require('mongodb').MongoClient
const assert = require('assert')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const fs = require('fs')

const goodjob = express()
const log = console.log
goodjob.set('views', './views')
goodjob.set('view engine', 'ejs')

/**
 * === HEROKU Connect to PostgreSQL Addons of HEROKU ===
 * _URL: postgres://lgzundfwkqjugu:c4fb4d6b0be02759df3c05328d8a178147f48807755b830ecd70b4ee34f21011@ec2-23-21-160-38.compute-1.amazonaws.com:5432/dco5dhjabg1qmp
 * _Host: ec2-23-21-160-38.compute-1.amazonaws.com
 * _DB Name: dco5dhjabg1qmp
 * _Port: 5432
 * _Heroku CLI: heroku pg:psql postgresql-lively-76851 --app dev-good-jobs
 * === Test User Login ===
 * _User: 0707144248 (phone_id)
 * _Password: minhphat94 (password)
 */
const dbHost = 'ec2-23-21-160-38.compute-1.amazonaws.com'
const dbName = 'dco5dhjabg1qmp'
const dbUser = 'lgzundfwkqjugu'
const dbPass = 'c4fb4d6b0be02759df3c05328d8a178147f48807755b830ecd70b4ee34f21011'
const dbURL = `postgres://${dbUser}:${dbPass}@ec2-23-21-160-38.compute-1.amazonaws.com:5432/dco5dhjabg1qmp`
// ============================================ TEST
const pg = require('pg')

const dbConfig = {
    user: dbUser,
    database: dbName,
    password: dbPass,
    host: dbHost,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    ssl: true,
}

const client = new pg.Client(dbConfig)
client.connect().then(() => console.log('Connected Successful!!!'))
client.query('SELECT * FROM users').then(result => console.log(result))
// ============================================
goodjob.use(bodyParser.json())
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(session({
    secret: 'Ezko',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
}))
goodjob.use(passport.initialize())
goodjob.use(passport.session())
goodjob.use(flash())

// Path to Cotrollers, Routes, Views and Static
goodjob.get('/', (req, res) => {
    res.render('index')
})
goodjob.route('/signin')
    .get((req, res) => res.render('users/signin'))
    .post(passport.authenticate('local', {
        failureRedirect: '/signin',
        successRedirect: '/nguoi-tim-viec',
    }))
passport.use(new Strategy(
    (username, password, done) => {
        fs.readFile('./db/users.json', (err, data) => {
            const db = JSON.parse(data)
            const userRecord = db.find(user => user.phoneID === username)
            if (userRecord && userRecord.password === password) {
                done(null, userRecord)
            } else {
                done(null, false)
            }
        })
    },
))
passport.serializeUser((user, done) => {
    done(null, user.phoneID)
})
passport.deserializeUser((name, done) => {
    fs.readFile('./db/users.json', (err, data) => {
        const db = JSON.parse(data)
        const userRecord = db.find(user => user.phoneID === name)
        if (userRecord) {
            done(null, userRecord)
        } else {
            done(null, false)
        }
    })
})
goodjob.get('/nguoi-tim-viec', (req, res) => {
    res.render('category/findjob')
})
goodjob.use('/assets', express.static('static'))

// Loading SERVER
goodjob.listen(process.env.PORT || 2019, () => {
    log('Your NODE.JS Server is running !!')
})
