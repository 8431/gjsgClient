"use strict";
cc._RFpush(module, '3bdacimPmdBwLV6EnVF3ztv', 'jnName');
// js\pk\jnName.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jName: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setJname: function setJname(data) {
        this.jName.string = data;
    },
    animationTest: function animationTest() {}

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();