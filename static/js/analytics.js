$('.browsers').on('click', 'a[data-browser]', function(e) {
    var browser = $(e.target).data('browser');
    var action = 'install' + browser.charAt(0).toUpperCase() + browser.slice(1);
    ga('send', 'event', 'userscript', action);
});
