//
//
//================================
const express = require('express');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const bodyParser = require('body-parser');
const goodjob = express();

goodjob.set('view engine','ejs');
goodjob.set('views','./views');
goodjob.use('/assets', express.static('static')); // Get css, img, js, ...
goodjob.use(bodyParser.urlencoded({ extended: false }));
goodjob.use(bodyParser.json())

//{Title}: The Routes
goodjob.get('/', (req, res) => {
    res.render('index');
});
goodjob.use('/',categoryRouter);
goodjob.use('/user', userRouter);

//{Title}: Load SERVER on Local & Web
goodjob.listen(process.env.PORT || 2019, () => {
    console.log('Your NODE.JS Server is running !!');
});
