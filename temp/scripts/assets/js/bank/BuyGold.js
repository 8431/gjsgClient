"use strict";
cc._RFpush(module, 'a0d30G6o9dK+bQzYA9c1pQG', 'BuyGold');
// js\bank\BuyGold.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();