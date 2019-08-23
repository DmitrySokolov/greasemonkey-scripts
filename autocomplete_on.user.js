// ==UserScript==
// @name        autocomplete_on
// @namespace   autocomplete_on
// @include     http://gas-nn.ru/*
// @include     https://gas-nn.ru/*
// @include     http://*.gas-nn.ru/*
// @include     https://*.gas-nn.ru/*
// @include     http://lk.rt.ru/*
// @include     https://lk.rt.ru/*
// @version     1
// @grant       none
// ==/UserScript==
!function() {
  var elems = document.getElementsByTagName("input");
  for (var i = 0; i < elems.length; i += 1) {
    if (elems[i].autocomplete) {
      elems[i].autocomplete = "on";
    }
  }
}();
