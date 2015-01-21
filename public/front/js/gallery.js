var appGallery = function () {

    var activeProject,
        link,
        portfolioContainer = $(".portfolio-ajax"),
        contentContainer = $(".portfolio-content"),
        errorMessage = "Failed to load details.";

    function bindEvents() {

        $(window).on("load", layoutItems);

        /** resize portfolio items on resize **/
        $(window).on("resize", layoutItems);

        $(document).on("click", ".isotope > .portfolio-item a", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(this).parent().is(activeProject)) {
                $("html, body").stop().animate({
                    scrollTop: portfolioContainer.offset().top - 200
                }, 300, "easeInOutExpo");
                return;
            }

            activeProject = $(this).parent();

            checkControls();
        });

        $(document).on("click", "a.next-portfolio-item", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(this).hasClass("disabled")) {
                return;
            }

            activeProject = activeProject.next();

            checkControls();
        });

        $(document).on("click", "a.prev-portfolio-item", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(this).hasClass("disabled")) {
                return;
            }

            activeProject = activeProject.prev();

            checkControls();
        });

        $(document).on("click", ".close-view", function (e) {
            e.preventDefault();
            e.stopPropagation();

            closePortfolio();
        });
    }

    function checkControls() {

        if (activeProject.is(':first-child')) {
            $("a.prev-portfolio-item").addClass("disabled");
        } else {
            $("a.prev-portfolio-item").removeClass("disabled");
        }

        if (activeProject.is(':last-child')) {
            $("a.next-portfolio-item").addClass("disabled");
        } else {
            $("a.next-portfolio-item").removeClass("disabled");
        }

        initPortfolio();
    }

    function initPortfolio() {

        link = activeProject.find("a").attr('href');

        if (!portfolioContainer.is(":visible")) {
            portfolioContainer.slideDown();
        }

        portfolioContainer.removeClass("loaded").addClass("loading");

        $("html, body").stop().animate({
            scrollTop: portfolioContainer.offset().top - 200
        }, 1000, "easeInOutExpo", function () {
            contentContainer.load(link, function (response, status, xhr) {
                if (status === "error") {
                    contentContainer.html("<div class=\"show text-center\">" + errorMessage + " " + xhr.status + " " + xhr.statusText + "</div>").css("height", "40px");
                }

                initPlugins();
            });
        });

        return false;
    }

    function initPlugins() {

        if (portfolioContainer.find(".feature").hasClass("has-slider")) {

            $(".feature-slider").bxSlider({
                auto: true,
                speed: 1000,
                mode: "fade",
                controls: false
            });
        }

        if (portfolioContainer.find(".feature").hasClass("has-video")) {
            $(".fluid-video").fitVids();
        }

        portfolioContainer.imagesLoaded()
            .always(function () {
                done();
            })
            .done(function () {})
            .fail(function () {
                contentContainer.prepend("<em class=\"show text-center\">Some images where not loaded</em>");
            });
    }

    function done() {
        portfolioContainer.removeClass("loading").addClass("loaded");
    }

    function closePortfolio() {

        portfolioContainer.removeClass("loaded").slideUp();

        if (portfolioContainer.find(".portfolio").hasClass("has-slider")) {
            $(".feature-slider").destroySlider();
        }

        contentContainer.empty();
        activeProject = "";

    }

    function layoutItems() {
        initLayout();
        $(".isotope").isotope("layout");
    }

    /** Layout portfolio items **/
    function initLayout() {

        var portfolioWidth = getWidth();

        $(".isotope").find(".portfolio-item").each(function () {
            $(this).css({
                width: portfolioWidth + "px"
            });
        });

    }

    function getWidth() {
        var wi = $(window).width(),
            col = Math.floor(wi / 1);

        if (wi > 767) {
            col = Math.floor(wi / 3);
        } else if (wi > 480) {
            col = Math.floor(wi / 2);
        } else if (wi > 320) {
            col = Math.floor(wi / 1);
        }

        return col;
    }

    function initIsotope() {
        var $container = $(".isotope").isotope({
            resizable: false,
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows"
        });

        $(".filter a").on("click", function () {

            var selector = $(this).attr("data-filter");
            $(".filter").find("a").removeClass("active");
            $(this).addClass("active");
            $container.isotope({
                filter: selector
            });

            return false;
        });
    }

    return {
        init: function () {
            bindEvents();
            initIsotope();
            layoutItems();
        }
    };
}();

$(function () {
    "use strict";
    appGallery.init();
});