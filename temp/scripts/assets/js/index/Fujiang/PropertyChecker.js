"use strict";
cc._RFpush(module, '822f6K5eipOnZEWVMqOK/82', 'PropertyChecker');
// js\index\Fujiang\PropertyChecker.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        totalPointsLabel: cc.Label,
        fangyuValueLabel: cc.Label,
        qixueLabel: cc.Label,
        tizhiLabel: cc.Label,
        jingliLabel: cc.Label,
        zhiliLabel: cc.Label,
        gongjiLabel: cc.Label,
        liliangLabel: cc.Label,
        suduLabel: cc.Label,
        minjieLabel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        this.init();
    },

    /**
     * 服务器请求回掉函数
     * @param msg
     */
    ajaxCallback: function ajaxCallback(msg) {
        self.init();
    },

    /**
     * 根据数据初始化场景页面
     * @param msg
     */
    init: function init() {
        var msg = fujiang.fjmsg;
        //Label赋值
        self.totalPointsLabel.string = msg.keyongds;
        self.fangyuValueLabel.string = 0;
        self.qixueLabel.string = msg.qiXue2;
        self.tizhiLabel.string = msg.qixueds;
        self.jingliLabel.string = msg.jingLi2;
        self.zhiliLabel.string = msg.jinglids;
        self.gongjiLabel.string = msg.gongJi;
        self.liliangLabel.string = msg.gongJids;
        self.suduLabel.string = msg.suDu;
        self.minjieLabel.string = msg.sududs;
    },

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.propertyCheck);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();