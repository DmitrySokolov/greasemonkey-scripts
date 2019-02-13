// ==UserScript==
// @name        Yandex.Market
// @namespace   yandex_market
// @include     https://market.yandex.ru/*
// @include     http://market.yandex.ru/*
// @version     1
// @grant       none
// ==/UserScript==
!function() {
  var links = document.querySelectorAll("a.button_to_prices");
  for (var i = 0; i < links.length; i += 1) {
    links[i].href += "&how=aprice";
  }
  var btn = document.querySelector("li.n-product-tabs__item_name_offers a");
  if (btn) {
    btn.href += "&how=aprice";
  }
  
  function updateRating(elem) {
    return (e) => {
      //console.log("--- updateRating ---");
      var r = e.target.responseXML.querySelectorAll(".rating-review__count");
      if (r.length === 5) {
        var cnt = [];
        for (var i = 0; i < r.length; i += 1) {
          cnt[i] = parseInt(r[i].textContent.split(/\s+/)[0]);
        }
        var total = cnt.reduce( (s,v,i,a) => s+v );
        var p = Math.floor( (cnt[3]+cnt[4])*100/total + 0.5 );
        var span = elem.parentElement.parentElement.parentElement.querySelector(".n-snippet-card2__reasons-to-buy-item:last-child .n-reasons-to-buy__label");
        var total2 = span ? parseInt(span.textContent.split(/\s+/)[0]) : 0;
        var p2 = total2 > 0 ? Math.floor( (cnt[3]+cnt[4])*100/Math.max(total2,total) + 0.5 ) : "&mdash;";
        elem.innerHTML = "Отрицательных "+p+"/"+p2+"%";
        if (p <= 17) { elem.style.color = "green"; }
        //console.log(cnt, total)
      }
    }
  }
  
  var cards = document.querySelectorAll(".n-snippet-card2__part_type_right .n-snippet-card2__bottom");
  for (var i = 0; i < cards.length; i += 1) {
    var d = document.createElement("div");
    d.innerHTML = "??%";
    d.style.color = "red";
    d.style.textAlign = "right";
    d.style.marginBottom = "0.5rem";
    cards[i].appendChild(d);
    var a = cards[i].parentElement.parentElement.querySelector("a.n-snippet-card2__rating");
    if (a) {
      var req = new XMLHttpRequest();
      req.open("GET", a.href, /*async*/true);
      req.responseType = "document";
      req.onload = updateRating(d);
      req.send();
    }
  }
}();
