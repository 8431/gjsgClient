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
    clickEvent: function clickEvent(e, num) {
        var jiesuan = cc.find("Canvas/jiesuan");
        switch (num) {
            case '1':
                {
                    //猜猜猜
                    jiesuan.active = false;
                    cc.find("Canvas/chibi").active = false;
                    cc.find("Canvas/saizi").active = true;
                    cc.log("DuChangVo.num" + DuChangVo.num);

                    if (DuChangVo.num <= 0) {
                        jiesuan.active = true;
                        jiesuan.getComponent("jiesuan").setMsg("猜猜猜结算中，请稍后再来");
                    }
                    break;
                }
            case '2':
                {
                    //赤壁
                    cc.find("Canvas/jiesuan").active = false;
                    cc.find("Canvas/chibi").active = true;
                    cc.find("Canvas/saizi").active = false;
                    if (ChiBiVo.num <= 0) {
                        jiesuan.active = true;
                        jiesuan.getComponent("jiesuan").setMsg("赤壁结算中，请稍后再来");
                    }
                    break;
                }
            case '3':
                {
                    break;
                }
            case '4':
                {
                    break;
                }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});