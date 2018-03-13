"use strict";
cc._RFpush(module, 'fc178Y6Sy9Iya94IOvrYc80', 'buffDetail');
// js\pk\buffDetail.js

"use strict";

var self;

cc.Class({
    extends: cc.Component,

    properties: {
        feng: cc.SpriteFrame,
        wei: cc.SpriteFrame,
        luan: cc.SpriteFrame,
        gong: cc.SpriteFrame,
        yin: cc.SpriteFrame,
        su: cc.SpriteFrame,
        gu: cc.SpriteFrame,
        du: cc.SpriteFrame
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    getSpriteFrame: function getSpriteFrame(name) {
        cc.log(this[name]);

        return this[name];
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();