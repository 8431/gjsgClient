'use strict';

var self;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        this.onloadBaoShi();
    },
    onloadBaoShi: function onloadBaoShi() {

        ajaxData(HxsgUrl.xqbsList, { 'zbid': zhaungBeiDetailsZbid.id }, function (data) {
            console.log(data.data);
            if (data.code == "000") {
                (function () {
                    var dataArry = data.data;
                    self.node.removeAllChildren();
                    self.node.height = dataArry.length / 6 * 60 + 240;

                    var _loop = function _loop(i) {
                        cc.loader.loadRes('prefabs/kong', cc.Prefab, function (err, prefab) {
                            if (!err) {
                                var kong = cc.instantiate(prefab);
                                // 使用事件名来注册
                                kong.on('touchstart', function (event) {
                                    if (cc.find('Canvas/zbBaoshi2') != null) {
                                        cc.find('Canvas/zbBaoshi2').destroy();
                                    }
                                    cc.loader.loadRes('prefabs/zbBaoshi2', cc.Prefab, function (err, prefab) {
                                        if (!err) {
                                            var zbBaoshi = cc.instantiate(prefab);
                                            cc.find('Canvas').addChild(zbBaoshi, 90);
                                            zbBaoshi.setPositionX(30);
                                            zbBaoshi.setPositionY(-10);
                                            //加載zbBaoshi腳本,初始化界面
                                            var zbBaoshiJs = zbBaoshi.getComponent('zbBaoshiDetail');
                                            zbBaoshiJs.init(dataArry[i]);
                                        }
                                    });
                                }, this);
                                self.node.addChild(kong);
                            }
                        });
                    };

                    for (var i = 0; i < dataArry.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                showAlert("服务器出问题了");
            }
        });
    },
    click: function click() {
        if (cc.find('Canvas/bs') != null) {
            cc.find('Canvas/bs').destroy();
        }
    }

});