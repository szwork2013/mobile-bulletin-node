var demoHome = function () {

    function bindEvents() {
        $(window).on("load", renderBxSLider);
    }

    function renderBxSLider() {
        if ($.fn.bxSlider) {
            $(".hero-slider .bxslider").bxSlider({
                mode: "fade",
                auto: true,
                speed: 1000,
                pause: 5000,
                pager: true,
                controls: false,
                easing: "ease-in-out"
            });
        }
    }

    function renderReviews(data) {
        var content = "";
        for (var i in data["items"]) {

            var quote = data["items"][i].quote;
            var img = data["items"][i].img;
            var alt = data["items"][i].alt;
            var name = data["items"][i].name;
            var title = data["items"][i].title;

            content += "<div><blockquote>" + quote + "</blockquote>" + "<div class=\"reviews-avatar mr15\"><img src=\"" + img + "\" alt=\"" + alt + "\" class=\"img-circle\"></div>" + "<div class=\"reviews-meta\"><h5 class=\"reviews-name\"><a href=\"javascript:;\">" + name + "</a></h5>" + "<small>" + title + "</small></div></div>";
        }
        $(".reviews-carousel").html(content);
    }

    function initCarousel() {
        if ($.fn.owlCarousel) {
            $(".reviews-carousel").owlCarousel({
                autoPlay: 5000,
                pagination: false,
                items: 2,
                itemsDesktop: [1199, 2],
                itemsDesktopSmall: [768, 1],
                itemsTablet: false,
                itemsMobile: false,
                jsonPath: "json/reviews.json",
                jsonSuccess: renderReviews
            });
        }
    }

    function initMagnificPopUp() {
        if ($.fn.magnificPopup) {
            $('.popup-video').magnificPopup({
                type: 'iframe'
            });
        }
    }

    return {
        init: function () {
            bindEvents();
            initCarousel();
            initMagnificPopUp();
        }
    };
}();

$(function () {
    "use strict";
    demoHome.init();
});