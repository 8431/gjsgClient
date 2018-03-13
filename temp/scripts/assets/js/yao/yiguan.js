"use strict";
cc._RFpush(module, '834a6k7SjNCqIRtuAN8fFFd', 'yiguan');
// js\yao\yiguan.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaoname: cc.Label,
        level: cc.Label,
        ms: cc.Label,
        price: cc.Label,
        num: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
    },
    yaoClick: function yaoClick(event, num) {
        ajaxData(HxsgUrl.queryYaoPinDetail, {
            'id': num
        }, function (data) {
            if (data.code = "000") {
                var re = data.data;
                self.yaoname.string = re.yaoname;
                self.level.string = re.yaoid;
                self.ms.string = re.ms;
                self.price.string = re.yaoprice;
            } else {
                showAlert("服务器出错！");
            }
        });
    },
    goumai: function goumai() {
        cc.log("购买药品：" + self.level.string);
        cc.log("购买药品：" + self.num.string);
        if (self.num.string == "") {
            showAlert("请输入购买数量");
        } else {
            cc.log("提交购买药品");
            ajaxData(HxsgUrl.buyYao, { 'id': self.level.string, 'num': self.num.string }, function (data) {
                if (data.code == "000") {
                    showAlert(data.data.message);
                } else {
                    showAlert("服务器错误");
                }
            });
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();