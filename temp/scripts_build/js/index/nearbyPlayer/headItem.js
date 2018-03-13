"use strict";
cc._RFpush(module, 'e6533uJMmVINroDI+2oXFNO', 'headItem');
// js\index\nearbyPlayer\headItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        headImg: cc.Sprite,
        headImgList: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},
    init: function init(num) {
        this.headImg.spriteFrame = this.headImgList[num];
    }
});

cc._RFpop();