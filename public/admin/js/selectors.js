var selectors = function () {
    return {
        nationality: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=COUNTRY",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='nationality']").html(options);
                }
            });
        },
        ethnicity: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=ETHNICITY",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='ethnicity']").html(options);
                }
            });
        },
        gender: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=GENDER",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='gender']").html(options);
                }
            });
        },
        position: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=POSITION_DESCRIPTION",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='position']").html(options);
                }
            });
        },
        cost_centre: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=COST_CENTRE",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='cost_centre']").html(options);
                }
            });
        },
        cost_centre_description: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=COST_CENTRE_DESCRIPTION",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='cost_centre_description']").html(options);
                }
            });
        },
        employee_group_description: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=EMPLOYEE_GROUP_DESCRIPTION",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='employee_group_description']").html(options);
                }
            });
        },
        employee_sub_group_description: function(){
            $.ajax({
                url: "get_by_type_hierarchy?type=EMPLOYEE_SUB_GROUP_DESCRIPTION",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].description + "</option>";
                    }
                    $("select[name='employee_sub_group_description']").html(options);
                }
            });
        },
        manager: function () {
            $.ajax({
                url: "employees-raw.json",
                cache: true,
                success: function(results){
                    var options = "";
                    for(var i = 0; i < results.data.length; i++){
                        options += "<option value='" + results.data[i]._id + "'>" + results.data[i].firstname + " " + results.data[i].lastname + "</option>";
                    }
                    $("select[name='manager']").html(options);
                }
            });
        },
        
    };
}();

$(function () {
    "use strict";
    selectors.nationality();
    selectors.ethnicity();
    selectors.gender();
    selectors.position();
    selectors.cost_centre();
    selectors.cost_centre_description();
    selectors.employee_group_description();
    selectors.employee_sub_group_description();
    selectors.manager();
});