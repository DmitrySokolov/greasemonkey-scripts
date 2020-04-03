// ==UserScript==
// @name        Lenta.ru
// @namespace   habr
// @include     https://lenta.ru/*
// @version     1
// @grant       none
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  }('\
#root {\
  width: unset !important;\
  margin-right: 50px !important;\
}\
#up {\
  left: unset !important;\
  right: 10px !important;\
}\
.g-layout {\
  width: unset !important;\
  margin-left: 40px !important;\
  margin-right: 40px !important;\
}\
.b-topic-layout__content {\
  display: flex !important;\
}\
.b-topic-layout__right {\
  float: unset !important;\
  order: 2 !important;\
}\
.b-topic-layout__left {\
  float: unset !important;\
  width: unset !important;\
  margin-right: 40px !important;\
}\
.b-topic__socials._header {\
  display: none !important;\
}\
.b-topic .b-text {\
  font-size: 20px !important;\
  line-height: 125% !important;\
}\
.b-topic .b-text > *:nth-last-child(-n+3) {\
  display: none !important;\
}\
     ');
}();
