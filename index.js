//
//
//================================
const express = require('express');
const homeRouter = require('./routes/home.route');
const categoryRouter = require('./routes/category.route');
const bodyParser = require('body-parser');
const goodjob = express();

var users =  [
    {
        id:1,
        username: "0707144248",
        password: "123456",
    },
    {
        id:2,
        username: "0979679671",
        password: "654321",
    },
]

goodjob.set('view engine','ejs');
goodjob.set('views','./views');
goodjob.use(express.static('static')); // Get css, img, js, ...
goodjob.use(bodyParser.urlencoded({ extended: false }));
goodjob.use(bodyParser.json())

//{Title}: The Routes
goodjob.get('/', (req, res) => {
    res.render('index');
});
goodjob.use('/',categoryRouter);
goodjob.use('/', homeRouter);


goodjob.post('/dang-nhap/valid', (req,res) => {
    var user = req.body.phone;
    var pass = req.body.password;
    for (let i = 0; i<users.length; i++) {
        if (user !== users[i].username) {
            console.log('error');
            continue;
        } else {
            res.send('Chúc mừng  TK: ' + users[i].username + ' Đăng nhập thành công!');
            break;
        }
    }
})

//{Title}: Load SERVER on Local & Web
goodjob.listen(process.env.PORT || 2019, () => {
    console.log('Your NODE.JS Server is running !!');
});
