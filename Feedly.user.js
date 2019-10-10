// ==UserScript==
// @name     Feedly
// @version  1
// @grant    none
// @include  https://feedly.com/*
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('#feedlyPageFX {\
        max-width: none !important;\
      }\
      .u100Entry {\
        margin: 0px !important;\
        max-width: 100% !important;\
      }\
      .entryBody {\
        max-width: 100% !important;\
      }\
      .entryBody img {\
        max-width: 100% !important;\
        width: unset !important;\
        margin-left: auto !important;\
        margin-right: auto !important;\
      }\
      .entryBody .content {\
        font-family: Noto Serif !important;\
        font-size: 24px !important;\
        line-height: 140% !important;\
      }\
      .entry.u0 {\
        height: 60px !important;\
      }\
      .entry.u0 .content {\
        flex-direction: column !important;\
        align-items: start !important;\
      }\
      .entry.u0 .content > * {\
        font-family: Noto Sans !important;\
        font-size: 16px !important;\
      }\
      .entry.u0 .content > a {\
        width: 100% !important;\
        display: flex !important;\
        justify-content: space-between;\
      }\
      .entry.u0 .content > a:after {\
        content: "⇨";\
        opacity: 1;\
      }\
        .entry.u0 .content > a:hover:after {\
        opacity: 1;\
      }\
      .entry.u0 .ago {\
        min-width: 2rem !important;\
        padding-left: 0.5rem !important;\
        padding-right: 0 !important;\
        text-align: right !important;\
      }\
      .entry.u0 .condensed-tools {\
        display: block !important;\
      }\
      .entry.u0 .condensed-tools .tag-button {\
        display: none !important;\
      }\
      .u100Entry .entryHeader .shareBarHolder {\
        display: none !important;\
      }\
      .LeftnavListRow {\
        padding-right: 15px !important;\
      }\
     ');
}();
