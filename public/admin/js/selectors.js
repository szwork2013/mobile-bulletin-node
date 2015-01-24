var managerSelect = function () {
    return {
        init: function () {
            
            $.ajax({
                url: "employees-raw.json",
                cache: false,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].firstname + " " + results.data[i].lastname + "</option>";
                    }
                    $("select[name='manager']").html(options);
                }
            });
        }
    };
}();

$(function () {
    "use strict";
    managerSelect.init();
});