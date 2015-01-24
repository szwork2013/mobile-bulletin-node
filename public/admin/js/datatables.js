var employeesDataTables = function () {
    return {
        init: function () {
            $('.employees-datatable').dataTable({
                "sAjaxSource": "employees-table.json",
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
    employeesDataTables.init();
});