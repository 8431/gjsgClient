"use strict";
cc._RFpush(module, '4e65cq69GNE563HWPMeIa72', 'SaveGold');
// js\bank\SaveGold.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerGold_label: cc.Label,
        bankGold_label: cc.Label,
        saveGold_editbox: cc.EditBox
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
            "jin": this.saveGold_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, saveDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerGold_label.string = "您目前有" + Bank.playerGold + "金砖";
        this.bankGold_label.string = "钱庄存款" + Bank.bankGold + "金砖";
    }

});

cc._RFpop();