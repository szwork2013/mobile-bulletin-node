var datatables = function () {
    return {
        employees: function () {
            $('.employees-datatable').dataTable({
                "sAjaxSource": "employees-table.json",
                "sAjaxDataProp": "data",
                "sPaginationType": "bootstrap"
            });

            $('.chosen').chosen({
                width: "80px"
            });
        },
        groups: function () {
            $('.groups-datatable').dataTable({
                "sAjaxSource": "groups-table.json",
                "sAjaxDataProp": "data",
                "sPaginationType": "bootstrap"
            });

            $('.chosen').chosen({
                width: "80px"
            });
        },
        messages: function () {
            $('.messages-datatable').dataTable({
                "sAjaxSource": "messages-table.json",
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
    datatables.employees();
    datatables.groups();
    datatables.messages();
});