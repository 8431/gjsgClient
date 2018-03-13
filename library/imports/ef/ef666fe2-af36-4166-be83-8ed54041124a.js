"use strict";

var thisclass;
cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        num: 0,
        getChance: false,
        wacount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.find("Canvas/main/topzone1/jixuwabao").active = false;
        var nodetop1 = cc.find("Canvas/main/topzone1");
        var nodetop2 = cc.find("Canvas/main/topzone2");
        nodetop1.active = false;
        nodetop2.active = false;
        var dialog = cc.find("Canvas/main/topzone2/dialog");
        dialog.active = false;
        thisclass = this;
        ajaxData(HxsgUrl.loadWaBao, null, function (data) {
            var msg = data.msg;
            thisclass.id = msg.id;
            roleMsg.id = msg.id;
            thisclass.num = msg.num;
            if (msg.num == 0 & (msg.w1 == 0 && msg.w2 == 0 && msg.w3 == 0 && msg.w4 == 0 && msg.w5 == 0 && msg.w6 == 0 && msg.w7 == 0 && msg.w8 == 0 && msg.w9 == 0)) {
                thisclass.switchScene(3, 2);
            } else {
                thisclass.switchScene(3, 1, msg);
            }
        });
    },
    /**
         * 点击事件-->返回
         */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    },
    switchScene: function switchScene(before, after, msg) {
        var beforen;
        switch (before) {
            case 1:
                beforen = cc.find("Canvas/main/topzone1");break;
            case 2:
                beforen = cc.find("Canvas/main/topzone2");break;
            case 3:
                beforen = cc.find("Canvas/main/topzone3");break;
        }
        if (typeof beforen != "undefined") beforen.active = false;
        var aftern;
        switch (after) {
            case 1:
                aftern = cc.find("Canvas/main/topzone1");
                cc.find("Canvas/main/topzone1/numlabel").getComponent("cc.Label").string = "剩余挖宝次数:" + this.num.toString();
                this.wacount = 0;
                var wabaonode = cc.find("Canvas/main/topzone1/wabao");
                for (var i = 1; i <= 9; i++) {
                    var name = "w" + i;
                    var node = cc.find(name + "/button", wabaonode);
                    cc.log('msg.name:' + msg[name]);
                    if (msg[name] == 0) {
                        this.wacount++;
                        cc.log(name + "---false");
                        cc.log(" this.wacount:" + this.wacount);
                        node.getComponent("cc.Button").interactable = false;
                        node.color = new cc.Color(0, 0, 49);
                        node.getComponent(cc.Button).enabled = true;
                        node.getChildByName("Label").getComponent("cc.Label").string = "已挖";
                    } else {
                        cc.log(name + "---true");
                        node.getComponent("cc.Button").interactable = true;
                        node.color = new cc.Color(231, 14, 101);
                        node.getComponent(cc.Button).enabled = true;
                        node.getChildByName("Label").getComponent("cc.Label").string = "挖宝";
                    }
                }
                this.keySwitch();
                break;
            case 2:
                aftern = cc.find("Canvas/main/topzone2");break;
            case 3:
                aftern = cc.find("Canvas/main/topzone3");break;
        }
        aftern.active = true;
    },

    wabao: function wabao(event) {
        var node = event.target;
        node.color = new cc.Color(0, 0, 49);
        node.getComponent(cc.Button).enabled = false;
        node.getChildByName("Label").getComponent("cc.Label").string = "已挖";
        var name = node.parent.name;
        this.wacount++;
        var jsonData = {};
        jsonData["id"] = this.id;
        jsonData[name] = '0';
        cc.log(jsonData);
        ajaxData(HxsgUrl.startWaBao, jsonData, function (data) {
            var node = cc.find("Canvas/main/topzone1/tiplabel");
            node.getComponent("cc.Label").string = data.msg;
        });
        this.keySwitch();
    },
    keySwitch: function keySwitch() {
        if (this.wacount >= 9) {
            if (this.num <= 0) this.switchScene(1, 2);else {
                cc.find("Canvas/main/downline").y -= 50;
                cc.find("Canvas/scrollView").y -= 50;
                cc.find("Canvas/main/topzone1/jixuwabao").active = true;
            }
        }
    },

    enter: function enter(event) {
        // var dialog=cc.find("Canvas/main/topzone2/dialog");
        // dialog.active=true;
        // var mymsg=dialog.getChildByName("msg").getComponent("cc.Label");
        var thisclass = this;
        // mymsg.string="连接中。。。";
        ajaxData(HxsgUrl.init, null, function (data) {
            // mymsg.string=data.msg;

            if (data.msg == 'false' || data.msg == '000003') {
                thisclass.getChance = true;
                showAlert('你没有藏宝图，无法进入');
            } else {
                showAlert('消耗藏宝图一个，点击进入宝洞', thisclass.okdialog);
            }
        });
    },

    jixuwabao: function jixuwabao(event) {
        cc.find("Canvas/main/downline").y += 50;
        cc.find("Canvas/scrollView").y += 50;
        cc.find("Canvas/main/topzone1/jixuwabao").active = false;
        ajaxData(HxsgUrl.nextWaBao, roleMsg, thisclass.sx);

        //this.switchScene(0, 1);
    },
    sx: function sx() {
        cc.log("-----继续挖宝");
        ajaxData(HxsgUrl.loadWaBao, null, function (data) {
            var msg = data.msg;
            thisclass.id = msg.id;
            roleMsg.id = msg.id;
            thisclass.num = msg.num;
            if (msg.num == 0 & (msg.w1 == 0 && msg.w2 == 0 && msg.w3 == 0 && msg.w4 == 0 && msg.w5 == 0 && msg.w6 == 0 && msg.w7 == 0 && msg.w8 == 0 && msg.w9 == 0)) {
                thisclass.switchScene(3, 2);
            } else {
                thisclass.switchScene(3, 1, msg);
            }
        });
    },
    okdialog: function okdialog(event) {

        loadingScene(HxsgScenes.wabao, HxsgScenes.index);
    },

    test: function test(event) {
        this.switchScene(1, 2);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});