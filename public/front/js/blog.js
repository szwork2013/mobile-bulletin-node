var demoBlog = function () {
    return {
        init: function () {
            $(window).on("load", function () {
                if ($.fn.bxSlider) {
                    $(".blog .bxslider").bxSlider({
                        auto: true,
                        speed: 1000,
                        preloadImages: "all"
                    });
                }
            });
        }
    };
}();

$(function () {
    "use strict";
    demoBlog.init();
});