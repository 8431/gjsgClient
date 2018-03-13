'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaoname: cc.Label,
        level: cc.Label,
        ms: cc.RichText,
        price: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.init({ 'type': '武' });
    },
    selectType: function selectType(event, num) {
        var param = "";
        switch (num) {
            case "1":
                {
                    param = { 'type': '武' };
                    break;
                }
            case "2":
                {
                    param = { 'type': '盔' };
                    break;
                }
            case "3":
                {
                    param = { 'type': '甲' };
                    break;
                }
            case "4":
                {
                    param = { 'type': '腕' };
                    break;
                }
            case "5":
                {
                    param = { 'type': '链' };
                    break;
                }
            case "6":
                {
                    param = { 'type': '靴' };
                    break;
                }
        }
        self.init(param);
    },
    init: function init(dataJson) {
        self.node.removeAllChildren();

        ajaxUtils(HxsgUrl.queryZhuangBei, dataJson, function (data) {
            cc.loader.loadRes('prefabs/zbShopIcon', cc.Prefab, function (err, prefab) {
                if (!err) {
                    var _loop = function _loop(i) {
                        var zbShopIcon = cc.instantiate(prefab);
                        var yao = zbShopIcon.getChildByName("yao");
                        var xz = zbShopIcon.getChildByName("xz");
                        yao.on("click", function () {
                            //加载选中特效.关闭其他动画，加载当前动画
                            var child = self.node.children;
                            for (var _i = 0; _i < child.length; _i++) {
                                var xzChild = child[_i].getChildByName("xz");
                                xzChild.getComponent(cc.Animation).stop();
                                xzChild.opacity = 0;
                            }
                            xz.opacity = 255;
                            xz.getComponent(cc.Animation).play();
                            self.zbDetail(data[i]);
                        }, self);
                        //网络加载图片
                        cc.loader.load(imgUrl + data[i].imgUrl, function (error, texture) {
                            cc.log(imgUrl + data[i].imgUrl);
                            yao.getComponent('cc.Sprite').spriteFrame = new cc.SpriteFrame(texture);
                        });
                        self.node.addChild(zbShopIcon);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
                    }
                }
            });
        });
    },
    zbDetail: function zbDetail(data) {

        //武器点击时，将该变量保存提供给购买按钮
        wuqiShop.shop = data;
        cc.log(data);
        self.yaoname.string = data.wuQiName;
        self.level.string = data.level;
        self.ms.string = data.miaoShu + "<color=#AE0BEE>" + data.kangXing + "+" + data.xiaoGuo + "</color>";
        self.price.string = data.price + "银";
    },
    buy: function buy() {
        showAlert("您确定花费" + wuqiShop.shop.price + "银两，购买" + wuqiShop.shop.wuQiName + "吗？", function () {
            ajaxUtils(HxsgUrl.buyZhuangBei, { id: wuqiShop.shop.id }, function (data) {
                showAlert(data);
            });
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});