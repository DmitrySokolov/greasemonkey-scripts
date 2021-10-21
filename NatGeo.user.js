// ==UserScript==
// @name     NatGeo
// @version  1
// @grant    none
// @include  https://www.nationalgeographic.com/*
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('\
.Article {\
  max-width: none !important;\
}\
.Article__Column--sidebar {\
  display: none !important;\
}\
.Article__Wrapper {\
  max-width: none !important;\
  margin-left:  10% !important;\
  margin-right: 10% !important;\
}\
.Gallery__Image {\
  width: 100% !important;\
}\
     ');
}();
