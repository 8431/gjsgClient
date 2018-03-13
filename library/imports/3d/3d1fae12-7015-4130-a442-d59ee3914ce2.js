"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.msg.string = "";
        ajaxData(HxsgUrl.userWuPin, { "wupinId": userWuPin.wupinId, "num": 1 }, function (msg) {
            self.msg.string = msg.msg;
        });
    },
    /**
        * 点击事件-->返回
        */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    }
});