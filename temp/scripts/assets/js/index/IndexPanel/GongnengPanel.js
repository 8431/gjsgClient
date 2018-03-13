"use strict";
cc._RFpush(module, 'ffd65j2VSdCjIF5yU4rUyqJ', 'GongnengPanel');
// js\index\IndexPanel\GongnengPanel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    zhuangtaiEvent: function zhuangtaiEvent() {
        cc.log('gongneng panel 状态');
        loadScene(HxsgScenes.role, HxsgScenes.index);
    },

    wupinEvent: function wupinEvent() {
        cc.log('gongneng panel 物品');
        var scene = cc.director.getScene().name;
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },

    fujiangEvent: function fujiangEvent() {
        cc.log('gongneng panel 副将');
        loadScene(HxsgScenes.fujiang, HxsgScenes.index);
    },

    zuduiEvent: function zuduiEvent() {
        cc.log('gongneng panel 组队');
    },

    paihangEvent: function paihangEvent() {
        cc.log('gongneng panel 排行');
    },

    haoyouEvent: function haoyouEvent() {
        cc.log('gongneng panel 好友');
        loadScene(HxsgScenes.friends, HxsgScenes.index);
    },

    youjianEvent: function youjianEvent() {
        cc.log('gongneng panel 邮件');
    },

    renwuEvent: function renwuEvent() {
        cc.log('gongneng panel 任务');
    },

    leitaiEvent: function leitaiEvent() {
        cc.log('gongneng panel 擂台');
    },

    jiaopaiEvent: function jiaopaiEvent() {
        cc.log('gongneng panel 教派');
    },

    xunlianEvent: function xunlianEvent() {
        loadingScene(HxsgScenes.xunLian, HxsgScenes.index);
        cc.log('gongneng panel 训练');
    },

    baokuEvent: function baokuEvent() {
        cc.log('gongneng panel 宝库');
    },

    gonggaoEvent: function gonggaoEvent() {
        cc.log('gongneng panel 公告');
        loadScene(HxsgScenes.ggList, HxsgScenes.index);
    },

    gonglueEvent: function gonglueEvent() {
        cc.log('gongneng panel 攻略');
    },

    dengchuEvent: function dengchuEvent() {
        cc.log('gongneng panel 登出');
    }
});

cc._RFpop();