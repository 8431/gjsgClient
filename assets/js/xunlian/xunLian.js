var self;
cc.Class({
    extends: cc.Component,

    properties: {
        num: cc.EditBox,
        msg: cc.RichText,
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    setMsg: function (msg) {
        this.msg.string = msg;

    },

    // use this for initialization
    onLoad: function () {
        self = this;
        //this.menuButton(this,0);
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function () {
        returnLast();
    },
    buttonEvent: function () {
        var num = this.num.string;
        ajaxData(HxsgUrl.startTraining, { 'num': num }, this.alertSucces);
    },
    alertSucces: function (msg) {
        showAlert(msg.msg);
    },

    menuButton: function (event, dataNum) {
        var content = cc.find("Canvas/scrollView/view/content");
        content.removeAllChildren();
        var buttonList = cc.find("Canvas/buttonList");
        var list = buttonList.children;
        for (var i = 0; i < list.length; i++) {
            if (i == dataNum) {
                list[i].color = new cc.Color(63, 23, 66);
            } else {
                list[i].color = new cc.Color(224, 27, 193);
            }
        }
        switch (dataNum) {
            case '0':
                cc.loader.loadRes('prefabs/xunLian', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var jsxl = cc.instantiate(prefab);
                        var jsxlJs = jsxl.getComponent('xunLian');
                        jsxlJs.jieshouEvent();
                        content.addChild(jsxl);
                    }
                });
                break;
            case '1':
                ajaxData(HxsgUrl.training, { 'status': '0' }, this.zhengZaiEvent);
                break;
            case '2':
                ajaxData(HxsgUrl.training, { 'status': '1' }, this.wanChengEvent);
                break;
            case '3':
            cc.loader.loadRes('prefabs/IndexGongNengXunLian/shuoMing', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var jsxl = cc.instantiate(prefab);
                        content.addChild(jsxl);
                    }
                });
                cc.log('说明')
                break;
            case '4':
                ajaxData(HxsgUrl.queryJingYan, null, self.lingQuJingYan);
                cc.log('领取经验')
                break;


        }

    },
    jieshouEvent: function () {
        var jin = 60;
        var jy = 100;
        cc.log(roleMsg.roleId)
        if (roleMsg.roleId >= 120) {
            jin = 140;
            jy = 450;
        } else if (roleMsg.roleId >= 100) {
            jin = 120;
            jy = 300;
        } else if (roleMsg.roleId >= 71) {
            jin = 100;
            jy = 200;
        } else if (roleMsg.roleId >= 40) {
            jin = 80;
            jy = 150;
        } else if (roleMsg.roleId >= 1) {
            jin = 60;
            jy = 100;
        }
        var msg = '训练说明:玩家可将角色委托给教军场训练（每日可训练一次，最长10小时,每训练1小时需要消耗20点体力值' +
            '您当前' + roleMsg.roleId + '级，训练费用每小时' + jin + '金砖，每小时训练可以获得当前' + jy + '次战斗经验值，每次军训1小时可增加额外的1%的经验值';
        this.setMsg(msg);

    },
    zhengZaiEvent: function (msg) {
        cc.loader.loadRes('prefabs/xunlianDetail', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();
            if (!err) {
                for (var key in msg.msg) {
                    var zaxl = cc.instantiate(prefab);
                    if (key % 2 == 0) {
                        zaxl.color = new cc.Color(207, 105, 221);
                    } else {
                        zaxl.color = new cc.Color(0, 0, 49);
                    }

                    zaxl.getChildByName("msg").getComponent("cc.RichText").string = '<color=#F8DD50 click="this.clickEvent">' + msg.msg[key].rolename + '</c>';
                    content.addChild(zaxl);
                }

            }
        });

    },
    wanChengEvent: function (msg) {
        cc.loader.loadRes('prefabs/xunlianDetail', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();
            if (!err) {
                for (var key in msg.msg) {
                    var zaxl = cc.instantiate(prefab);
                    if (key % 2 == 0) {
                        zaxl.color = new cc.Color(207, 105, 221);
                    } else {
                        zaxl.color = new cc.Color(0, 0, 49);
                    }
                    zaxl.getChildByName("msg").getComponent("cc.RichText").string = '<color=#F8DD50 click="this.clickEvent">' + msg.msg[key].rolename + '</c><color=#FCFCFC>完成训练，获得经验' + msg.msg[key].jingyan + '</c>';
                    content.addChild(zaxl);
                }

            }
        });

    },
    lingQuJingYan: function (msg) {

        cc.loader.loadRes('prefabs/IndexGongNengXunLian/lingQuJingYan', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();

            if (!err) {
                var p = msg.msg;
                //if (p = !'' && typeof (p) != 'undefined' && p != null) {

                var pTime = p.status;
                cc.log("-------------" + typeof (p.date))
                var zaxl = cc.instantiate(prefab);
                content.addChild(zaxl);
                var nowTime = new Date().getTime();
                var time = pTime - nowTime;
                cc.log("-------------" + time)
                if (time < 0) {
                    zaxl.getChildByName("time").getComponent("cc.RichText").string = "";
                } else {
                    //计时器
                    self.schedule(function () {
                        // 这里的 this 指向 component
                        time = time - 1000;
                        self.time(time, zaxl.getChildByName("time").getComponent("cc.RichText"));

                    }, 1);
                }
                var jy = p.jingyan;

                zaxl.getChildByName("jingyan").getComponent("cc.Label").string = '本次可领取经验:' + jy;

                // }


            }
        });


    },
    clickEvent: function () {
        loadingScene(HxsgScenes.friendInfo);
    },
    time: function (time, p) {
        cc.log(time);
        time = time - 1000;

        if (time >= 0) {
            var t = getTime(time);
            p.string = "领取倒计时 "+t;
            cc.log(t);
            //  cc.find("Canvas/scrollView/view/content/lingQuJingYan").getChildByName("jingyan").getComponent("cc.RichText").string ="领取倒计时"+t;
        } else {
            this.unschedule(this.time);
             p.string='';
            //cc.find("Canvas/scrollView/view/content/lingQuJingYan").getChildByName("jingyan").getComponent("cc.RichText").string ="";
        }

    },
     getJingYanButton:function(){
         ajaxData(HxsgUrl.getJingYan,null,self.getJingYanButtonSucces)

     },
     getJingYanButtonSucces:function(msg){
         showAlert(msg.msg)

     },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
