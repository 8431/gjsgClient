"use strict";
cc._RFpush(module, 'ae98bgsZlZArYZOm2rtGagC', 'jiesuan');
// js\gamble\jiesuan.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setMsg: function setMsg(data) {
        this.msg.string = data;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();