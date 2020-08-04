// ==UserScript==
// @name        Yandex.Market
// @namespace   yandex_market
// @include     https://market.yandex.ru/*
// @include     http://market.yandex.ru/*
// @version     8
// @grant       none
// ==/UserScript==
!function() {
  let links = document.querySelectorAll("a.button_to_prices, a.link_type_prices, .n-compare-cell a.link");
  for (let a of links) {
    a.href += "&how=aprice";
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

  function findProductCardTitles() {
    return document.querySelectorAll("[data-zone-name='snippet-card'] [data-zone-name='title']");
  }

  function findRatingLink(title_block) {
    return title_block.querySelector("a[data-zone-name='rating']");
  }

  function findBuyCount(title_block) {
    let elem = title_block.parentElement.querySelector(":scope > div:last-child > div:last-child");
    return elem ? getNumber(elem.textContent) : 0;
  }

  function getProductRatingStat(responseXML) {
    let r = responseXML.querySelectorAll("div[data-zone-name='product-rating-stat'] a > div:last-child");
    let cnt = [];
    for (let i = 0; i < 5; i += 1) {
      cnt[i] = i < r.length ? getNumber(r[i].textContent) : 0;
    }
    return cnt;
  }

  function getNumber(s) {
    let m = s.replace(/\s+/, "").match(/\d+/);
    let r = m !== null ? parseInt(m[0]) : 0;
    return r;
  }

  function updateRating(elem, counter, url) {
    return (e) => {
      //console.log("--- updateRating ---");
      let cnt = getProductRatingStat(e.target.responseXML);
      //console.log(cnt);
      let total = cnt.reduce( (s,v,i,a) => s+v );
      let p = Math.floor( (cnt[3]+cnt[4])*100/total + 0.5 );
      let total2 = findBuyCount(elem.parentElement);
      let p2 = total2 > 0 ? Math.floor( (cnt[3]+cnt[4])*100/Math.max(total2,total) + 0.5 ) : "&mdash;";
      elem.innerHTML = `Отрицательных ${p}/${p2}%`;
      if (p <= RSTAT_THRESHOLD) { elem.style.color = RSTAT_GOOD_COLOR; }
      counter.cache[url] = {p: p, p2: p2};
    }
  }

  function updateProductCard(title_block, counter) {
    let a = findRatingLink(title_block);
    if (a) {
      let url = a.href.split("?")[0];
      let cached = counter.cache[url] ? true : false;
      let el = document.createElement("span");
      el.className = RSTAT;
      el.innerHTML = cached ? `Отрицательных ${counter.cache[url].p}/${counter.cache[url].p2}%` : RSTAT_INIT_VAL;
      el.style.color = cached && counter.cache[url].p <= RSTAT_THRESHOLD ? RSTAT_GOOD_COLOR : RSTAT_INIT_COLOR;
      el.style.marginLeft = ".5em";
      title_block.appendChild(el);
      if (!cached) {
        setTimeout((el_, a_, c_, url_) => {
          let req = new XMLHttpRequest();
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
    let titles = findProductCardTitles();
    for (let elem of titles) {
      if (!elem.parentElement.querySelector(`.${RSTAT}`)) {
        updateProductCard(elem.parentElement, counter);
      }
    }
    if (counter.max <= 0) {
      counter.max = counter.val = 1;
    }
  }

  function startObserving(o) {
    let n = document.querySelector("[data-apiary-widget-id='/content/results']");
    o.observe(n, {attributes: false, childList: true, subtree: true});
  }

  var counter = {val: 0, max: 0, cache: {}};
 
  startUpdating(counter);

  startObserving(new MutationObserver((mutationsList, observer) => {
    //console.log("--- mutaion ---");
    let isOwnChange = mutationsList.some(record => { return record.target.classList.contains(RSTAT); });
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
