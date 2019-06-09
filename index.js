//
//
//================================
const express = require('express');
const homeRouter = require('./routes/home.route');
const categoryRouter = require('./routes/category.route');

const goodjob = express();

goodjob.set('view engine','ejs');
goodjob.set('views','./views');
goodjob.use(express.static('static')); // Get css, img, js, ...
//{Title}: The Routes
goodjob.get('/', (req, res) => {
    res.render('index');
});
goodjob.use('/',categoryRouter);
goodjob.use('/', homeRouter);

//{Title}: Load SERVER on Local & Web
goodjob.listen(process.env.PORT || 2019, () => {
    console.log('Your NODE.JS Server is running !!');
});
