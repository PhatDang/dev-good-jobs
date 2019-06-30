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

const dbUser = 'func_admin'
const dbPass = '8512930.Phat'
const dbURL = process.env.MONGOLAB_URI || `mongodb://${dbUser}:${dbPass}@ds137827.mlab.com:37827/heroku_k0lzdg14`
const dbName = 'heroku_k0lzdg14'
const dbLink = 'https://www.mlab.com/databases/heroku_k0lzdg14'

const userRouter = require('./routes/user.route')
const categoryRouter = require('./routes/category.route')
require('./config/passport')(passport)

const goodjob = express()
const log = console.log

mongoClient.connect(dbURL, { useNewUrlParser: true })

mongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err)
    log('Connected successfully to SERVER = ', dbLink)

    const db = client.db(dbName)
    // insertUsers(db, () => {
    //     findUsers(db, () => {
    //         client.close()
    //     })
    // })
    client.close()
})

// Insert DB
// const insertUsers = (db, callback) => {
//     const collection = db.collection('Users')
//     collection.insertMany([
//         { id: 1 },
//         { phoneID: '0707144248' },
//         { password: '123456' },
//     ], (err, result) => {
//         assert.equal(err, null)
//         assert.equal(3, result.result.n)
//         assert.equal(3, result.ops.length)
//         log('Inserted 3 Users into the collection')
//         callback(result)
//     })
// }

// // Find All
// const findUsers = (db, callback) => {
//     const collection = db.collection('Users')
//     collection.find({}).toArray((err, users) => {
//         assert.equal(err, null)
//         log('Found the following records')
//         log(users)
//         callback(users)
//     })
// }

// For Mr.Phat: https://www.npmjs.com/package/mongodb

goodjob.use(bodyParser.json())
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(expressValidator())
goodjob.use(cookieParser())
goodjob.use(morgan('tiny'))
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

goodjob.set('views', './views')
goodjob.set('view engine', 'ejs')

goodjob.use('/', categoryRouter)
goodjob.use('/', userRouter)

goodjob.use('/assets', express.static('static'))

// Loading SERVER
goodjob.listen(process.env.PORT || 2019, () => {
    log('Your NODE.JS Server is running !!')
})
