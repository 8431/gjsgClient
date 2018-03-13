"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        text: cc.Label
    },

    //加载公告列表场景
    back: function back() {
        returnLast();
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.title.string = GG.title;
        this.text.string = GG.text;
    }

});