"use strict";
cc._RFpush(module, '825d6J4LcJPnaSAzr33fVvC', 'wupin');
// js\pk\wupin.js

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
        cc.find("Canvas/wupin").active = false;
        pk.pkyaostatus = "0";
    }

});

cc._RFpop();