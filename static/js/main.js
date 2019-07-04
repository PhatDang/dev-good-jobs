// //Switch Tab
// var tabs = document.getElementsByClassName('tab');
// function tabSwitch(element) {
//     for (var i=0; i<tabs.length;i++) {
//         tabs[i].setAttribute('class', 'tab');
//     }
//     element.setAttribute('class','tab active');
// }
// // UX/UI Validation
// let errorList = ["Bạn phải nhập số điện thoại / mật khẩu","Số điện thoại không hợp lệ","Mật khẩu không hợp lệ"]
// let userNameElement = document.querySelector('#phone-log');
// let passWordElement = document.querySelector('#pass-log');
// let messengerElement = document.querySelector('.messenger');
// function clickSubmit() {
//     let userName = userNameElement.value;
//     let passWord = passWordElement.value;
//     if (!userName ||!passWord) {
//         messengerElement.innerHTML = errorList[0] ;
//         return false;
//     }else if (userName.length !== 10) {
//         messengerElement.innerHTML = errorList[1];
//         return false;
//     }else if (passWord.length < 6) {
//         messengerElement.innerHTML = errorList[2] ;
//         return false;
//     }else {
//         return true;
//     }
// }


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