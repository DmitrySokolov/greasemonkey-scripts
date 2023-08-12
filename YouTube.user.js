// ==UserScript==
// @name     YouTube
// @version  1
// @grant    none
// @include  https://www.youtube.com/feed/subscriptions
// ==/UserScript==
!function() {

  function doWork() {
    const hide_list_ = ["/shorts/", "/@OdesaFilmStudio"];
    
    console.log("--- processing ---")
    let all_ = [...document.querySelectorAll("ytd-grid-video-renderer")];
    for (const s of hide_list_) {
      let found_ = all_.filter(elem => {return elem.querySelectorAll(`a[href^="${s}"]`).length > 0});
      console.log(`#metadata a[href^="${s}"]`, found_.length);
      found_.forEach(elem => {elem.style.display = "none"});
    }
  }

  function startObserving(o) {
    let node_ = document.querySelector("ytd-section-list-renderer");
    if (!node_) {
      console.log("--- can not find root node to observe ---");
  		setTimeout(startObserving, 500, o);
    } else {
      console.log("--- observing ---");
    	o.observe(node_, {attributes: false, childList: true, subtree: true});
    }
  }

  startObserving(new MutationObserver((mutationsList, observer) => {
    console.log("--- mutaion ---");
    //let isOwnChange = mutationsList.some(record => { return record.target.classList.contains(RSTAT); });
    //console.log(`ownChange: ${isOwnChange}, counter: ${counter.val} / ${counter.max}`);
    //if (!isOwnChange && counter.val == counter.max && counter.max > 0) {
    //console.log("--- re-init ---");
    observer.disconnect();
    setTimeout((o_) => {
      doWork();
      startObserving(o_);
    }, 500, observer);
    //}
  }));

}();
