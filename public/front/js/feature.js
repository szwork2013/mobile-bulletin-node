var demoProject = function () {
    return {
        init: function () {
            $(window).on("load", function () {
                if ($.fn.bxSlider) {
                    $(".bxslider").bxSlider({
                        auto: false,
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
    demoProject.init();
});