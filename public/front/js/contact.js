var appContact = function () {

    var checkemail = /^((([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&"\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    var breaker = "<br>",
        alertclass = "alert-danger";

    function bindEvents() {
        $(".sendmail").on("click", function (e) {
            e.preventDefault();
            sendRequest();
        });
    }

    function message(output, alertclass) {

        $(".response").slideUp(200, "easeInOutExpo");

        var messageBox = "<div class=\"alert " + alertclass + " alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>" + output + "</div>";

        $("html, body").stop().animate({
            //scrollTop: $("#response").offset().top - 80
        }, 200, function () {
            $(".response").html(messageBox).slideDown(200, "easeInOutExpo");
        });

    }

    function sendRequest() {

        var name = $("input[name=name]").val(),
            email = $("input[name=email]").val(),
            mailMessage = $("textarea[name=message]").val(),
            check = $("input[name=check]").val(),
            output = "",
            error = false,
            btn = $("button.sendmail");

        btn.button("loading").parent().addClass("active");

        if (name === "" || name === " " || name === "Name") {
            error = true;
            output += "Please enter your name" + breaker;
        } else if (name.length < 3) {
            error = true;
            output += "Name is too short" + breaker;
        }

        if (email === "" || email === " ") {
            error = true;
            output += "Please enter your email address" + breaker;
        } else if (!checkemail.test(email)) {
            error = true;
            output += "Invalid email" + breaker;
        }

        if (mailMessage === "" || mailMessage === " ") {
            error = true;
            output += "Please enter a message" + breaker;
        } else if (mailMessage.length < 10) {
            error = true;
            output += "Message is too short" + breaker;
        }

        if (check.length > 0) {
            error = true;
            output += "Failed to send message" + breaker;
        }

        if (error === false) {
            $.ajax({
                url: $("#contactform").attr("action"),
                type: "POST",
                data: $("#contactform").serialize(),
                timeout: 8000
            }).done(function (response) {
                output = response;
                alertclass = "alert-success";
                $("#contactform input").val("");
                $("#contactform textarea").val("");
                message(output, alertclass);
            }).fail(function (response) {
                alertclass = "alert-warning";

                if (response.responseText !== "" && response.responseText !== " ") {
                    output = response.responseText;
                } else {
                    output = "Failed to send message" + breaker;
                }

                if (response.statusText === "timeout") {
                    output = "Request timed-out. Please try again." + breaker;
                }

                message(output, alertclass);

                return false;
            })
                .always(function () {
                    btn.button("reset").parent().removeClass("active");
                });
            return false;
        } else {
            if (output === "") {
                output = "Failed to send message" + breaker;
            }

            message(output, alertclass);
            btn.button("reset").parent().removeClass("active");
            return false;
        }
    }

    return {
        init: function () {
            bindEvents();
        }
    };
}();

$(function () {
    "use strict";
    appContact.init();
});