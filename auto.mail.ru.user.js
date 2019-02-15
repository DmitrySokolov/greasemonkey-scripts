// ==UserScript==
// @name        auto.mail.ru
// @namespace   auto_mail_ru
// @include     https://auto.mail.ru/*
// @version     1
// @grant       none
// ==/UserScript==
!function() {
  var elems = document.querySelectorAll(".article__embed-textarea");
  for (var i = 0; i < elems.length; i += 1) {
    elems[i].parentElement.innerHTML = elems[i].textContent.replace(/"\/\//g, '"https://');
  }
  elems = document.querySelectorAll(".article__item_compareslider");
  for (var i = 0; i < elems.length; i += 1) {
    elems[i].addEventListener('click', function(){
      var el = this.querySelector(".compare__item_first");
      if (el) {
        var z = el.style.zIndex == "" || el.style.zIndex > 0 ? -1 : 2;
        el.style.zIndex = z;
      }
    });
  }
}();
