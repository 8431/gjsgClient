"use strict";
cc._RFpush(module, 'b59bcdQ+jBKSrnaBT5Nn/H9', 'FujiangConfig');
// js\index\Fujiang\FujiangConfig.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        fujiangPrefab: cc.Prefab,
        getBtnPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        self.clearScrollview();
        ajaxData(HxsgUrl.fujiangConfigUrl, null, self.initFujiangConfig);
    },

    initFujiangConfig: function initFujiangConfig(data) {
        var msg = data.msg;
        // var msg = self.testInfo();
        for (var i = 0; i < msg.length; i++) {
            var item = cc.instantiate(self.fujiangPrefab);
            item.name = 'fujiangPrefab_' + i;
            item.getChildByName('fujiangLabel').getComponent('FujiangItem').init(i, msg[i]);
            self.content.addChild(item);
        }
        var getBtn = cc.instantiate(self.getBtnPrefab);
        getBtn.name = 'getBtnPrefab';
        getBtn.on(cc.Node.EventType.TOUCH_END, self.getBtnEvent, self);
        self.content.addChild(getBtn);
        self.content.height = 20 + self.content.height;
    },

    getBtnEvent: function getBtnEvent() {
        cc.log('获取能学技能的历史副将');
    },

    backEvent: function backEvent() {
        // cc.director.loadScene(HxsgScenes.index);
        returnLastScene(HxsgScenes.fujiang);
    },

    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    }

    // testInfo: function(){
    //     var msg = {
    //         "msg": [
    //             {
    //                 "fuId": 10512,
    //                 "name": "(1级)张邈",
    //                 "roleId": 1000,
    //                 "status": "休息"
    //             },
    //             {
    //                 "fuId": 10513,
    //                 "name": "(1级)吕布",
    //                 "roleId": 1000,
    //                 "status": "休息"
    //             },
    //             {
    //                 "fuId": 10610,
    //                 "name": "(1级)于 禁",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10397,
    //                 "name": "(41级)吕布",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10402,
    //                 "name": "(44级)于 禁",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10411,
    //                 "name": "(1级)刘氏",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10412,
    //                 "name": "(48级)张邈",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10670,
    //                 "name": "(12级)潘璋",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10671,
    //                 "name": "(1级)司马昭",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10672,
    //                 "name": "(1级)潘璋",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10673,
    //                 "name": "(1级)刘氏",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             }
    //         ]
    //     }
    //     return msg;
    // }
});

cc._RFpop();