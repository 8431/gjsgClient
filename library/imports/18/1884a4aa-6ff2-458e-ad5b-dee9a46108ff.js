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
    dzzb: function dzzb() {
        cc.director.loadScene('dzzb');
    },
    hsbs: function hsbs() {},
    hcbs: function hcbs() {},
    hcks: function hcks() {},
    gmks: function gmks() {},
    wphs: function wphs() {}

});