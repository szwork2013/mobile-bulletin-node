var demoVideo = function () {
    return {
        init: function () {
            if ($.fn.mb_YTPlayer) {
                $(".youtube-player").mb_YTPlayer();

                $(".youtube-player").on("YTPUnstarted", function () {
                    $("body").removeClass().addClass("video-loading");
                    $("#player-button").html("<span>Waiting for video</span>");
                });

                $(".youtube-player").on("YTPStart", function () {
                    $("body").removeClass().addClass("video-playing");
                    $("#player-button").html("<i class=\"fa fa-pause mr10\"></i><span>Pause video</span>");
                });

                $(".youtube-player").on("YTPPause", function () {
                    $("body").removeClass().addClass("video-paused");
                    $("#player-button").html("<i class=\"fa fa-play mr10\"></i><span>Play video</span>");
                });

                $(".youtube-player").on("YTPBuffering", function () {
                    $("body").removeClass().addClass("video-buffering");
                    $("#player-button").html("<i class=\"fa fa-circle-o-notch fa-spin mr10\"></i><span>Video Buffering</span>");
                });

                $(document).on("click", ".video-playing #player-button", function () {
                    $(".youtube-player").pauseYTP();
                });

                $(document).on("click", ".video-paused #player-button", function () {
                    $(".youtube-player").playYTP();
                });
            }
        }
    };
}();

$(function () {
    "use strict";
    demoVideo.init();
});