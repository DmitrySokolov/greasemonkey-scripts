// ==UserScript==
// @name        Image hosters
// @namespace   image_hosters
// @include     http://imgtiger.org/*
// @include     http://imgclick.net/*
// @include     http://imagetwist.com/*
// @include     http://www.dofiga.net/*
// @include     http://imageon.org/*
// @include     http://imgoutlet.com/*
// @include     http://imgfiles.org/*
// @version     1
// @grant       none
// ==/UserScript==
setTimeout(function() {
  var btn = document.getElementById("continueButton");
  if (btn) {
    btn.click();
    return;
  } else if (btn = document.querySelector(".imgclick input")) {
    btn.click();
    return;
  } else if (btn = document.querySelector("#btn_download:nth-child(6)")) {
    btn.click();
    return;
  } else if (btn = document.querySelector("form[name='F1']")) {
    btn.submit();
    return;
  }
  var elem = document.querySelector(".spoiler");
  if (elem) {
    elem.style.display = "";
  } else if (elem = document.querySelector("#show img")) {
    elem.style.maxWidth = "1000px";
  } else if (elem = document.querySelector("img.pic")) {
    elem.style.maxWidth = "1100px";
  } else if (elem = document.querySelector("img#image")) {
    elem.style.width = "auto";
    elem.style.height = "auto";
  }
}, 1000);
