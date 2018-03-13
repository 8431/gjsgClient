"use strict";
cc._RFpush(module, '5cf89M7HsZN2bdtWZkdWj+G', 'touzhuitem');
// js\wupin\userJiNengShu\touzhuitem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setId: function setId(msg) {
        this.id = msg;
    },
    getId: function getId() {
        return this.id;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();