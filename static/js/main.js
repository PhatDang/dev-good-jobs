//Switch Box login and Reg modal
const regElem = document.getElementById('reg-modal');
const logInElem = document.getElementById('login-modal');
function regModal() { regElem.style.display = 'block'; logInElem.style.display = 'none'; }
function loginModal() { logInElem.style.display = 'block'; regElem.style.display = 'none'; }
function outModal() { logInElem.style.display = 'none'; regElem.style.display = 'none'; }
//Validation
let errors = [];
const getInputPass = document.querySelector("#reg_form .password");
const getInputPass2 = document.querySelector("[name='password2']");
const getPassLog = document.querySelector("#password");
const getEmail = document.querySelector(".email");
const formEl = document.querySelector('#login_form');
const errEl = document.querySelector(".err_text");
const getEmailLog = document.querySelector("#email");
const getFullName = document.querySelector("#fullname");
const getDisPlayName = document.querySelector("#display-name");
const tooltip = document.querySelector(".tooltips");
const err1 = document.querySelector("[err='1']");
const err2 = document.querySelector("[err='2']");
const err3 = document.querySelector("[err='3']");
const err4 = document.querySelector("[err='4']");
const err5 = document.querySelector("[err='5']");
const err6 = document.querySelector("[err='6']");
const err7 = document.querySelector("[err='7']");
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const fullNameReg = /[a-zA-Z ]/;
const passWordreg = /[0-9a-zAZ@!#]/;
getInputPass.addEventListener('focus', () => { tooltip.setAttribute('class', 'tooltips show'); })
getInputPass.addEventListener('blur', () => { tooltip.setAttribute('class', 'tooltips'); })
getInputPass.addEventListener('keyup', () => {
    let validPass = getInputPass.value; let i = 0;
    if (validPass.length >= 6) { err1.style.color = "#66d062"; i += 1; } else { err1.style.color = ""; i -= 1; }
    if ((/[0-9]/).test(validPass)) { err2.style.color = "#66d062"; i += 1; } else { err2.style.color = ""; i -= 1; }
    if ((/[A-Z]/).test(validPass)) { err3.style.color = "#66d062"; i += 1; } else { err3.style.color = ""; i -= 1; }
    if ((/[a-z]/).test(validPass)) { i += 1; err4.style.color = "#66d062"; } else { err4.style.color = ""; i -= 1; }
    if ((/[#!@]/).test(validPass)) { err5.style.color = "#66d062"; i += 1; } else { err5.style.color = ""; i -= 1; }
    if (i >= 5) { tooltip.setAttribute('class', 'tooltips'); err6.style.color = "#66d062"; } else { tooltip.setAttribute('class', 'tooltips show'); err6.style.color = "red"; }
})
getInputPass2.addEventListener('keyup', () => {
    let validPass = getInputPass.value; let validPass2 = getInputPass2.value;
    if (validPass !== validPass2 || validPass2.length < 6) { err7.style.color = "red"; } else { err7.style.color = "#66d062"; }
})
getEmail.addEventListener('blur', () => {
    let email = getEmail.value;
    if ((emailReg).test(email.toLowerCase())) {
        getEmail.style.borderColor = "#000";
    } else {
        getEmail.style.borderColor = "#e74c3c";
    }
})
getFullName.addEventListener('blur', () => {
    let fullName = getFullName.value;
    if ((fullNameReg).test(fullName)) {
        getFullName.style.borderColor = "#000";
    } else {
        getFullName.style.borderColor = "#e74c3c";
    }
})
getDisPlayName.addEventListener('blur', () => {
    let disPlayName = getDisPlayName.value;
    if (disPlayName.length <= 225 && disPlayName.length >= 1) {
        getDisPlayName.style.borderColor = "#000";
    } else {
        getDisPlayName.style.borderColor = "#e74c3c";
    }
})
function checkLogErr() {
    let email = getEmailLog.value;
    let password = getPassLog.value;
    if (email.length < 1 || password.length < 1) {
        errEl.innerHTML = "Không được để trống email / mật khẩu";
        event.preventDefault()
    } else if (!(emailReg).test(email) || password.length < 6) {
        errEl.innerHTML = "Email hoặc mật khẩu không hợp lệ";
        event.preventDefault()
    } else {
        return true;
    }
}
