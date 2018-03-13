"use strict";
cc._RFpush(module, 'fc4cbiFXyRGTrbuoyN9GTQA', 'myZhuangBei');
// js\wupin\zhuangbei\myZhuangBei.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        gj: cc.Label,
        su: cc.Label,
        qx: cc.RichText,
        jl: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
        this.init();
        this.initData();
    },
    init: function init() {
        ajaxData(HxsgUrl.myZhuangBei, null, function (data) {
            if ("000" == data.code) {
                (function () {
                    var arrJson = data.data;

                    var _loop = function _loop(i) {
                        var wuqiType = arrJson[i].wuqiType;

                        if (wuqiType.indexOf("武") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    cc.log("武器详情:" + arrJson[i].id);
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/wuqi').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("靴") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/xiezi').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("链") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/xianlian').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("腕") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/huwan').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("盔") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/tou').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("甲") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/gaijia').addChild(zbIcon);
                            });
                        }
                    };

                    for (var i = 0; i < arrJson.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                showAlert("系统错误!");
            }
        });
    },
    initData: function initData() {
        ajaxData(HxsgUrl.indexroleMsgUrl, null, function (data) {
            var roleMsg = data.roleMsg;
            self.gj.string = roleMsg.totalgong;
            self.qx.string = roleMsg.totalxue1 + "/" + roleMsg.totalxue2;
            self.jl.string = roleMsg.totaljing1 + "/" + roleMsg.totaljing2;
            self.su.string = roleMsg.totalsudu;
            cc.log(self.gj.string);
            cc.log(self.su.string);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();