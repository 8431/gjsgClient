"use strict";
cc._RFpush(module, 'cdbd6Cr1GRE15wVwWDeqP8c', 'login');
// js\login\login.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        username: {
            default: null,
            type: cc.EditBox
        },
        pass: {
            default: null,
            type: cc.EditBox
        }
    },
    // use this for initialization
    onLoad: function onLoad() {

        // var key= uuid(16,36);
        // uuidKey=key;
        var anim = this.getComponent(cc.Animation);
        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play();
        // 指定播放 test 动画
        anim.play('system');
        this.check();
    },
    start: function start() {

        // Change the text in Label Component    
    },
    check: function check() {
        ajaxUtils(HxsgUrl.checkVersion, null, function (data) {
            if (data == "1") {
                showAlert("检测到有新的版本！q群455895673下载", function () {
                    cc.director.end();
                }, function () {
                    cc.director.end();
                });
            }
            if (data == "2") {
                showAlert("停服维护中！q群455895673", function () {
                    cc.director.end();
                }, function () {
                    cc.director.end();
                });
            }
        });
    },
    //登入按钮
    login: function login() {

        var self = this;
        //获取用户输入         
        var name = self.username.string;
        var pass = self.pass.string;
        //空数据拦截
        if (name === null || name === undefined || name === '') {
            showAlert('请输入用户名');
            return;
        }
        if (pass === null || pass === undefined || pass === '') {
            showAlert('请输入密码');
            return;
        }
        cc.log(name, pass);
        //敏感词检测 ？
        var dataJson = { "name": name, "password": pass, "key": uuidKey };
        ajaxData(HxsgUrl.login, dataJson, function (msg) {
            if (msg.code == "000") {
                if (msg.data === "005") {
                    cc.log("跳转到选择角色界面");
                    //跳转到选择界面
                    loadScene('selectRole', 'login');
                    //cc.director.loadScene('scenes/login/selectRole');
                } else if (msg.data === "003") {
                    //创建角色
                    cc.log("跳转到创建角色界面");
                    loadScene('selectRole', 'login');
                    //cc.director.loadScene('scenes/login/createRole');
                } else if (msg.data === "001") {
                    cc.log("登入失败" + msg.msg);
                    showAlert('用户名或者密码错误');
                } else if (msg.data === "002") {
                    //服务器异常
                    cc.log("登入失败" + msg.msg);
                    showAlert('用户名或者密码错误');
                } else {
                    cc.log("未定义错误" + msg.data);
                    showAlert('发生未知错误');
                }
            } else {
                showAlert('服务器异常');
            }
        });
    },
    //注册按钮 回调函数
    register: function register() {
        loadScene('register', 'login');
        //cc.director.loadScene('register');
    }
});

cc._RFpop();