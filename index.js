
const express = require('express')

const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const client = require('mongodb').MongoClient
const http = require('http')
const util = require('util')
const url = require('url')
const userRouter = require('./routes/user.route')
const categoryRouter = require('./routes/category.route')

const goodjob = express()
const dbConnURL = process.env.MONGOLAB_URI || 'mongodb://admin:8512930.94@ds137827.mlab.com:37827/heroku_k0lzdg14'

goodjob.set('view engine', 'ejs')
goodjob.set('views', './views')
goodjob.use('/assets', express.static('static'))
goodjob.use(bodyParser.urlencoded({
    extended: false,
}))
goodjob.use(bodyParser.json())

goodjob.get('/', (req, res) => {
    res.render('index')
})

goodjob.use('/', categoryRouter)
goodjob.use('/user', userRouter)

goodjob.listen(process.env.PORT || 2019, () => {
    // eslint-disable-next-line no-console
    console.log('Your NODE.JS Server is running !!')
})
