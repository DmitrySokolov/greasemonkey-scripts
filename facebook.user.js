// ==UserScript==
// @name     Facebook
// @version  1
// @grant    none
// @include  https://www.facebook.com/*
// ==/UserScript==
!function(){
  !function addStyle(cssStr) {
    var D = document;
    var elem = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var newStyle = D.createElement('style');
    newStyle.textContent = cssStr;
    elem.appendChild(newStyle);
  } ('.fbx #globalContainer {\
        width: unset !important;\
        max-width: 1700px !important;\
      }\
      .timelineLayout #contentArea {\
        width: unset !important;\
      }\
      #timeline_tab_content > .clearfix > :nth-child(2) {\
        width: 1365px !important;\
      }\
      div[id^="jumper_"] .userContent, div[id^="js_"][data-testid^="post_message"] {\
        font-size: 20px !important;\
        font-family: Noto Sans !important;\
      }\
      div[data-testid^="UFI2CommentsList/"] div[data-testid="UFI2Comment/body"]{\
        font-size: 17px !important;\
        font-family: Noto Sans !important;\
        line-height: 1.5em !important;\
      }\
      /* main page */\
      #contentCol {\
        width: unset !important;\
      }\
      #contentCol #rightCol {\
        position: releative !important;\
        float: right !important;\
        left: 330px !important;\
      }\
      #contentCol #contentArea {\
        position: unset !important;\
        float: none !important;\
        min-width: 1200px !important;\
      }\
     ');
}();
