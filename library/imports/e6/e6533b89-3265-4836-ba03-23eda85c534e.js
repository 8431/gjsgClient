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