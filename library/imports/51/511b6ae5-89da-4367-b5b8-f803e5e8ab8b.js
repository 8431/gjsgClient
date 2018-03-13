"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        attackName: cc.Label,
        type: cc.Label,
        xue: cc.Label,
        jing: cc.Label,
        su: cc.Label

    },

    // use this for initialization
    onLoad: function onLoad() {},
    setAttackName: function setAttackName(name) {
        this.attackName.string = name;
    },
    setType: function setType(name) {
        this.type.string = name;
    },
    setXue: function setXue(name) {
        this.xue.string = name;
    },
    setJing: function setJing(name) {
        this.jing.string = name;
    },
    setsu: function setsu(name) {
        this.su.string = name;
    },
    return: function _return() {
        var roleDetail = cc.find("Canvas/roleDetail");
        roleDetail.active = false;
        var zhiLing = cc.find("Canvas/zhiling");
        zhiLing.active = true;
        onloadJnZhiling(true);
        selectEnemy(null, pk.clickArrayLeft);
        pk.sureClick = "";
        if (pk.pkyaostatus != "0") {
            pk.pkyaostatus = "0";
            selectEnemy(pk.clickArrayRight[0], pk.rightPlay);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});