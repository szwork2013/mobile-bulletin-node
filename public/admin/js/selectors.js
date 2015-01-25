var selectors = function () {
    return {
        language: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=LANGUAGE",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='language']").html(options);
                }
            });
        },
        group: function () {
            $.ajax({
                url: "groups-raw.json",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].name + "</option>";
                    }
                    $("select[name='group']").html(options);
                }
            });
        },
        
    };
}();

$(function () {
    "use strict";
    selectors.language();
    selectors.group();
});