'use strict';

var self;
var playStatus = 0;
var msg = pk.msg;
var msgJson;
var TweenLite = require('TweenLite');
/**
 * PK动画播放有限状态机
 */
module.exports = function getpkStateMachine() {

    this.pkStateMachine = new StateMachine({
        data: {
            battle: null
        },
        transitions: [{ name: 'toStart', from: 'none', to: 'start' }, { name: 'toShifa', from: 'start', to: 'shifa' }, { name: 'toMoveBackGround', from: 'shifa', to: 'backgorund' }, { name: 'toSkill', from: 'backgorund', to: 'skill' }, { name: 'toKouXue', from: 'skill', to: 'kouxue' }, { name: 'toReturnBackGround', from: 'kouxue', to: 'moveBack' }, { name: 'finshed', from: 'moveBack', to: 'end' }, { name: 'end', from: 'end', to: 'start' }],
        methods: {
            onStart: function onStart() {
                var _this = this;

                msg = pk.msg;
                msgJson = msg[playStatus];
                try {
                    cc.log(msgJson.player1 + "使用了【" + msgJson.attackType.name + "】造成" + msgJson.player2[0] + "：" + msgJson.battleData[msgJson.player2[0]].Qx + "被攻击者剩余：" + msgJson.battleData[msgJson.player2[0]].Qx2);
                } catch (e) {}

                console.log("onStart");
                setTimeout(function () {
                    _this.onToShifa();
                }, 100);
            },
            onToShifa: function onToShifa() {
                if (playStatus >= pk.msg.length) {
                    playStatus = 0;
                    if (pk.pkstatus != "6000" && pk.pkstatus != "") {
                        cc.log("战斗结束");
                        cc.find("Canvas/end").active = true;
                        pk.msg = [];
                        pk.pkstatus = "";
                        //重置
                        pk.initType = "init";
                        pk.player1 = {};
                        pk.player2 = {};
                        return;
                    }
                    if (pk.initType != "init") {
                        //重置
                        pk.initType = "init";

                        var jsonData = pk.tempMsg;
                        //重新加载主界面数据----2018-1-21修复重复加载rightPlay问题
                        onloadPkMsg(jsonData);
                        pk.selectStatus = 2000;
                        pk.timeStatus = 0; //开启倒计时
                        pk.msg = []; //初始化数据
                        playStatus = 0;
                        cc.log(pk);
                        window.pkOnload.init();
                        PkSocketEvents.onloadPlay(-160, -165, 0);
                        PkSocketEvents.onloadPlay(253, 205, 1);
                        onloadJn(true);
                    }
                } else {
                    cc.find("Canvas/name/attackType").getComponent(cc.Label).string = msgJson.attackType.name;
                    console.log("施法。。。" + msgJson.player1);
                    var body = cc.find("Canvas/background/" + msgJson.player1 + "/play/role/body");
                    var shifAnim = body.getChildByName("shifa").getComponent(cc.Animation);

                    //关闭血条显示
                    playbloodClose(0);
                    //关闭所有人物buff显示
                    buffClose();

                    //对自身队友释放技能，场景不移动
                    var _self = this;
                    setTimeout(function () {
                        playAnim(shifAnim, function () {
                            _self.onToMoveBackGround();
                        });
                    }, 100);
                }
            },
            onToMoveBackGround: function onToMoveBackGround() {
                var _this2 = this;

                console.log("背景移动开始");
                var jnName = msgJson.attackType.type;
                if (jnName == "jnzhanpugong" || jnName == "usryao" || jnName == "jlbz") {
                    setTimeout(function () {
                        _this2.onToSkill();
                    }, 100);
                } else {
                    setTimeout(function () {
                        var background = cc.find("Canvas/background");

                        var x = msgJson.attackType.rolePosition == 'left' ? -200 : 200;
                        if (msgJson.attackType.rolePosition == "self") {
                            x = -200;
                        }
                        var self = _this2;
                        moveTo(background, x, 137, function () {
                            self.onToSkill();
                        });
                    }, 100);
                }
            },
            onToSkill: function onToSkill() {
                var _this3 = this;

                var background = cc.find("Canvas/jn");
                var jnAnim = null;
                //停止站立
                standAnim(msgJson.player2, false);
                var jnName = msgJson.attackType.type;
                var key = false;

                switch (jnName) {
                    case "jnzhanpugong":
                        {
                            var playGongId = msgJson.player1;
                            var playShouId = msgJson.player2[0];
                            var playGong = cc.find("Canvas/background/" + playGongId);
                            var playShou = cc.find("Canvas/background/" + playShouId);
                            var playGongX = playGong.x;
                            var playGongY = playGong.y;
                            var _self2 = this;
                            moveTo(playGong, playShou.x, playShou.y, function () {
                                _self2.onToKouXue();
                                moveTo(playGong, playGongX, playGongY, function () {
                                    setTimeout(function () {
                                        _self2.onFinshed();
                                    }, 1000);
                                });
                            });

                            break;
                        }
                    case "wugujidu":
                        {

                            cc.find("Canvas/background").color = new cc.Color(255, 255, 255);
                            jnAnim = background.getComponent(cc.Animation);
                            key = true;
                            break;
                        }
                    case "jlbz":
                        {
                            var _self3 = this;
                            _self3.onFinshed();

                            key = false;
                            break;
                        }
                    case "wei":
                    case "luan":
                    case "feng":
                    case "usryao":
                    case "qichong":
                        {
                            var playShouId;
                            var num;

                            var _ret = function () {
                                playShouId = msgJson.player2;
                                num = 0;

                                var self = _this3;

                                var _loop = function _loop(i) {
                                    setTimeout(function () {
                                        var jnDan = cc.find("Canvas/background/" + playShouId[i] + "/jnDan");
                                        cc.log("Canvas/background/" + playShouId[i] + "/jnDan");
                                        jnAnim = jnDan.getComponent(cc.Animation);

                                        playAnimArr(jnAnim, jnName, function () {
                                            msg = pk.msg;
                                            num++;
                                            if (num == playShouId.length - 1) {
                                                self.onToReturnBackGround();
                                            }
                                            self.onToReturnBackGround();
                                            console.log(jnName + "技能释放完毕");
                                        });
                                        self.onToKouXue(jnName);
                                    }, 100);
                                };

                                for (var i = 0; i < playShouId.length; i++) {
                                    _loop(i);
                                }
                                // setTimeout(() => {
                                //    pkStateMachine.onToReturnBackGround();
                                // }, 100 * (playShouId.length+1));
                                key = false;
                                return 'break';
                            }();

                            if (_ret === 'break') break;
                        }

                    case "lei":
                    case "lipi":
                    case "sheming":
                        {
                            cc.find("Canvas/background").color = new cc.Color(0, 0, 0);
                            var playShouId = msgJson.player2[0];
                            var jnDan = cc.find("Canvas/background/" + playShouId + "/jnDan");
                            jnAnim = jnDan.getComponent(cc.Animation);
                            key = true;
                            break;
                        }

                    default:
                        {
                            cc.find("Canvas/background").color = new cc.Color(0, 0, 0);
                            jnAnim = background.getComponent(cc.Animation);
                            key = true;
                            break;
                        }
                }
                if (key) {
                    var _self4 = this;
                    setTimeout(function () {
                        playAnimArr(jnAnim, jnName, function () {
                            // pkStateMachine.onToKouXue();
                            console.log("技能释放完毕");
                            _self4.onToReturnBackGround();
                        });
                        _self4.onToKouXue();
                    }, 100);
                }
            },
            onToKouXue: function onToKouXue(jnName) {
                //被攻击着
                var play = msgJson.player2;
                var battleData = msgJson.battleData;
                var attackType = msgJson.attackType;

                var _loop2 = function _loop2(i) {
                    // var re = kouxue(pk.player1, play[i], battleData[play[i]],attackType);
                    // if (re) {
                    //     kouxue(pk.player2, play[i], battleData[play[i]],attackType);
                    // }
                    setTimeout(function () {
                        var qx = battleData[play[i]].Qx;
                        //播放扣血，或者种了BUFF动画，buff动画根据技能名称选择
                        var shouji = cc.find("Canvas/background/" + play[i]).getComponent(cc.Animation);
                        var kouxue = cc.find("Canvas/background/" + play[i] + "/play/kouxue");
                        kouxue.getComponent(cc.Label).string = qx;
                        var dead = cc.find("Canvas/background/" + play[i] + "/dead");
                        //  let kouxue = cc.find("Canvas/background/" + play[i] + "/play/kouxue");
                        if (jnName == "usryao") {
                            cc.find("Canvas/background/" + play[i] + "/play").active = true;
                            //  kouxue.color = new cc.Color("#16F10D");
                            dead.active = false;
                        } else {
                            //  kouxue.color = new cc.Color("#000000");
                        }
                        if (qx == 0) {
                            kouxue.getComponent(cc.Label).string = "";
                            var wz = cc.find("Canvas/background/" + play[i] + "/play/wz").getComponent(cc.Animation);;
                            playAnim(wz);
                        }
                        playAnim(shouji, function () {

                            var qx2 = battleData[play[i]].Qx2;
                            cc.find("Canvas/background/" + play[i] + "/play/kouxue").getComponent(cc.Label).string = "";
                            if (qx2 == 0) {
                                //播放死亡动画
                                dead.scaleX = -1;
                                cc.find("Canvas/background/" + play[i] + "/play").active = false;
                                var deadAnim = dead.getComponent(cc.Animation);
                                playAnim(deadAnim, null);
                            }
                        });
                    }, 200);
                };

                for (var i = 0; i < play.length; i++) {
                    _loop2(i);
                }
            },
            onToReturnBackGround: function onToReturnBackGround() {
                console.log("onMoveBack----");
                var background = cc.find("Canvas/background");
                background.color = new cc.Color(240, 240, 240);
                var self = this;
                setTimeout(function () {
                    moveTo(background, -20, 137, function () {
                        self.onFinshed();
                    });
                }, 100);
            },
            onFinshed: function onFinshed() {
                console.log("onFinshed----");
                cc.find("Canvas/name/attackType").getComponent(cc.Label).string = "";
                this.onEnd();
            },
            onEnd: function onEnd() {
                playStatus++;
                this.onStart();
                console.log("end----");
            }
        }
    });
    //return pkStateMachine;
};

