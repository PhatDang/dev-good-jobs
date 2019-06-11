var tabs = document.getElementsByClassName('tab');
function tabSwitch(element) {
    for (var i=0; i<tabs.length;i++) {
        tabs[i].setAttribute('class', 'tab');
    }
    element.setAttribute('class','tab active');
}