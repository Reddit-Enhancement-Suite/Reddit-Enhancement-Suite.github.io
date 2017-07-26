var isChrome = !!window.chrome && !!window.chrome.webstore;
var isEdge = !!window.StyleMedia;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') != -1;
var isSafari = navigator.userAgent.indexOf("Safari") > -1;

if (isChrome) {
  document.getElementById("chromebrowser").classList.add('activeBrowser');
} else if (isEdge) {
  document.getElementById("edgebrowser").classList.add('activeBrowser');
} else if (isFirefox) {
  document.getElementById("firefoxbrowser").classList.add('activeBrowser');
} else if (isOpera) {
  document.getElementById("operabrowser").classList.add('activeBrowser');
} else if (isSafari) {
  document.getElementById("safaribrowser").classList.add('activeBrowser');
} else {
  document.getElementById("browsers").classList.add('noactivebrowser');
}
