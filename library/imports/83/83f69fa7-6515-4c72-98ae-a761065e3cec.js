'use strict';

var item;

cc.Class({
    extends: cc.Component,
    properties: {
        newText: cc.Label,
        title: cc.Label
    },

    //初始化设置
    init: function init(gg) {
        this.item = gg;
        this.title.string = this.item.custom1;
    },

    //加载公告详情场景
    loadGGDetails: function loadGGDetails() {
        GG.title = this.item.custom1;
        GG.text = this.item.msg;
        loadingScene('ggDetails', 'ggList');
    },

    // use this for initialization
    onLoad: function onLoad() {}
});