"use strict";
cc._RFpush(module, '7adb4G60EdDeZOjU+goKhjj', 'inputNum');
// js\wupin\userJiNengShu\inputNum.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.EditBox,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},
    buttonEvent: function buttonEvent() {
        var num = this.msg.string;
        if (num > 10 || num < 0) {
            showAlert('请输正确的数量');
        } else {
            userWuPin.num = num;
            console.log(userWuPin);
            ajaxData(HxsgUrl.userWuPin, userWuPin, this.tiShi);
        }
    },
    tiShi: function tiShi(data) {
        cc.log(data.msg);
        showAlert(data.msg);
    },
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    }
});

cc._RFpop();