// ==UserScript==
// @name        Yandex.Market
// @namespace   yandex_market
// @include     https://market.yandex.ru/*
// @include     http://market.yandex.ru/*
// @version     3
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

  const RSTAT = "rstat";
  const RSTAT_INIT_VAL = "??%";
  const RSTAT_INIT_COLOR = "red";
  const RSTAT_GOOD_COLOR = "green";
  const RSTAT_THRESHOLD = 17;

  function updateRating(elem, counter, url) {
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
        elem.innerHTML = `Отрицательных ${p}/${p2}%`;
        if (p <= RSTAT_THRESHOLD) { elem.style.color = RSTAT_GOOD_COLOR; }
        counter.cache[url] = {p: p, p2: p2};
      }
    }
  }

  function updateElem(elem, counter) {
    var a = elem.querySelector("a.n-snippet-card2__rating");
    if (a) {
      var url = a.href.split("?")[0];
      var cached = counter.cache[url] ? true : false;
      var el = document.createElement("span");
      el.className = RSTAT;
      el.innerHTML = cached ? `Отрицательных ${counter.cache[url].p}/${counter.cache[url].p2}%` : RSTAT_INIT_VAL;
      el.style.color = cached && counter.cache[url].p <= RSTAT_THRESHOLD ? RSTAT_GOOD_COLOR : RSTAT_INIT_COLOR;
      elem.appendChild(el);
      if (!cached) {
        setTimeout((el_, a_, c_, url_) => {
          var req = new XMLHttpRequest();
          req.open("GET", a_.href, /*async*/true);
          req.responseType = "document";
          req.addEventListener("load", updateRating(el_, c_, url_), false);
          req.addEventListener("loadend", (e) => {
            c_.val += 1;
            //console.log(`-- status: ${e.target.status}, counter: ${c_.val} / ${c_.max}`);
          }, false);
          req.send();
        }, Math.random()*300+200, el, a, counter, url);
        counter.max += 1;
    	}
    }
  }

  function startUpdating(counter) {
    //console.log("--- startUpdating ---");
    counter.max = 0;
    counter.val = 0;
    var elem = document.querySelectorAll(".n-snippet-card2__part_type_center .n-snippet-card2__header-stickers");
    for (var i = 0; i < elem.length; i += 1) {
      if (!elem[i].querySelector(`.${RSTAT}`)) {
        updateElem(elem[i], counter);
      }
    }
    if (counter.max <= 0) {
      counter.max = counter.val = 1;
    }
  }

  function startObserving(o) {
    var n = document.querySelector(".n-snippet-list");
    o.observe(n, {attributes: false, childList: true, subtree: true});
  }

  var counter = {val: 0, max: 0, cache: {}};
 
  startUpdating(counter);

  startObserving(new MutationObserver((mutationsList, observer) => {
    //console.log("--- mutaion ---");
    var isOwnChange = mutationsList.some(record => { return record.target.classList.contains(RSTAT); });
    //console.log(`ownChange: ${isOwnChange}, counter: ${counter.val} / ${counter.max}`);
    if (!isOwnChange && counter.val == counter.max && counter.max > 0) {
      //console.log("--- re-init ---");
      observer.disconnect();
      setTimeout((c_, o_) => {
        startUpdating(c_);
        startObserving(o_);
      }, 0, counter, observer);
    }
  }));
}();
