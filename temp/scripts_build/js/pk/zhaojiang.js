"use strict";
cc._RFpush(module, '361b7U68b1Bj6qBO6qvSyG2', 'zhaojiang');
// js\pk\zhaojiang.js

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
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("物品");
        cc.find("Canvas/zhaojiang").active = false;
    }

});

cc._RFpop();