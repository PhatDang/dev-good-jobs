//
//
//================================
const express = require('express');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const bodyParser = require('body-parser');
const goodjob = express();

var users =  [
    {
        id:1,
        username: "0707144248",
        password: "123456",
        category: 1, //This man find a job !!
    },
    {
        id:2,
        username: "0979679671",
        password: "654321",
        category: 2, //This man create jobs !!
    },
]

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


goodjob.post('/user/success', (req,res) => {
    var user = req.body.phone;
    var pass = req.body.password;
    for (let i = 0; i<users.length; i++) {
        if (user === users[i].username) {
            // res.send('Chúc mừng  TK: ' + users[i].username + ' Đăng nhập thành công!');
            if(users[i].category === 1) {
                res.redirect('/nguoi-tim-viec');
            } else {
                res.redirect('/viec-tim-nguoi')
            }
            break;
        }
    }
})

//{Title}: Load SERVER on Local & Web
goodjob.listen(process.env.PORT || 2019, () => {
    console.log('Your NODE.JS Server is running !!');
});
