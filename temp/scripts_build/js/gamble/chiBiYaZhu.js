"use strict";
cc._RFpush(module, '79986+13DpJeaaVp1maOhRq', 'chiBiYaZhu');
// js\gamble\chiBiYaZhu.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        topMsg: cc.Label,
        playerMoney: cc.Label,
        yaZhuMoney: cc.Label,
        wei: {
            default: null,
            type: cc.EditBox
        },
        shu: {
            default: null,
            type: cc.EditBox
        },
        wu: {
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        ajaxData(HxsgUrl.loadYaZhuMsg, null, function (msg) {

            self.playerMoney.string = "您有" + msg.msg.roleJin + "金" + msg.msg.roleYin + "银";

            self.yaZhuMoney.string = "您目前已增援" + msg.msg.sumJin + "金" + msg.msg.sumYin + "银";
        });
        self = this;
        self.topMsg.string = ChiBiVo.topMsg;
    },
    backEvent: function backEvent() {
        var yaZhu = cc.find("Canvas/chiBiYaZhu");
        yaZhu.active = false;
        var chibi = cc.find("Canvas/chibi").getComponent("chiBi");
        chibi.load();
    },
    sure: function sure(e, num) {
        var money;
        var result;
        var data;
        var tishi;

        switch (num) {
            case '1':
                {
                    money = self.wei.string;

                    result = '魏';

                    break;
                }
            case '2':
                {
                    money = self.shu.string;
                    result = '蜀';
                    break;
                }
            case '3':
                {
                    money = self.wu.string;
                    result = '吴';
                    break;
                }
        }
        if (ChiBiVo.type == "jin") {
            data = { 'result': result, 'jin': money };
            tishi = "您押了" + result + "军" + money + "金砖";
        } else {
            data = { 'result': result, 'yin': money };
            tishi = "您押了" + result + "军" + money + "银两";
        }

        ajaxData(HxsgUrl.chiBiYaZhu, data, function (msg) {
            if ("true" == msg.msg) {
                showAlert(tishi);
            } else if ("5001" == msg.msg) {
                showAlert("每期押注总数不能超过1000金10万银");
            } else if ("false" == msg.msg) {
                showAlert("您的余额不足");
            }

            self.onLoad();
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();