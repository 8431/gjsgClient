"use strict";
cc._RFpush(module, '81e1aZRNM9Aj74aJK4vD3Na', 'HistoryItem');
// js\gc\HistoryItem.js

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

cc._RFpop();