"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setId: function setId(msg) {
        this.id = msg;
    },
    getId: function getId() {
        return this.id;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});