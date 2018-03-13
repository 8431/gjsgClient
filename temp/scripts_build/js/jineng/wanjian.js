"use strict";
cc._RFpush(module, 'e2271aK0SBBa44nRPvhcslN', 'wanjian');
// js\jineng\wanjian.js

"use strict";

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

    // use this for initialization
    onLoad: function onLoad() {},
    endEvent: function endEvent(event) {
        cc.log("动画播放完毕");
        var node = event.targer;
        node.active = false;

        var background = cc.find('Canvas/background');
        var seq = cc.sequence(cc.moveTo(1, cc.p(0, 137)).easing(cc.easeCubicActionOut(1)));
        background.color = new cc.Color(245, 245, 245);
        background.runAction(seq);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();