// ==UserScript==
// @name        Yandex.Market
// @namespace   yandex_market
// @include     https://market.yandex.ru/*
// @include     http://market.yandex.ru/*
// @version     11
// @grant       none
// ==/UserScript==
!function() {

  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  }('\
		div[data-apiary-widget-id*="/offersCarousel"] {\
  		display: none !important;\
		}\
		div[data-apiary-widget-id*="/madvBasicCarousel"] {\
  		display: none !important;\
		}\
			div[data-apiary-widget-id*="/madvCasualCarousel"] {\
  		display: none !important;\
		}\
	');

  !function fixUrls() {
  	let links = document.querySelectorAll("a.button_to_prices, a.link_type_prices, .n-compare-cell a.link");
  	for (let a of links) {
    	a.href += "&how=aprice";
  	}
  	var btn = document.querySelector("li.n-product-tabs__item_name_offers a");
  	if (btn) {
	    btn.href += "&how=aprice";
	  }
  }();

  const RSTAT = "rstat";
  const RSTAT_INIT_VAL = "??%";
  const RSTAT_INIT_COLOR = "red";
  const RSTAT_GOOD_COLOR = "green";
  const RSTAT_THRESHOLD = 17;

  function findProductCardTitles() {
    const nodes_ = document.querySelectorAll("[data-zone-name='snippet-card'] [data-zone-name='title']");
    console.log(`-- found '${nodes_.length}' cards`);
    return nodes_;
  }

  function findRatingUrl(title_block) {
    let a = title_block.querySelector("h3 a");
    return a ? (a.href.split("?")[0] + "/reviews") : "";
  }

  function findBuyCount(title_block) {
    let elem = title_block.querySelector("[data-auto='rating-badge']+span");
    return elem ? getNumber(elem.textContent) : 0;
  }

  function getProductRatingStat(responseXML) {
    let r = responseXML.querySelectorAll("div[data-zone-name='product-rating-stat'] a > div:last-child");
    //console.log(responseXML);
    //console.log(r);
    let cnt = [0,0,0,0,0];
    for (let rate of r) {
      c = getNumber(rate.parentElement.querySelector("div[data-rate]").attributes["data-rate"].textContent);
      cnt[5-c] = getNumber(rate.textContent)
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
      console.log("--- updateRating ---");
      console.log(`URL: ${url}`);
      let cnt = getProductRatingStat(e.target.responseXML);
      console.log(cnt);
      let total = cnt.reduce( (s,v,i,a) => s+v );
      let p = Math.floor( (cnt[3]+cnt[4])*100/total + 0.5 );
      console.log(`total=${total}, ${p}%`);
      let total2 = findBuyCount(e.target.responseXML);
      let p2 = total2 > 0 ? Math.floor( (cnt[3]+cnt[4])*100/Math.max(total2,total) + 0.5 ) : "&mdash;";
      console.log(`total2=${total2}, ${p2}%`);
      elem.innerHTML = `Отрицательных ${p}/${p2}%`;
      if (p <= RSTAT_THRESHOLD) { elem.style.color = RSTAT_GOOD_COLOR; }
      counter.cache[url] = {p: p, p2: p2};
    }
  }

  function updateProductCard(title_block, counter) {
    let url = findRatingUrl(title_block);
    if (url.length > 0) {
      let cached = counter.cache[url] ? true : false;
      let el = document.createElement("span");
      //console.log(`--- URL: ${url}`);
      el.className = RSTAT;
      el.innerHTML = cached ? `Отрицательных ${counter.cache[url].p}/${counter.cache[url].p2}%` : RSTAT_INIT_VAL;
      el.style.color = cached && counter.cache[url].p <= RSTAT_THRESHOLD ? RSTAT_GOOD_COLOR : RSTAT_INIT_COLOR;
      el.style.marginLeft = "0em";
      el.style.display = "block";
      title_block.querySelector("h3").appendChild(el);
      if (!cached) {
        setTimeout((el_, orig_url_, c_, url_) => {
          let req = new XMLHttpRequest();
          req.open("GET", orig_url_, /*async*/true);
          req.responseType = "document";
          req.addEventListener("load", updateRating(el_, c_, url_), false);
          req.addEventListener("loadend", (e) => {
            c_.val += 1;
            //console.log(`-- status: ${e.target.status}, counter: ${c_.val} / ${c_.max}`);
          }, false);
          req.send();
        }, Math.random()*300+200, el, url, counter, url);
        counter.max += 1;
    	}
    } else {
      console.log(`-- could not find rating URL`, title_block);
    }
  }

  function startUpdating(counter) {
    console.log("--- startUpdating ---");
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
    console.log("--- startObserving ---");
    setTimeout((o_) => {
      let n = document.querySelector("[data-apiary-widget-name='@marketfront/SearchSerp']");
      o_.observe(n, {attributes: false, childList: true, subtree: true});
    }, 0, o);
  }

  var counter = {val: 0, max: 0, cache: {}};
 
  startUpdating(counter);

  startObserving(new MutationObserver((mutationsList, observer) => {
    console.log("--- mutaion ---");
    let isOwnChange = mutationsList.some(record => { return record.target.classList.contains(RSTAT); });
    //console.log(`ownChange: ${isOwnChange}, counter: ${counter.val} / ${counter.max}`);
    if (!isOwnChange && counter.val == counter.max && counter.max > 0) {
      console.log("--- re-init ---");
      observer.disconnect();
      setTimeout((c_, o_) => {
        startUpdating(c_);
        startObserving(o_);
      }, 0, counter, observer);
    }
  }));
}();
