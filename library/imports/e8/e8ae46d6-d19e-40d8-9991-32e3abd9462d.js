'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        left: cc.Node,
        right: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        this.canvas = cc.find('Canvas');
        var px = this.canvas.width / 2;
        this.addImageAction(px);
    },

    addImageAction: function addImageAction(px) {
        //获取边框到中心的距离，即得到两边框的坐标。注意：因为时序问题，必须要canvas的宽度来计算
        var seqLeft = cc.sequence(cc.moveTo(1, cc.p(-px, 0)).easing(cc.easeCubicActionOut(1)));
        var seqRight = cc.sequence(cc.moveTo(1, cc.p(px, 0)).easing(cc.easeCubicActionOut(1)));
        self.left.runAction(seqLeft);
        self.right.runAction(seqRight);
    }
});