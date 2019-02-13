// ==UserScript==
// @name        Habr.com
// @namespace   habr
// @include     https://habr.com/post/*
// @include     https://habr.com/company/*
// @include     https://habrahabr.ru/post/*
// @include     https://habrahabr.ru/company/*
// @include     https://geektimes.com/post/*
// @include     https://geektimes.com/company/*
// @include     https://geektimes.ru/post/*
// @include     https://geektimes.ru/company/*
// @version     3
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
}();
