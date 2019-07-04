//Switch Box login and Reg modal
const regElem = document.getElementById('reg-modal');
const logInElem = document.getElementById('login-modal');
function regModal() {
    regElem .style.display='block';
    logInElem.style.display='none';
}
function loginModal() {
    logInElem.style.display='block';
    regElem .style.display='none';
}
function outModal() {
    logInElem.style.display='none';
    regElem .style.display='none';
}
//Validation
const getInputPass = document.querySelector("#reg_form #password");
const getInputPass2 = document.querySelector("[name='password2']")
const tooltip = document.querySelector(".tooltips");
const err1 = document.querySelector("[err='1']");
const err2 = document.querySelector("[err='2']");
const err3 = document.querySelector("[err='3']");
const err4 = document.querySelector("[err='4']");
const err5 = document.querySelector("[err='5']");
const err7 = document.querySelector("[err='7']");
getInputPass.addEventListener('focus',() => {
    tooltip.setAttribute('class', 'tooltips show');
})
getInputPass.addEventListener('blur', () => {
    tooltip.setAttribute('class', 'tooltips');
})
getInputPass.addEventListener('change', () => {
    let validPass = getInputPass.value;
    validPass = [...validPass];
    console.log(validPass);
    if(validPass.length>=6) {
        err1.style.color = "#66d062";
    } else {
        err1.style.color = "";
    }
    let findNumber = validPass.find((number) => !isNaN(number));
    if(findNumber) {
        err2.style.color = "#66d062";
    } else {
        err2.style.color = "";
    }
})
getInputPass2.addEventListener('change', () => {
    let validPass = getInputPass.value;
    let validPass2 = getInputPass2.value;
    if(validPass !== validPass2) {
        err7.style.color = "red";
    } else {
        err7.style.color = "#66d062";
    }
})
