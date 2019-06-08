// {Title}: Libs of Node.js
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const dotevn = require('dotenv');
const express = require('express');
const goodjob = express();
const path = require('path');
// const expressValidator = require('express-validator');
// const mongoose = require('mongoose');
// const logger = require('morgan');

// {Support): Parsing of application/json type post Data
// goodjob.use(bodyParser.json());
// goodjob.use(expressValidator())

// (Support}: Parsing of application/x-www-form-urlencoded post data
// goodjob.use(bodyParser.urlencoded({ extended: false }));
// goodjob.use(cookieParser());
// goodjob.use(cors());
// goodjob.use(logger('dev'));

// const DB = mongoose.connection

// {Title}: MongoDB Config

// dotevn.config()

// {Title}: DB Connection
// mongoose.set('userCreateIndex', true)
// mongoose.connect(process.env.DB_URL, {}).then(()
//     => console.log('DB Connected !!!'))
// DB.on('Error', (err)
//     => {
//         console.log('DB Connection Error:', err.message)
// })

goodjob.set('view engine', 'ejs');
goodjob.set('views', './views');

goodjob.use(express.static('static')); // Get css, img, js, ...
///GET------------------
goodjob.get('/', function(req, res) {
    res.render('index');
});
//Get:Category
goodjob.get('/nguoi-tim-viec', function(req, res) {
    res.render('category/findjob');
});
goodjob.get('/viec-tim-nguoi', function(req, res) {
    res.render('category/createjob');
});
//Get:Home
goodjob.get('/dang-nhap', function(req, res) {
    res.render('home/login');
});
goodjob.get('/dang-ki', function(req, res) {
    res.render('home/signup');
});
// {Title}: Load SERVER on Local & Web
goodjob.listen(process.env.PORT || 2019, function () {
    console.log('Your NODE.JS Server is running !!');
});