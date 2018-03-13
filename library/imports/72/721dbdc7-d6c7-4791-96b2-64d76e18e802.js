'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    yiguanEvent: function yiguanEvent() {
        cc.log('sheshi panel 医馆');
        loadingScene(HxsgScenes.yiguan, HxsgScenes.index);
    },

    qianzhuangEvent: function qianzhuangEvent() {
        cc.log('sheshi panel 钱庄');
        loadScene(HxsgScenes.bank, HxsgScenes.index);
    },

    guanyiEvent: function guanyiEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 馆驿');
    },

    shichangEvent: function shichangEvent() {
        cc.log('sheshi panel 市场');
        cc.director.loadScene('shiChangIndex');
    },

    guangchangEvent: function guangchangEvent() {
        cc.log('sheshi panel 广场');
        cc.director.loadScene('guangChang');
    },

    guanfuEvent: function guanfuEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 官府');
    },

    zhanchangEvent: function zhanchangEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 战场');
    },

    guanjiaEvent: function guanjiaEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 管家');
    },
    wabaoEvent: function wabaoEvent() {
        loadingScene(HxsgScenes.wabao, HxsgScenes.index);
    }

});