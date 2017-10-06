var isChrome = !!window.chrome && !!window.chrome.webstore;
var isEdge = !!window.StyleMedia;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') != -1;
var isSafari = navigator.userAgent.indexOf("Safari") > -1;

if (isChrome) {
  document.querySelector(".chromebrowser").classList.add('activeBrowser');
} else if (isEdge) {
  document.querySelector(".edgebrowser").classList.add('activeBrowser');
} else if (isFirefox) {
  document.querySelector(".firefoxbrowser").classList.add('activeBrowser');
} else if (isOpera) {
  document.querySelector(".operabrowser").classList.add('activeBrowser');
} else if (isSafari) {
  document.querySelector(".safaribrowser").classList.add('activeBrowser');
} else {
  document.querySelector(".browsers").classList.add('noActiveBrowser');
}
