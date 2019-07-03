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
const strategy = require('passport-local').Strategy
const fs = require('fs')
const goodjob = express();
const log = console.log;
goodjob.set('views', './views')
goodjob.set('view engine', 'ejs')


goodjob.use(bodyParser.json())
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(session({
    secret: 'Ezko',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
}))
goodjob.use(passport.initialize())
goodjob.use(passport.session())
goodjob.use(flash())

// Path to Cotrollers, Routes, Views and Static
goodjob.get('/', (req, res) => {
    res.render('index')
})
goodjob.route('/signin')
.get((req,res) => res.render('users/signin'))
.post(passport.authenticate('local', {failureRedirect: '/signin', successRedirect: '/nguoi-tim-viec'}))
passport.use(new strategy(
    (username, password, done) => {
        fs.readFile('./db/users.json', (err, data)=> {
            const db = JSON.parse(data)
            const userRecord = db.find(user => user.phoneID == username)
            if(userRecord && userRecord.password == password) {
                return done(null, userRecord)
            } else {
                return done(null, false)
            }
        })
    }
) )
passport.serializeUser((user,done) => {
    done(null, user.phoneID)
})
passport.deserializeUser((name,done) => {
    fs.readFile('./db/users.json', (err, data) => {
        const db = JSON.parse(data)
        const userRecord = db.find(user => user.phoneID == name)
        if(userRecord) {
            return done(null, userRecord)
        } else {
            return done(null, false)
        }
    })
    })
goodjob.get('/nguoi-tim-viec', (req, res)=> {
    res.render('category/findjob')
})
goodjob.use('/assets', express.static('static'))

// Loading SERVER
goodjob.listen(process.env.PORT || 2019, () => {
    log('Your NODE.JS Server is running !!')
})
