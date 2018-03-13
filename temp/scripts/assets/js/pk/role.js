"use strict";
cc._RFpush(module, 'b054bXVlohHCrg1+T5Kr7vC', 'role');
// js\pk\role.js

"use strict";

var self;
var status;
cc.Class({
    extends: cc.Component,

    properties: {
        xue: cc.ProgressBar,
        jing: cc.ProgressBar,
        dead: cc.Node,
        play: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    clickRole: function clickRole(event, num) {
        var node = event.target;
        var name = node.parent.name;
        var p = node.parent;
        var role = p.getComponent("role");
        var progress = role.xue.getComponent(cc.ProgressBar).progress;
        //选择队友
        if (pk.pkyaostatus == "1") {
            //主角不管是否死亡都可以选择
            if (name == pk.rightOne) {
                clickRoleTool(name, pk.jnName);
            } else {
                //副将死亡不可以选择，并且只能选择右边副将
                for (var i = 0; i < pk.rightPlay.length; i++) {
                    if (name == pk.rightPlay[i] && progress > 0) {
                        clickRoleTool(name, pk.jnName);
                    } else {
                        cc.log("当前状态不符合，禁止点击操作");
                    }
                }
            }
        } else {
            //选择敌人
            if (num == pk.selectStatus && progress > 0) {
                clickRoleTool(name, pk.jnName);
                //已死副将不能点击
            } else {
                cc.log("当前状态不符合，禁止点击操作");
            }
        }
    },
    setXueAndJing: function setXueAndJing(xue, jing) {
        this.xue.getComponent(cc.ProgressBar).progress = xue;
        this.jing.getComponent(cc.ProgressBar).progress = jing;
    },
    setDead: function setDead() {
        this.dead.active = true;
        this.dead.opacity = 255;

        this.play.active = false;
        //死亡停止buff动画播放
        var buff = self.node.getChildByName("buff");
        buff.removeAllChildren();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();