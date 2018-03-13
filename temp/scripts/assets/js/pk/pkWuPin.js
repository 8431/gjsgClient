"use strict";
cc._RFpush(module, '82d4cPSt7JANYbsW4stCSKS', 'pkWuPin');
// js\pk\pkWuPin.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        contents: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
    },
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("初始化技能列表");
        cc.find("Canvas/jineng").active = false;
    },
    onloading: function onloading(e, id) {
        cc.loader.loadRes('pk/yao', cc.Prefab, function (err, prefab) {
            if (!err) {
                self.contents.removeAllChildren();
                ajaxUtils(HxsgUrl.queryRoleYao, null, function (data) {
                    self.contents.height = data.length / 2 * 80 + 80;
                    for (var i = 0; i < data.length; i++) {
                        var node = cc.instantiate(prefab);
                        var imgName = data[i].yaoid;
                        var path = void 0;
                        if (imgName <= 10) {
                            path = "qx/";
                        } else {
                            path = "jl/";
                        }

                        var jnJs = node.getComponent("yao");
                        var sprite = node.getComponent('cc.Sprite');
                        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/yao/" + path + imgName + ".png"));
                        //cc.log(sprite.spriteFrame)
                        jnJs.setNum(data[i].sum);
                        node.on('click', self.clickEvent, self);
                        node.id = data[i];
                        self.contents.addChild(node);
                    }
                });
            }
        });
    },
    clickEvent: function clickEvent(event) {
        var node = event.target;
        var jn = node.id;
        cc.log('使用药品名称:' + node.id.skillname);
        cc.find("Canvas/wupin").active = false;
        var data = null;
        //道具的使用，后期需要增加，经军令
        pk.selectStatus = 2000;
        data = pk.clickArrayRight[0];
        onloadJnZhiling(false);
        console.log("选择指令完成");
        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.yaoname);
    }
});

cc._RFpop();