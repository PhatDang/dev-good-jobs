//
//
//================================
var users = [
    {
        id: 1,
        username: "0707144248",
        password: "a",
        category: 1, //This man wanna find a job !!
    },
    {
        id: 2,
        username: "0979679671",
        password: "a",
        category: 2, //This man wanna create jobs !!
    },
]
var s = {};
module.exports.signIn = (req, res) => {
    res.render('users/signin');
}
module.exports.signUp = (req, res) => {
    res.render('users/signup');
}
module.exports.signInValid = (req, res) => {
    var user = req.body.phone;
    var pass = req.body.password;
    for (let i = 0; i < users.length; i++) {
        if (user === users[i].username && pass === users[i].password) {
            if (users[i].category === 1) {
                res.render('category/findjob', users[i]);
            } else {
                res.render('category/createjob', users[i])
            }
            break;
        }
    }
}
