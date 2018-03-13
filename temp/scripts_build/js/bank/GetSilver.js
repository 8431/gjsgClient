"use strict";
cc._RFpush(module, '66c60w2DQ5MloDzk8Cuc2ex', 'GetSilver');
// js\bank\GetSilver.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerSilver_label: cc.Label,
        bankSilver_label: cc.Label,
        getSilver_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //取款记录
    getRecord: function getRecord() {},

    //确认取款
    getConfirm: function getConfirm() {
        var self = this;
        var getDate = {
            "status": "del", //该参数有add(存款),del(取款)
            "yin": this.getSilver_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {

            showAlert(msg.result, self.back());
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerSilver_label.string = "您目前有" + Bank.playerSilver + "两";
        this.bankSilver_label.string = "钱庄存款" + Bank.bankSilver + "两";
    }

});

cc._RFpop();