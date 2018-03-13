'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bgSprite: cc.Sprite,
        fujiangLabel: cc.RichText,
        zhanBtn: cc.Node,
        xiuBtn: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(index, data) {
        this.spriteToggle(index);

        this.data = data;

        var richString = '<color=#FFFFFF click="richTextEvent">' + data.name + '</color>';
        this.fujiangLabel.string = richString;
        this.zhanBtn.on("click", function (event) {
            ajaxUtils(HxsgUrl.setFjState, { 'id': this.data.fuId }, function (msg) {
                showAlert(msg, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                }, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                });
            });
        }, this);
        this.xiuBtn.on("click", function (event) {
            ajaxUtils(HxsgUrl.setFjState, { 'id': this.data.fuId }, function (msg) {
                showAlert(msg, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                }, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                });
            });
        }, this);

        if (data.status === '休息') {
            this.zhanBtn.active = false;
        } else if (data.status = '战斗') {

            this.xiuBtn.active = false;
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function spriteToggle(index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.bgSprite.enabled = isOdd;
    },

    richTextEvent: function richTextEvent() {
        cc.log(this.node.parent.name + ' 详情');
        propCheckId = this.data.fuId;
        loadScene(HxsgScenes.fjxiangqing, HxsgScenes.fujiang);
    },

    zhanBtnEvent: function zhanBtnEvent() {

        cc.log(this.node.name + ' 出战');
    },

    xiuBtnEvent: function xiuBtnEvent() {
        cc.log(this.node.parent.name + ' 休息');
    }
});