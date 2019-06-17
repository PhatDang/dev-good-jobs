//
//
//================================
var users = [{
    id: 1,
    userName: "0707144248",
    firstName: "Phat",
    lastName: "Dang Minh",
    passWord: "123456",
    category: 1, //This man wanna find a job !!
}, {
    id: 2,
    userName: "0979679671",
    firstName: "Nguyen Huu",
    lastName: "Duc",
    passWord: "123456",
    category: 2, //This man wanna create jobs !!
}, {
    id: 3,
    userName: "0937475448",
    firstName: "Le Minh",
    lastName: "Trung",
    passWord: "123456",
    category: 2, //This man wanna create jobs !!
}, {
    id: 4,
    userName: "0926609866",
    firstName: "Nguyen",
    lastName: "Hung",
    passWord: "123456",
    category: 1, //This man wanna find a job !!
}, ]
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
        if (user === users[i].userName && pass === users[i].passWord) {
            var userPass = users[i];
            if (users[i].category === 1) {
                res.render('users/success', userPass);
            } else {
                res.render('users/success', userPass);
            }
            break;
        }
    }
}
