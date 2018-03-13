'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.msg.string = '';
    },

    setMsg: function setMsg(msgStr) {
        this.msg.string = msgStr;
    }

});