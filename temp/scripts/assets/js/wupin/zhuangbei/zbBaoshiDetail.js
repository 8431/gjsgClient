"use strict";
cc._RFpush(module, 'd4d08tBpoZCx7iIm0/m30b0', 'zbBaoshiDetail');
// js\wupin\zhuangbei\zbBaoshiDetail.js

'use strict';

var self;
var bsid;
var zbid;
cc.Class({
    extends: cc.Component,

    properties: {
        bsname: cc.Label,
        level: cc.Label,
        xiaoguo: cc.Label,
        jieshao: cc.RichText,
        img: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    click: function click() {
        self.node.destroy();
    },
    init: function init(data) {
        self.bsname.string = data.zwName;
        self.level.string = data.zwLevel;
        self.xiaoguo.string = data.zwXiaoGuo;
        self.jieshao.string = data.zwMiaoShu;
        bsid = data.id;
    },
    xqClick: function xqClick() {

        var param = { 'bsId': bsid, 'zbId': zhaungBeiDetailsZbid.id };
        ajaxData(HxsgUrl.mosaicGemtoZhuangBei, param, function (data) {
            cc.log(data);
            if (data.code = "000") {
                showAlert(data.data, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                }, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                });
            } else {
                showAlert("服务器崩溃了:" + data.message, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                }, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                });
            }
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();