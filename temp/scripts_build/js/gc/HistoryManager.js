"use strict";
cc._RFpush(module, '0d1b6qqQydIpYFON6JxEy9y', 'HistoryManager');
// js\gc\HistoryManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node,
        leftContent: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.historyUrl, null, function (msg) {

            var p = msg.msg;
            //alert(p);
            for (var i = 0; i < p.length; i++) {
                //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                var item = cc.instantiate(self.itemPrefab);
                self.leftContent.addChild(item);
                item.x = 0;
                item.y = -1 * i * item.height;
                item.name = 'history' + i;
                self.content.height = (i + 1) * item.height;

                item = item.getComponent('HistoryItem');
                var labelStr = "第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "\t\t" + p[i].result;
                item.setMsg(labelStr);
            }
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

cc._RFpop();