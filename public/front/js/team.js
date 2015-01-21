var appTeam = function () {

    function bindEvents() {
        $(window).on("resize", layoutMembers);
    }

    function layoutMembers() {

        var itemWidth = getWidth();

        $(".team > li").each(function () {
            $(this).css({
                width: itemWidth + "px"
            });
        });

    }

    function getWidth() {
        var wi = $(".team").width(),
            col = Math.floor(wi / 1);

        if (wi > 767) {
            col = Math.floor(wi / 5);
        } else if (wi > 480) {
            col = Math.floor(wi / 3);
        } else if (wi > 320) {
            col = Math.floor(wi / 1);
        }

        return col;
    }

    return {
        init: function () {
            bindEvents();
            layoutMembers();
        }
    };
}();

$(function () {
    "use strict";
    appTeam.init();
});