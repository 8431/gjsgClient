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