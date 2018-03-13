"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        background: [cc.SpriteFrame],
        bankLose: [cc.SpriteFrame]

    },

    // use this for initialization
    onLoad: function onLoad() {},
    gameOver: function gameOver() {

        var JsonData = pk.gameOverDetail;
        var arrJy = JsonData.jy;
        var arrJyResult = "";
        for (var key in arrJy) {
            arrJyResult += arrJy[key];
        }
        var arrDj = JsonData.djArr;
        var result = ".恭喜您获得";
        for (var i = 0; i < arrDj.length; i++) {
            result += "【" + arrDj[i].name + "】";
        }
        showAlert(arrJyResult + result, function () {
            cc.director.loadScene(HxsgScenes.index);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});