"use strict";
cc._RFpush(module, '783c45NyPZDHoUsFXUxF4N6', 'TopManager');
// js\common\TopManager.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        //检验是否存在pk
        setTimeout(function () {
            var scenName = cc.director.getScene().name;
            if (scenName != "pkWait") {
                ajaxUtils(HxsgUrl.queryPk, null, function (data) {
                    if (data == "2001") {
                        showAlert("你正处在战斗中，请立即战斗", function () {
                            cc.director.loadScene(HxsgScenes.pkWait);
                        }, function () {
                            cc.director.loadScene(HxsgScenes.pkWait);
                        });
                    }
                });
            }
        }, 10);
        this.setLabel(ajaxReturnData.topCity);
        this.addImageAction();
        var anim = this.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        //anim.play();

    },

    addImageAction: function addImageAction() {
        var self = this;
        var seq = cc.sequence(cc.moveTo(1, cc.p(-360, 0)).easing(cc.easeCubicActionOut(1)));
        this.image.node.runAction(seq);
    },
    play: function play() {
        this.addImageAction();
        var anim = this.getComponent(cc.Animation);
        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
    },
    setLabel: function setLabel(msg) {
        this.label.string = msg;
    }
});

cc._RFpop();