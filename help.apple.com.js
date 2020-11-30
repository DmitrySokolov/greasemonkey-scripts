// ==UserScript==
// @name     help.apple.com
// @version  1
// @grant    none
// @include  https://help.apple.com/xcode/*
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('\
div.content.centered {\
	max-width: none !important;\
}\
div.content.centered div.topic-container {\
	max-width: none !important;\
	font-size: 1.0rem !important;\
}\
     ');
}();
