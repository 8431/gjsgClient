'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.head = this.node.getComponent(cc.Sprite);
        this.head.spriteFrame = null;
        this.id = -1;
    },

    clickEvent: function clickEvent() {
        if (this.id < 0) return;
        //TODO:点击事件
    },

    setHead: function setHead(data) {
        this.id = data.id;
        var headUrl = data.touxiang;
        headUrl = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        this.headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(this.headUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                this.head.spriteFrame = spriteFrame;
            }
        });
    }
});