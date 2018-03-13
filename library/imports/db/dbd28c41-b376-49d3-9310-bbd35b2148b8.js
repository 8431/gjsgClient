"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        msgCount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        var prefab = this.itemPrefab;
        var node = this.node;
        var thisclass = this;
        var ajaxUrl = HxsgUrl.wabaoMsg;
        cc.log(prefab.name);
        ajaxData(ajaxUrl, null, function (msg) {
            var m = msg.msg;

            for (var i = m.length - 1; i >= 0; i--) {
                thisclass.addMsg(msg.msg[i]);
            }
        });
        SocketEvents.wabaoMsg = this.addMsg;
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.saizi, HxsgScenes.index);
    },

    addMsg: function addMsg(msg) {
        var node = cc.find("Canvas/scrollView/view/content/list");
        try {
            var item = cc.instantiate(self.itemPrefab);
            node.addChild(item);
            item.getComponent('wabaoMsgItem').init(msg, self.msgCount);
            node.height += item.height;
            selfthis.msgCount++;
        } catch (e) {}
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});