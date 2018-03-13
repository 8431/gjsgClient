'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        var prefab = this.itemPrefab;
        var node = this.node;
        var ajaxUrl = '';
        cc.log(prefab.name);
        if ('zhuanqianitem' == prefab.name) {
            ajaxUrl = HxsgUrl.queryWinJinBang;
        } else {
            ajaxUrl = HxsgUrl.queryBettingRecord;
        }
        ajaxData(ajaxUrl, null, function (msg) {
            cc.log(msg.msg);
            var mheight = 0;
            for (var i = 0; i < msg.msg.length; ++i) {
                try {
                    var item = cc.instantiate(prefab);
                    node.addChild(item);
                    item.getComponent('commonItem').init(msg.msg[i], i);
                    mheight += item.height;
                } catch (e) {}
            }
            node.height = mheight;
        });
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    }

});