// ==UserScript==
// @name        Yandex.Market
// @namespace   yandex_market
// @include     https://market.yandex.ru/*
// @include     http://market.yandex.ru/*
// @version     2
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

  function updateRating(elem, counter) {
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
      }
    }
  }

  const RSTAT = "rstat";

  function startCardsUpdating(counter) {
    //console.log("--- startCardsUpdating ---");
    counter.max = 0;
    counter.val = 0;
    var elem = document.querySelectorAll(".n-snippet-card2__part_type_center .n-snippet-card2__header-stickers");
    for (var i = 0; i < elem.length; i += 1) {
      if (!elem[i].querySelector("."+RSTAT)) {
        var el = document.createElement("span");
        el.className = RSTAT;
        el.innerHTML = "??%";
        el.style.color = "red";
        elem[i].appendChild(el);
        var a = elem[i].querySelector("a.n-snippet-card2__rating");
        if (a) {
          setTimeout((el_, a_, c_) => {
          	var req = new XMLHttpRequest();
          	req.open("GET", a_.href, /*async*/true);
          	req.responseType = "document";
          	req.addEventListener("load", updateRating(el_, c_), false);
          	req.addEventListener("loadend", (e) => {
	            c_.val += 1;
	            //console.log("-- status: "+e.target.status+", counter: "+c_.val+" / "+c_.max);
	          }, false);
	          req.send();
	          c_.max += 1;
          }, Math.random()*300+200, el, a, counter);
        }
      }
    }
  }

  function startObserve(o) {
    //var n = document.querySelector(".n-snippet-list");
    var n = document.querySelector(".n-filter-applied-results__content");
    o.observe(n, {attributes: false, childList: true, subtree: true});
  }

  var counter = {val: 0, max: 0, done: true};
 
  startCardsUpdating(counter);

  startObserve(new MutationObserver((mutationsList, observer) => {
    var isOwn = false;
    for (var record of mutationsList) {
      if (record.target.classList.contains(RSTAT)) { isOwn = true; break; }
    }
    if (counter.val == counter.max && counter.max > 0 && !isOwn) {
      observer.disconnect();
      startObserve(observer);
      startCardsUpdating(counter);
    }
  }));
}();