function kouxue(arr, id, battleData, attackType) {
    var qx = battleData.Qx;
    var re = true;
    cc.log(id);
    for (var m = 0; m < arr.length; m++) {
        cc.log("------------------------");
        cc.log(arr[m].id);
        if (arr[m].id == id) {
            try {
                qx = parseInt(qx);
                arr[m].qixue = battleData.Qx2;
                re = false;
                cc.log(arr);
                var buffType = battleData.buff;
                if (buffType != null && typeof buffType != 'undefined') {
                    arr[m]['battleData'] = battleData;
                }
            } catch (e) {
                cc.log("buff加载异常:" + e);
            }
        }
    }
    cc.log(pk);
    return re;
}
function playAnim(anim, callback) {
    anim.play();
    if (callback) {
        anim.on('finished', callback);
    }
}
function playAnimArr(anim, name, callback) {
    anim.play(name);
    if (callback) {
        anim.on('finished', callback);
    }
}
function moveTo(position, x, y, callback) {

    TweenLite.to(position, 0.5, {
        x: x,
        y: y,
        ease: Power2.easeOut,
        onComplete: callback
    });
}
/**
 * 玩家血条显示开关
 */
function playbloodClose(num) {
    var left = pk.leftPlay;
    var right = pk.rightPlay;
    for (var i = 0; i < left.length; i++) {
        cc.find("Canvas/background/" + left[i] + "/play/status").opacity = num;
    }
    for (var _i = 0; _i < right.length; _i++) {
        cc.find("Canvas/background/" + right[_i] + "/play/status").opacity = num;
    }
}
/**
 * 关闭玩家buff
 */
