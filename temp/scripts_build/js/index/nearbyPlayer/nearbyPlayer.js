"use strict";
cc._RFpush(module, '7a8ad7oAOxEh7z3pVjRjWs/', 'nearbyPlayer');
// js\index\nearbyPlayer\nearbyPlayer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setLabel: function setLabel(msg) {
        this.label.string = msg;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();