// ==UserScript==
// @name     Reddit
// @version  1
// @grant    none
// @include  https://www.reddit.com/*
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('\
div[style*="commentswrapper-gradient-color"] {\
  max-height: none !important;\
}\
');
}();