function buffClose() {
    var background = cc.find("Canvas/background");
    var children = background.children;
    for (var i = 0; i < children.length; ++i) {
        try {
            var buff = children[i].getChildByName("buff");
            buff.removeAllChildren();
        } catch (e) {
            cc.log(e);
        }
    }
}
/**
 * 站立动画控制开关
 */
function standAnim(arr, key) {

    for (var i = 0; i < arr.length; i++) {
        var role = cc.find("Canvas/background/" + arr[i] + "/play/role");
        if (key) {
            role.getComponent(cc.Animation).play();
        } else {
            role.getComponent(cc.Animation).stop();
        }
    }
}
var playJs = cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Sprite,
        body: cc.Sprite,
        foot: cc.Sprite,
        attack: cc.Node,
        button: cc.Button,
        roleDeath: cc.Node,
        label: cc.Node
    },
    death: function death() {
        this.roleDeath.active = true;
    },
    shifa: function shifa() {
        var playJs = require("playerItem");
        var py = new playJs();
        var stateMachine = py.pkStateMachine;
        stateMachine.toStart();
    },
    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        // var flipYAction = cc.flipX(true);
        // var actionBy = cc.moveTo(0.5, cc.p(130,698));
        //    this.node.runAction(flipYAction);

        //  this.node.runAction(actionBy);

        //    var y= this.node.getPositionY();
        //       var x= this.node.getPositionX();
        //       var height=y+10;
        //     var seq = cc.repeatForever(cc.moveTo(x, cc.p(0,y+10)).easing(cc.easeCubicActionOut(1)));
        //     if(height==this.node.getPositionY())
        //       var seq = cc.repeatForever(cc.moveTo(x, cc.p(0,y-10)).easing(cc.easeCubicActionOut(1)));
        //     this.body.node.runAction(seq);

        //         cc.log("---height:"+this.node.getPositionY())

    },
    attackHide: function attackHide() {
        this.attack.active = false;
    },

    attackShow: function attackShow() {
        this.attack.active = true;
    },
    /**
     * 遍历数组返回角色信息----
     */
    getRoleMsg: function getRoleMsg(id) {
        try {
            var p = pk.play1;
            for (var i in p) {
                if (id == p[i].id) {
                    return p[i];
                }
            }
        } catch (e) {}
    },
    playerClickEvent: function playerClickEvent(event) {
        cc.log('人物点击时间触发');
        var parent;
        var msg;
        var left;
        try {
            if (pk.clickStatus) {
                var node = event.target;

                if (typeof node == 'undefined') {
                    cc.log('------------------');
                    parent = event;
                } else {
                    parent = node.parent;
                    cc.log('-------+++++-----------');
                }

                var roleDetail = cc.find("Canvas/roleDetail");
                var roleDetailJs = roleDetail.getComponent("roledetail");
                msg = getPkRoleMsg(parent.name, 1);
                left = pk.leftPlay;
                if (typeof msg == 'undefined') {
                    msg = getPkRoleMsg(parent.name, 2);
                    left = pk.rightPlay;
                }

                roleDetailJs.setAttackName(pk.jn);
                roleDetailJs.setType(msg.name);
                roleDetailJs.setXue("血:" + msg.qixue);
                roleDetailJs.setJing("精:" + msg.jingli);
                roleDetailJs.setsu("速度第八");
                cc.log(pk.status);
                if (pk.status == parent.name) {
                    cc.log("攻击指令完成:" + pk.rightPlay[0] + "使用【" + pk.jn + "】攻击了" + parent.name);
                    //指令数组
                    pk.attacked.push({ 'attack': pk.rightPlay[0], 'attacked': parent.name, 'attackType': pk.jn });

                    pk.rightPlay.shift();
                    if (pk.rightPlay.length == 0) {
                        //右方攻击指令全部完成
                        cc.log("发送攻击指令给服务器:" + pk.attacked.length);
                    }
                    this.back();
                    parent.getComponent("playerItem").attackHide();
                    pk.clickStatus = false;
                    pk.status = null;
                    pk.jn = '普通攻击';
                } else {
                    pk.status = parent.name;
                    parent.getComponent("playerItem").attackShow();
                    var sccen = cc.director.getScene();
                    for (var i in left) {
                        if (left[i] != parent.name) {
                            var child = sccen.getChildByName(left[i]);
                            child.getComponent("playerItem").attackHide();
                        }
                    }
                }
            }
        } catch (e) {

            cc.log(e);
        }
    },

    back: function back() {
        var right = pk.rightPlay;
        if (typeof right[0] == 'undefined' || right[0] == null || right[0] == '') {
            cc.find("Canvas/zhiling").active = false;
            cc.find("Canvas/roleDetail").active = false;
        } else {
            cc.find("Canvas/zhiling").active = true;
            cc.find("Canvas/roleDetail").active = false;
            for (var m in right) {
                var child = cc.director.getScene().getChildByName(right[m]);
                if (m == 0) {
                    child.getComponent("playerItem").attackShow();
                } else {
                    child.getComponent("playerItem").attackHide();
                }
            }
        }
    }

});