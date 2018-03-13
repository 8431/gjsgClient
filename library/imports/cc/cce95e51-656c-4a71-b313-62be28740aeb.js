"use strict";

//var WS = require('serverSetup.js');
cc.Class({
    extends: cc.Component,

    properties: {
        account: {
            default: null,
            type: cc.EditBox
        },
        pass: {
            default: null,
            type: cc.EditBox
        },
        pass2: {
            default: null,
            type: cc.EditBox
        },
        suppass: {
            default: null,
            type: cc.EditBox
        },
        suppass2: {
            default: null,
            type: cc.EditBox
        },
        regInfo: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.regInfo.string = '';
    },

    //注册按钮
    zhuce: function zhuce() {
        //获取注册信息
        var self = this;
        var account = this.account.string;
        var pass = this.pass.string;
        var pass2 = this.pass2.string;
        var suppass = this.suppass.string;
        var suppass2 = this.suppass2.string;
        //判断密码一致性（是否设置密码与超级密码不同？）
        if (pass !== pass2) {
            showAlert("两次密码不一致");
            //this.regInfo.string = "两次密码不一致";
            pass2.string = "";
            return;
        }
        if (suppass !== suppass2) {
            showAlert("两次超级密码不一致");
            //this.regInfo.string = "两次超级密码不一致";
            suppass2.string = "";
            return;
        }

        cc.log(account);
        cc.log(pass + "==" + pass2);
        cc.log(suppass + "==" + suppass2);

        var dataJson = { "name": account };
        //检测账号重名
        ajaxData(HxsgUrl.checkAcount, dataJson, function (msg) {
            if (msg.code == "000") {
                if (msg.data === "001") {
                    showAlert("账号已存在");
                    //self.regInfo.string = "账号已存在"
                    self.account.string = "";
                    return;
                }
                //允许注册 
                else if (msg.data === "000") {
                        cc.log("账号注册开始");
                        cc.log(account);
                        cc.log(pass);
                        cc.log(suppass);
                        var dataJson = { "name": account, "password": pass, "supperpass": suppass };
                        //注册账号
                        ajaxData(HxsgUrl.register, dataJson, function (msg) {
                            cc.log(msg);
                            if (msg.code == "000") {
                                if (msg.data === "000") {
                                    cc.log("注册成功，跳转到角色创建界面");
                                    showAlert("恭喜您注册成功", function () {
                                        loadScene("login", "register");
                                    }, function () {
                                        loadScene("login", "register");
                                    });

                                    //cc.director.loadScene('createRole');
                                } else if (msg.data === "001") {
                                    cc.log("注册失败");
                                    showAlert(msg.message);
                                    return;
                                } else {
                                    showAlert("未知错误，注册失败：msg：" + msg);
                                    cc.log("未知错误");
                                }
                            } else {
                                showAlert("服务器异常");
                            }
                        });
                        return;
                    }
            } else {
                showAlert("服务器异常");
            }
        });
    },

    //返回登入界面
    comeBack: function comeBack() {
        loadScene("login", "register");
        //cc.director.loadScene('login');
    }
});