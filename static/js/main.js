//Switch Tab
var tabs = document.getElementsByClassName('tab');
<<<<<<< HEAD
function tabSwitch(element) {
    for (var i=0; i<tabs.length;i++) {
        tabs[i].setAttribute('class', 'tab');
    }
    element.setAttribute('class','tab active');
}
// UX/UI Validation
let errorList = ["Bạn phải nhập số điện thoại / mật khẩu","Số điện thoại không hợp lệ","Mật khẩu không hợp lệ"]
let userNameElement = document.querySelector('#phone-log');
let passWordElement = document.querySelector('#pass-log');
let messengerElement = document.querySelector('.messenger');
function clickSubmit() {
    let userName = userNameElement.value;
    let passWord = passWordElement.value;
    if (!userName ||!passWord) {
        messengerElement.innerHTML = errorList[0] ;
        return false;
    }else if (userName.length !== 10) {
        messengerElement.innerHTML = errorList[1];
        return false;
    }else if (passWord.length < 6) {
        messengerElement.innerHTML = errorList[2] ;
        return false;
    }else {
=======

function tabSwitch(element) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute('class', 'tab');
    }
    element.setAttribute('class', 'tab active');
}
// UX/UI Validation
let errorList = ["Bạn phải nhập số điện thoại / mật khẩu", "Số điện thoại không hợp lệ", "Mật khẩu không hợp lệ"]
let userNameElement = document.querySelector('#phone-log');
let passWordElement = document.querySelector('#pass-log');
let messengerElement = document.querySelector('.messenger');

function clickSubmit() {
    let userName = userNameElement.value;
    let passWord = passWordElement.value;
    if (!userName || !passWord) {
        messengerElement.innerHTML = errorList[0];
        return false;
    } else if (userName.length !== 10) {
        messengerElement.innerHTML = errorList[1];
        return false;
    } else if (passWord.length < 6) {
        messengerElement.innerHTML = errorList[2];
        return false;
    } else {
>>>>>>> 1b26fb91504213f5e4f22f7a00f2209036cf7d43
        return true;
    }
}
