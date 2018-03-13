cc.Class({
    extends: cc.Component,

    properties: {
        playerSilver_label: cc.Label,
        bankSilver_label: cc.Label,
        getSilver_editbox: cc.EditBox,
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
            "yin": this.getSilver_editbox.string,//存银就填该参数
        };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {
          
            showAlert(msg.result,self.back());
        });
    },

    // use this for initialization
    onLoad: function () {
        this.playerSilver_label.string = "您目前有" + Bank.playerSilver + "两";
        this.bankSilver_label.string = "钱庄存款" + Bank.bankSilver + "两";
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
