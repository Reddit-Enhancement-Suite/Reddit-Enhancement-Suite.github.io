$('.browsers').on('click', 'a[data-browser]', function(e) {
    var browser = $(e.target).data('browser');
    ga('send', 'event', 'clickInstall', browser);
});
