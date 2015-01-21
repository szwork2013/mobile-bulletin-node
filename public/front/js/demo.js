var demo = function () {
    return {
        init: function () {
            $(window).on("load", function () {
                if ($.fn.bxSlider) {
                    $(".shortcodes .bxslider").bxSlider({
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
    demo.init();
});