'use strict';

var self;

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        nameLabel: cc.Label,
        LvLabel: cc.Label,
        effectLabel: cc.RichText,
        presentLabel: cc.RichText,
        holeLabel: cc.Sprite

    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;

        var data = { 'id': zhaungBeiDetailsZbid.id };

        ajaxData(HxsgUrl.zbDetailUrl, data, self.initZhuangbei);
        loadCommomScence();
    },

    initZhuangbei: function initZhuangbei(res) {
        var _this = this;

        if (cc.find('Canvas/zbBaoshi2') != null) {
            cc.find('Canvas/zbBaoshi2').destroy();
        }
        if (cc.find('Canvas/bs') != null) {
            cc.find('Canvas/bs').destroy();
        }
        var msg = res.msg;
        cc.log(self.titleLabel);
        self.titleLabel.string = msg.zbName;
        self.nameLabel.string = msg.zbName;
        // self.LvLabel.string = msg.
        self.effectLabel.string = msg.zbXiaoGuo;
        self.presentLabel.string = msg.zbMiaoShu + "<color=#ff0000>" + msg.zbTiaoJian + "</color>";
        self.LvLabel.string = msg.level;

        var icon = cc.find('Canvas/sprite/icon');
        var sprite2 = icon.getComponent('cc.Sprite');
        //网络加载图片
        cc.loader.load(imgUrl + msg.imgUrl, function (error, texture) {
            sprite2.spriteFrame = new cc.SpriteFrame(texture);
        });
        //孔傮
        var bsArr = msg.baoshiId;

        var _loop = function _loop(i) {
            if (null == bsArr[i]) {
                cc.loader.loadRes('prefabs/kong2', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        cc.log(bsArr[i]);
                        var kong = cc.instantiate(prefab);
                        self.holeLabel.node.addChild(kong);

                        kong.on('click', function (event) {
                            if (cc.find('Canvas/bs') != null) {
                                cc.find('Canvas/bs').destroy();
                            }
                            cc.log("空槽");
                            cc.loader.loadRes('prefabs/bs', cc.Prefab, function (err, prefab) {
                                if (!err) {
                                    var bs = cc.instantiate(prefab);
                                    cc.find('Canvas').addChild(bs, 70);
                                }
                            });
                        }.bind(this));
                    }
                });
            } else {
                cc.loader.loadRes('prefabs/kong', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var kong = cc.instantiate(prefab);
                        kong.on('click', function (event) {
                            var node = event.target;
                            var button = node.getComponent(cc.Button);
                            if (cc.find('Canvas/zbBaoshi') != null) {
                                cc.find('Canvas/zbBaoshi').destroy();
                            }
                            cc.loader.loadRes('prefabs/zbBaoshi', cc.Prefab, function (err, prefab) {
                                if (!err) {
                                    var zbBaoshi = cc.instantiate(prefab);
                                    cc.find('Canvas').addChild(zbBaoshi, 90);
                                    zbBaoshi.setPositionX(30);
                                    zbBaoshi.setPositionY(-10);
                                    //加載zbBaoshi腳本,初始化界面
                                    ajaxData(HxsgUrl.baoshiItemUrl, { 'id': bsArr[i] }, function (data) {
                                        cc.log(data);
                                        var zbBaoshiJs = zbBaoshi.getComponent('zbBaoshiDetail');
                                        zbBaoshiJs.init(data.msg);
                                    });
                                }
                            });
                        }.bind(this));
                        self.holeLabel.node.addChild(kong);
                    }
                }.bind(_this));
            }
        };

        for (var i = 0; i < bsArr.length; i++) {
            _loop(i);
        }
        cc.loader.loadRes(msg.imgUrl, cc.SpriteFrame, function (err, tex) {
            if (!err) {
                self.sprite.spriteFrame = tex;
            }
        });
    },

    userBtnEvent: function userBtnEvent() {

        ajaxData(HxsgUrl.zbWuQi, { 'id': zhaungBeiDetailsZbid.id, 'type': 'role' }, function (data) {
            cc.log(data);
            if (data.code == "000") {
                showAlert(data.data);
            } else {
                showAlert("系统错误");
            }
        });
    },

    dropBtnEvent: function dropBtnEvent() {

        ajaxData(HxsgUrl.xiezai, { 'id': zhaungBeiDetailsZbid.id, 'type': 'role' }, function (data) {
            cc.log(data);
            if (data.code == "000") {
                showAlert(data.data);
            } else {
                showAlert("系统错误");
            }
        });
    },

    backEvent: function backEvent() {
        loadScene(HxsgScenes.wupin, HxsgScenes.zhuangbei);
    }

});