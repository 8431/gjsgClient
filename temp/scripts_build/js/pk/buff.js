"use strict";
cc._RFpush(module, '72b9e+O+DRFUrIvrk7xRY65', 'buff');
// js\pk\buff.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        buffPrefab: cc.Prefab
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
        self = this;
    },

    getBuffPrefab: function getBuffPrefab() {
        return self.buffPrefab;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();