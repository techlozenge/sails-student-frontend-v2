(function() {
    $(function() {
        $('#navbar').on('click', "#srchButton", function(e) {
            window.open("http://www.google.com/search?q=" + ($("#srchText").val()).split(' ').join('+'), "Search");
        });
    });
})();
