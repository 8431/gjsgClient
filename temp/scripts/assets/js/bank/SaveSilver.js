"use strict";
cc._RFpush(module, '2ca9a3JjTVA97Ec/OSL1/a+', 'SaveSilver');
// js\bank\SaveSilver.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerSilver_label: cc.Label,
        bankSilver_label: cc.Label,
        saveSilver_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //存款记录
    saveRecord: function saveRecord() {},

    //确认存款
    saveConfirm: function saveConfirm() {
        var self = this;
        var saveDate = {
            "status": "add", //该参数有add(存款),del(取款)
            "yin": this.saveSilver_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, saveDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerSilver_label.string = "您目前有" + Bank.playerSilver + "两";
        this.bankSilver_label.string = "钱庄存款" + Bank.bankSilver + "两";
    }

});

cc._RFpop();