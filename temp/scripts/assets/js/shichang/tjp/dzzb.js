"use strict";
cc._RFpush(module, 'decfbRPuRBL3YBU+1qlsTS7', 'dzzb');
// js\shichang\tjp\dzzb.js

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

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
    },
    tk: function tk() {
        cc.director.loadScene('tkType');
    },
    wq: function wq() {
        cc.director.loadScene('wqType');
    }

});

cc._RFpop();