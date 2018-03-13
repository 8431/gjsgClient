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