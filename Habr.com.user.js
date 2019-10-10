// ==UserScript==
// @name        Habr.com
// @namespace   habr
// @include     https://habr.com/*/post/*
// @include     https://habr.com/*/company/*
// @include     https://habr.com/*/news/*
// @include     https://habr.com/*/flows/*
// @include     https://habr.com/*/top/*
// @include     https://habr.com/*/all/*
// @version     5
// @grant       none
// ==/UserScript==
!function(){
  function getSwitch(cbody) {
    return cbody.querySelector('.replies_switch');
  }
  function getReplies(cbody) {
    return cbody.parentElement.querySelector('.content-list_nested-comments');
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
    toggleReplies(e.target.parentElement);
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
    var clist = document.querySelectorAll('#comments-list li.content-list__item_comment');
    for (var i = 0; i < clist.length; i += 1) {
      var crepl = clist[i].querySelector('.content-list_nested-comments');
      if (crepl.querySelector('li')) {
        appendSwitch(clist[i].querySelector('.comment'));
      }
    }
  }();
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('.post__text {\
        font-family: Noto Sans !important;\
        font-size: 20px !important;\
      }\
      .post__text h3 {\
        font-family: Noto Sans !important;\
        font-size: 1.2em !important;\
      }\
      .layout__cell_body {\
        max-width: 1750px !important;\
      }\
      .sidebar_right .sidebar_content-area {\
        margin-left: -250px !important;\
      }\
      li:not([id]).content-list__item.content-list__item_post.shortcuts_item {\
        display: none !important;\
      }\
     ');
}();
