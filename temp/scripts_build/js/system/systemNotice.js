"use strict";
cc._RFpush(module, '36b11q1YyhBmYhxB/gJbu/h', 'systemNotice');
// js\system\systemNotice.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText,
        buttonMsg: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},

    setMsg: function setMsg(msgStr) {
        this.msg.string = msgStr;
    }

});

cc._RFpop();