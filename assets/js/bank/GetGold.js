cc.Class({
    extends: cc.Component,

    properties: {
        playerGold_label: cc.Label,
        bankGold_label: cc.Label,
        getGold_editbox: cc.EditBox,
    },

    //返回钱庄场景
    back: function () {
        returnLast();
    },

    //取款记录
    getRecord: function () {

    },

    //确认取款
    getConfirm: function () {
        var self = this;
        var getDate = {
            "status": "del",//该参数有add(存款),del(取款)
            "jin": this.getGold_editbox.string,//存金就填该参数
        };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function () {
        this.playerGold_label.string = "您目前有" + Bank.playerGold + "金砖";
        this.bankGold_label.string = "钱庄存款" + Bank.bankGold + "金砖";
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
