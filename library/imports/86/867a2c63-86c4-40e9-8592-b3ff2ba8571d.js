"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setMsg: function setMsg(data) {
        this.msg.string = data;
    },
    getMsg: function getMsg() {
        return this.msg.string;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});