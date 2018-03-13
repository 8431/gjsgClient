"use strict";
cc._RFpush(module, 'e4358QaZm1Cv6fGYV7VI0Ad', 'GetGold');
// js\bank\GetGold.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerGold_label: cc.Label,
        bankGold_label: cc.Label,
        getGold_editbox: cc.EditBox
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
            "jin": this.getGold_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {
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