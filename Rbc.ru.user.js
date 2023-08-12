// ==UserScript==
// @name        Rbc.ru
// @namespace   habr
// @include     https://www.rbc.ru/*
// @include     https://*.rbc.ru/*
// @version     2
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
.topline {\
  max-width: unset !important;\
}\
.l-window.l-window-overflow-mob {\
  max-width: unset !important;\
}\
.l-window.l-window-overflow-mob .news-feed {\
  top: 0px !important;\
}\
.l-col-main .l-col-center-590 {\
  max-width: 900px !important;\
}\
.l-col-right .l-col-100h-parent {\
  display: none !important;\
}\
.article__text, .article__text p {\
  font-size: 22px !important;\
  line-height: 130% !important;\
}\
.article__text .pro-anons {\
  display: none !important;\
}\
.social-onboarding-place {\
  display: none !important;\
}\
     ');
}();
