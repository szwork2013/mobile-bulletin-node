var treeViewDemo = function () {

    var to = false;

    function events() {
        $('#demo_q').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                var v = $('#demo_q').val();
                $('#jstree_demo').jstree(true).search(v);
            }, 250);
        });

        $(document).on("click", "#node-create", function () {
            demo_create();
        });

        $(document).on("click", "#node-rename", function () {
            demo_rename();
        });

        $(document).on("click", "#node-delete", function () {
            demo_delete();
        });
    }

    function demo_create() {
        var ref = $('#jstree_demo').jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        sel = ref.create_node(sel, {
            "type": "file"
        });
        if (sel) {
            ref.edit(sel);
        }
    }

    function demo_rename() {
        var ref = $('#jstree_demo').jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        ref.edit(sel);
    }

    function demo_delete() {
        var ref = $('#jstree_demo').jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        ref.delete_node(sel);
    }

    function plugins() {
        $('#jstree1').jstree();

        $('#jstree2').jstree({
            'plugins': ["wholerow", "checkbox"],
            'core': {
                'data': [
                    {
                        "text": "Same but with checkboxes",
                        "children": [
                            {
                                "text": "initially selected",
                                "state": {
                                    "selected": true
                                }
                            },
                            {
                                "text": "custom icon URL",
                                "icon": "./img/tree-icon.png"
                            },
                            {
                                "text": "initially open",
                                "state": {
                                    "opened": true
                                },
                                "children": ["Another node"]
                            },
                            {
                                "text": "custom icon class",
                                "icon": "glyphicon glyphicon-leaf"
                            }
                    ]
                },
                "And wholerow selection"
            ]
            }
        });

        $("#jstree_demo")
            .jstree({
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    'data': [{
                            "text": "Same but with checkboxes",
                            "children": [
                                {
                                    "text": "initially selected",
                                    "state": {
                                        "selected": true
                                    }
                                },
                                {
                                    "text": "custom icon URL",
                                    "icon": "./img/tree-icon.png"
                                },
                                {
                                    "text": "initially open",
                                    "state": {
                                        "opened": true
                                    },
                                    "children": ["Another node"]
                                },
                                {
                                    "text": "custom icon class",
                                    "icon": "glyphicon glyphicon-leaf"
                                }
                        ]
                    },
                    "And wholerow selection"
                ]
                },
                "plugins": ["contextmenu", "dnd", "search", "state", "types", "wholerow"]
            });
    }

    return {
        init: function () {
            events();
            plugins();
        }
    };
}();

$(function () {
    "use strict";
    treeViewDemo.init();
});