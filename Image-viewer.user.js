// ==UserScript==
// @name        Image viewer
// @namespace   image_viewer
// @include     https://*
// @include     http://*
// @version     1
// @grant       none
// ==/UserScript==
!function() {

  function createButton(text, clickHandler) {
    var b = document.createElement("div");
    b.style.width = "80px";
    b.style.height = "40px";
    b.style.margin = "4px 8px";
    b.style.textAlign = "center";
    b.style.display = "flex";
    b.style.flexDirection = "column";
    b.style.justifyContent = "center";
    b.style.backgroundColor = "antiquewhite";
    b.style.cursor = "pointer";
    b.style["-moz-user-select"] = "none";
    b.innerHTML = text;
    b.addEventListener("click", clickHandler);
    return b;
  }

  function createPanel() {
    var images = [];
    var cur_i = 0;
    var scrollFn = function(img) {
      if (img.height > window.innerHeight) { img.height = window.innerHeight; }
      img.scrollIntoView({block:"center"});
    };
    var updateFn = function(e) {
      var new_i = Array.from(document.querySelectorAll("img")).filter(img => img.width > 500);
      images.splice(0, images.length, ...new_i);
      cur_i = 0;
      scrollFn(images[cur_i]);
      if (e) { e.preventDefault(); e.stopPropagation(); }
    };
    var firstFn = function(e) {
      cur_i = 0;
      scrollFn(images[cur_i]);
      if (e) { e.preventDefault(); e.stopPropagation(); }
    };
    var prevFn = function(e) {
      cur_i = (cur_i - 1 + images.length) % images.length;
      scrollFn(images[cur_i]);
      if (e) { e.preventDefault(); e.stopPropagation(); }
    };
    var nextFn = function(e) {
      cur_i = (cur_i + 1) % images.length;
      scrollFn(images[cur_i]);
      if (e) { e.preventDefault(); e.stopPropagation(); }
    };
    var lastFn = function(e) {
      cur_i = images.length - 1;
      scrollFn(images[cur_i]);
      if (e) { e.preventDefault(); e.stopPropagation(); }
    };
    var panel = document.createElement("div");
    panel.style.position = "fixed";
    panel.style.top = "0";
    panel.style.right = "0";
    panel.style.backgroundColor = "darkgrey";
    panel.style.opacity = "0.5";
    panel.style.zIndex = "10000";
    panel.style.display = "none";
    panel.appendChild(createButton("Update", updateFn));
    panel.appendChild(createButton("First", firstFn));
    panel.appendChild(createButton("Prev", prevFn));
    panel.appendChild(createButton("Next", nextFn));
    panel.appendChild(createButton("Last", lastFn));
    panel.nextFn = nextFn;
    document.body.appendChild(panel);
    updateFn();
    return panel;
  }

  var panel = {
    obj: undefined,
    isVisible: false
  };
  window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.altKey && e.which == 73/*i*/) {
      if (!panel.obj) { panel.obj = createPanel(); }
      panel.isVisible = (panel.obj.style.display != "none");
      panel.obj.style.display = panel.obj.isVisible ? "none" : "block";
      panel.isVisible = !panel.isVisible;
    }
    if (panel.isVisible && e.which == 32/*space*/) {
      panel.obj.nextFn(e);
    }
  });

}();
