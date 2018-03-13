"use strict";
cc._RFpush(module, '5fe1fVWPB9EB6Aywn2zFU9U', 'systemMsg');
// js\common\systemMsg.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    msg: null,
    // use this for initialization
    onLoad: function onLoad() {},
    showAlert: function (_showAlert) {
        function showAlert(_x) {
            return _showAlert.apply(this, arguments);
        }

        showAlert.toString = function () {
            return _showAlert.toString();
        };

        return showAlert;
    }(function (event) {
        var e = event.target;
        showAlert(this['msg']);
        e.destroy();
    }),
    init: function init(msg) {
        this['msg'] = msg;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();