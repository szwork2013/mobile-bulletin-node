var demoDataTables = function () {
    return {
        init: function () {
            $('.datatable').dataTable({
                "sAjaxSource": "data/datatables-arrays.txt",
                "sAjaxDataProp": "data",
                "sPaginationType": "bootstrap"
            });

            $('.chosen').chosen({
                width: "80px"
            });
        }
    };
}();

var employeesDataTables = function () {
    return {
        init: function () {
            $('.employees-datatable').dataTable({
                "sAjaxSource": "employees.json",
                "sAjaxDataProp": "data",
                "sPaginationType": "bootstrap"
            });

            $('.chosen').chosen({
                width: "80px"
            });
        }
    };
}();

$(function () {
    "use strict";
    //demoDataTables.init();
    employeesDataTables.init();
});