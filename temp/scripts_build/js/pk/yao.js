"use strict";
cc._RFpush(module, '81d33tgnb5EgqvGVOAla1Ns', 'yao');
// js\pk\yao.js

"use strict";

var self = void 0;
cc.Class({
    extends: cc.Component,

    properties: {
        num: cc.Label,
        img: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    setNum: function setNum(num) {
        this.num.string = num;
    },
    setImg: function setImg(url) {}

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();