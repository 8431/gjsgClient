"use strict";
cc._RFpush(module, 'be706fPWbRAs7Tod659Sztt', 'GGList');
// js\gg\GGList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        ggItem: {
            default: null,
            type: cc.Prefab,
            tooltip: "公告预制项"
        }
    },

    //返回上一场景
    back: function back() {
        returnLast();
    },

    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.ggUrl, null, function (msg) {
            var array = msg.msg; //拿到公告数组
            var i = 0;
            for (i in array) {
                //遍历数组
                var item = cc.instantiate(self.ggItem); //实例化公告项预制
                item.getComponent('GGItem').init(array[i]); //初始化设置
                item.y -= i * 80; //设置位置
                if (i % 2 == 0) {
                    //若为双数，则显示sprite
                    item.getComponent('cc.Sprite').enabled = true;
                } else {
                    //若为单数，则禁用sprite
                    item.getComponent('cc.Sprite').enabled = false;
                }
                if (i > 5) {
                    //前6项显示“新”
                    item.getComponent('GGItem').newText.enabled = false;
                }
                self.node.addChild(item);
                self.node.height += 80;
            }
        });
    }

});

cc._RFpop();