'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label
    },

    /**
     * msg: 显示的内容
     * sureEvent: 确定按钮回调函数，没有传undefined或者null
     * cancelEvent: 返回按钮回调函数，没有传undefined或者null
     * suerParameter: 确定按钮回调函数参数
     * cancelParameter: 返回按钮回调函数参数
     */
    initAlert: function initAlert(msg, sureEvent, cancelEvent, suerParameter, cancelParameter) {
        this.text.string = msg;
        this.sureEvent = sureEvent;
        this.cancelEvent = cancelEvent;
        this.suerParameter = suerParameter;
        this.cancelParameter = cancelParameter;
    },

    sureClickEvent: function sureClickEvent() {
        if (this.sureEvent) {
            this.sureEvent(this.suerParameter);
        }
        this.node.destroy();
    },

    cancelClickEvnet: function cancelClickEvnet() {
        cc.log('cancelClickEvnet');
        if (this.cancelEvent) {
            this.cancelEvent(this.cancelParameter);
        }
        this.node.destroy();
    }
});