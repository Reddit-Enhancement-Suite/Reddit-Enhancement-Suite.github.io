var isChrome = !!window.chrome && !!window.chrome.webstore;
var isEdge = !!window.StyleMedia;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

switch (true) {
  case isChrome == true:
    $('img[src="/static/img/chrome.png"]').toggleClass('activeBrowser')
    break;
  case isEdge == true:
    $('img[src="/static/img/edge.png"]').toggleClass('activeBrowser')
    break;
  case isFirefox == true:
    $('img[src="/static/img/firefox.png"]').toggleClass('activeBrowser')
    break;
  case isOpera == true:
    $('img[src="/static/img/opera.png"]').toggleClass('activeBrowser')
    break;
  case isSafari == true:
    $('img[src="/static/img/safari.png"]').toggleClass('activeBrowser')
    break;
  default:
    break;
}