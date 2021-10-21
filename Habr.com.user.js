// ==UserScript==
// @name        Habr.com
// @namespace   habr
// @include     https://habr.com/*
// @version     6
// @grant       none
// ==/UserScript==
!function(){
  function getSwitch(cbody) {
    return cbody.querySelector('.replies_switch');
  }
  function getReplies(cbody) {
    return cbody.parentElement.querySelector('.tm-comment-thread-functional__children');
  }
  function toggleReplies(cbody) {
    var btn = getSwitch(cbody);
    var creplies = getReplies(cbody);
    if (creplies.style.display == 'none') {
      btn.textContent = '\u2013';
      creplies.style.display = '';
    } else {
      btn.textContent = '+';
      creplies.style.display = 'none';
    }
  }
  function handleSwitchClicks(e) {
    toggleReplies(e.target.parentElement.parentElement.parentElement);
    e.stopPropagation();
  }
  function appendSwitch(cbody) {
    var elem = document.createElement('div');
    elem.className = 'replies_switch';
    elem.textContent = '\u2013';
    elem.style.position = 'absolute';
    elem.style.left = '-20px';
    elem.style.bottom = '0px';
    elem.style.fontSize = '14pt';
    elem.style.backgroundColor = '#eee';
    elem.style.cursor = 'pointer';
    elem.addEventListener('click', handleSwitchClicks, false);
    cbody.appendChild(elem);
  }
  !function main() {
    var clist = document.querySelectorAll('.tm-article-comments section.tm-comment');
    for (var i = 0; i < clist.length; i += 1) {
      var crepl = clist[i].querySelector('.tm-comment-thread-functional__children');
      if (crepl) {
        appendSwitch(clist[i].querySelector('.tm-comment'));
      }
    }
  }();
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('#post-content-body > div, #post-content-body > div p {\
        font-family: Noto Sans !important;\
        font-size: 24px !important;\
        line-height: unset !important;\
      }\
      #post-content-body > div h3 {\
        font-family: Noto Sans !important;\
        font-size: 1.2em !important;\
      }\
			.tm-comment__body-content div, .tm-comment__body-content p {\
        font-family: Noto Sans !important;\
        font-size: 20px !important;\
        line-height: 130% !important;\
      }\
      .tm-page-width, .tm-article-sticky-panel__icons, .tm-article-presenter__footer, .tm-article-comments {\
        max-width: 1780px !important;\
      }\
      .tm-scroll-top, .tm-editoral-subscription {\
        display: none !important;\
      }\
     ');
}();
