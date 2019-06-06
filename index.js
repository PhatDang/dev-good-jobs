const express = require('express');
const goodjob = express();
const port = 3008;

goodjob.use(express.static('public'));

goodjob.set('view engine', 'ejs');
goodjob.set('views', './views');

goodjob.get('/', (req, res)=> {
    res.render('index');
})
goodjob.get('/home', (req, res)=> {
    res.render('home/home');
})

goodjob.listen(port, ()=> {
    console.log('loading......')
})