



window.pkOnload;
var self;

cc.Class({
    extends: cc.Component,

    properties: {
        leftPlay: cc.Prefab,
        rightPlay: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        /**
         * -212 59    -123    heigt=72   width 89
         */
        self = this;
        window.pkOnload = this;
        PkSocketEvents.onloadPlay = this.onloadPlay;
        //this.init();
        cc.log("pkOnload加载了。。。。。。。。")
        openPkScoket(true);
        self.init();
        /////////////////////////////////////////////////
        // ajaxData("http://127.0.0.1:8080/Cocos2dAddPk/getYeGuaiData?level=10,15&name=侍卫群", null, function (data) {
        //     if (data.code != "000") {
        //         showAlert(data.message);
        //     } else {

        //         let initData = JSON.parse(data.data);
        //         onloadPkMsg(initData);
        //         self.onloadPlay(-160, -165, 0);
        //         self.onloadPlay(253, 205, 1);
        //         onloadJn(true);


        //         // self.init();
        //     }

        // });

        //    / self.init();
    },
    clickEvent: function (event) {
        var node = event.target;
        var jn = node.id;
        cc.log('技能名称:' + node.id.skillname);
        cc.find("Canvas/jineng").active = false;
        var data = null;
        //有些技能可以对自己或者队友释放
        switch (node.id.skillname) {
            case "气冲斗牛": {
                pk.selectStatus = 2000;
                data = pk.clickArrayRight[0]
                break;
            }
            default: {
                pk.selectStatus = 3000;
                data = pk.clickArrayLeft[0];
                break;
            }
        }


        onloadJnZhiling(false);
        console.log("选择指令完成")

        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.skillname);

    },

    /**right   w=89 h=59
     * x=253 
     * left 
     * x=-212   -265   305
     */

    onloadPlay: function (x, y, prefab) {
        cc.log("onloadPlay被调用了------------------")
        //初始化加载界面，所有角色都不可以点击
        pk.selectStatus = "001";
        var leftp;
        if (prefab == 0) {
            prefab = self.leftPlay;
            cc.log(pk.player1)
            leftp = pk.player1
        } else {
            prefab = self.rightPlay;
            leftp = pk.player2;
        }
        for (let i = 0; i < leftp.length; i++) {
            let play = cc.instantiate(prefab);
            self.node.addChild(play);
            play.setPositionY(59 - i * 72);
            if (leftp.length == 1) {
                play.setPositionY(0);
                play.setPositionX(x);
            } else {
                switch (i) {
                    case 0:
                    case 2: {

                        play.setPositionX(x - 89);
                        break;
                    }
                    case 1:
                    case 3: {
                        play.setPositionX(x);

                        break;
                    }

                }
            }

            play.name = leftp[i].id;
            var role = play.getComponent("role");

            var xue = leftp[i].qixue / leftp[i].qixue2;
            var jing = leftp[i].jingli / leftp[i].jingli2;
            role.setXueAndJing(xue, jing);

            //buff
            try {
                var buffLi = leftp[i].buff;
                if (buffLi != null && buffLi.length > 0) {
                    var buff = play.getChildByName("buff");
                    buff.removeAllChildren();
                    for (let k = 0; k < buffLi.length; k++) {
                        cc.log("-kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                        var buffJs = buff.getComponent("buff");
                        var PrefabBuff = buffJs.getBuffPrefab();
                        var buffIn = cc.instantiate(PrefabBuff);
                        var buffDetail = buffIn.getComponent("buffDetail");
                        var buffAni = buffDetail.getComponent(cc.Animation);
                        var spriteFrame;
                        for (var j in buffLi[k]) {
                            spriteFrame = buffDetail.getSpriteFrame(j);
                        }
                        //spriteFrame存在时加入
                        if (typeof (spriteFrame) != 'undefined') {
                            var sprite = buffIn.getComponent(cc.Sprite);
                            sprite.spriteFrame = spriteFrame;
                            buff.addChild(buffIn);
                        }


                    }
                }
                //气血为0
                if (leftp[i].qixue <= 0) {
                    role.setDead();
                    if (leftp[i].id != pk.rightOne) {
                        pk.clickArrayLeft.remove(leftp[i].id);
                    }

                }

                // if (leftp[i].buffType != null) {
                //     var buff = play.getChildByName("buff");
                //     var buffJs = buff.getComponent("buff");
                //     var PrefabBuff = buffJs.getBuffPrefab();
                //     var buffIn = cc.instantiate(PrefabBuff);
                //     var buffDetail = buffIn.getComponent("buffDetail");
                //     var buffAni = buffDetail.getComponent(cc.Animation);
                //     var spriteFrame = buffDetail.getSpriteFrame(leftp[i].buffTypeKey);
                //     var sprite = buffIn.getComponent(cc.Sprite);
                //     sprite.spriteFrame = spriteFrame;
                //     buff.addChild(buffIn);
                // }
            } catch (e) {
                cc.log("加载buff失败：" + e);

            }



        }

    },
    /**
     * 发送指令状态标识
     */

    /**
    * 指令函数
    * param e 事件对象
    * param num 区分按钮类型
    * param type 区分攻击类型
    * param status 区分左右角色
    */
    attack: function (e, num) {
        var name;
        try {
            switch (num) {
                //攻击指令
                case 'gj': {
                    onloadJnZhiling(false);
                    console.log("选择指令完成")
                    pk.selectStatus = 3000;

                    //模拟点击第一个人物按钮效果
                    clickRoleTool(pk.clickArrayLeft[0], "普通攻击");



                    break;
                }
                //攻击指令
                case 'fy': {
                    //模拟点击第一个人物按钮效果
                    clickRoleTool(pk.clickArrayLeft[0], "防御");
                    break;
                }
                case 'tp': {
                    cc.log("逃跑");
                    cc.find("Canvas/zhiling").active = false;
                    let play = cc.find("Canvas/background/" + pk.clickArrayRight[0])
                    //获取边框到中心的距离，即得到两边框的坐标。注意：因为时序问题，必须要canvas的宽度来计算
                    let seqRight = cc.sequence(cc.moveTo(2, cc.p(play.getPositionX() + 500, play.getPositionY())).easing(cc.easeCubicActionOut(1)));
                    play.runAction(seqRight);
                    break;
                }
                //技能指令
                case 'jn': {
                    cc.log("技能")
                    cc.find("Canvas/zhiling").active = false;
                    cc.log("初始化技能列表")
                    var jineng = cc.find("Canvas/jineng");
                    jineng.active = true;
                    let content = cc.find("Canvas/jineng/detail/scrollview/view/content")
                    cc.loader.loadRes('pk/jnButton', cc.Prefab, function (err, prefab) {
                        if (!err) {
                            var p = getRoleMsg(pk.clickArrayRight[0], pk.player2)
                            var jn = p.jineng;
                            content.removeAllChildren();
                            var hPrefab = cc.instantiate(prefab);
                            content.height = jn.length * (hPrefab.height + 5);
                            for (let i = 0; i < jn.length; i++) {
                                var jnPrefab = cc.instantiate(prefab);
                                var jnJs = jnPrefab.getComponent("jnName");
                                jnJs.setJname(jn[i].skillname);
                                jnPrefab.on('click', self.clickEvent, self);
                                jnPrefab.id = jn[i];
                                content.addChild(jnPrefab);
                            }
                        }
                    });


                    break;
                }
                //物品
                case 'wp': {
                    cc.log("物品")
                    cc.find("Canvas/zhiling").active = false;
                    cc.find("Canvas/wupin").active = true;
                    cc.find("Canvas/jineng").active = false;
                    cc.log("物品列表")
                    cc.find("Canvas/wupin/detail/scrollview/view/content").getComponent('pkWuPin').onloading();
                    pk.pkyaostatus = "1";

                    break;
                }
                //招将
                case 'zj': {
                    cc.log("物品")
                    cc.find("Canvas/zhiling").active = false;
                    cc.find("Canvas/zhaojiang").active = true;
                    cc.find("Canvas/jineng").active = false;
                    cc.log("物品列表")




                    break;
                }
            }

        } catch (e) {
            cc.log('加载技能列表异常:' + e)
        }


    },
    zidong: function () {
        var num = 1;
        for (var i = 0; i < pk.clickArrayRight.length; i++) {
            setTimeout(() => {
                self.attack(this, "gj");

            }, 200 * num);
            num++;
            setTimeout(() => {
                clickRoleTool(pk.clickArrayLeft[0], "普通攻击");
            }, 200 * num);
            num++;

        }
    },
    init: function () {
        try {

            cc.find("Canvas/roleDetail").active = false;
            cc.find("Canvas/jineng").active = false;
            cc.find("Canvas/wupin").active = false;
            cc.find("Canvas/zhaojiang").active = false;
            cc.find("Canvas/end").active = false;
            cc.find("Canvas/zhiling").active = true;
            var leftp = pk.player1;
            var rightp = pk.player2;
            self.node.removeAllChildren();
            cc.find("Canvas/vs/left").getComponent(cc.Label).string = leftp[0].name
            cc.find("Canvas/vs/right").getComponent(cc.Label).string = rightp[0].name
            cc.find("Canvas/time/name").getComponent(cc.Label).string = rightp[0].name
            //倒计时
            var count = 60;
            var timeCallback = function (dt) {
                if (count === 0) {
                    // 在第六次执行回调时取消这个计时器
                    this.unschedule(timeCallback);
                    this.zidong();
                } else {
                    cc.find("Canvas/time").active = true;
                    cc.find("Canvas/time/time").getComponent(cc.Label).string = "出招(" + count + ")";
                    count--;
                }
                if (pk.timeStatus === 8000) {
                    // 在第六次执行回调时取消这个计时器
                    this.unschedule(timeCallback);
                    cc.find("Canvas/time").active = false;

                }
            }

            this.schedule(timeCallback, 1);
        } catch (e) {
            cc.log(e)
        }


    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});


//  window.pkWs= new WebSocket(ws://127.0.0.1:8080/pkServer');
//         pkWs.onopen = function (event) {
//             // 发送一个初始化消息
//             // 发送一个初始化消息
//             var jsonData = {
//                 type: "pkWait",
//                 pkType: "1001",
//                 jsonData: {
//                     roleA: "1000",
//                     roleB: "1000",
//                     guaiData: {
//                         "level": "115,120",
//                         "name": "藤甲兵群"
//                     }

//                 },
//             }
//             pkWs.send(JSON.stringify(jsonData));
//         }
//         // 监听消息
//         pkWs.onmessage = function (event) {
//             console.log('Client notified socket has closed', JSON.stringify(event.data));
//             var returnJsonData =JSON.parse(event.data);
//             cc.log(returnJsonData)
//             pk.uuid = returnJsonData[0];
//             pk.player1 = returnJsonData[1];
//           //  pk.player2 = returnJsonData;
//             pk.leftPlay = [];
//               pk.clickArrayLeft=[];
//           //  pk.rightPlay = [];
//             for (var i = 0; i <  pk.player1.length; i++) {
//                 cc.log( pk.player1[i].id);
//                  pk.leftPlay.push( pk.player1[i].id);
//                  pk.clickArrayLeft.push( pk.player1[i].id);
//               //  pk.rightPlay.push(returnJsonData[i].id)
//             }
//             self.onloadPlay( pk.player1, -160, -165,  self.leftPlay, self);
//             self.onloadPlay( pk.player2, 253, 205,  self.rightPlay, self);
//             onloadJn(true);
//         };