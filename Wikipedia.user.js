// ==UserScript==
// @name     Wikipedia
// @version  1
// @grant    none
// @include  https://*.wikipedia.org/*
// ==/UserScript==
!function(){
  function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  }
  addStyle(
    '.mw-body-content p {\
       font-size: 1.1rem !important;\
     }\
    ');
}();
