'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},

    /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZhuangbeiItem: function initZhuangbeiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
        var richString = '<color=#FFFF00 click="zhuangbeiRichTextEvent">' + data.name + '</c>';
        this.richLabel.string = richString;
    },

    zhuangbeiRichTextEvent: function zhuangbeiRichTextEvent() {
        cc.log('zhuangbei item ' + this.data.name);
        curItemData = this.data;
        cc.log(this.data);
        zhaungBeiDetailsZbid.id = this.data.id;
        loadScene(HxsgScenes.zhuangbei, HxsgScenes.wupin);
    },

    /**
     * 矿石
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initKuangshiItem: function initKuangshiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;

        var richString = '<color=#FFFF00 click="kuangshiRichTextEvent">' + data.zwName + '(' + data.zwXiaoGuo + ')' + '</c>';
        this.richLabel.string = richString;
    },

    kuangshiRichTextEvent: function kuangshiRichTextEvent() {
        cc.log('kuangshi item ' + this.data.zwName);
        curItemData = { 'id': this.data.id + '' };
        loadScene(HxsgScenes.baoshi, HxsgScenes.wupin);
    },

    /**
     * 杂物
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZawuItem: function initZawuItem(index, type, data, event, userParam) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.clickEvent = event;
        this.userParam = userParam;
        //数量
        var btn = this.node.parent.getChildByName('useBtn');
        btn.active = data.custom1 === '1' ? true : false; //&& (data.num > 0)

        var num = '(' + data.num + ')';

        var richString = '<color=#FFFF00 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        this.richLabel.string = richString;
    },

    zawuRichTextEvent: function zawuRichTextEvent() {
        cc.log('zawu item ' + this.data.name);
        var url = HxsgUrl.zawuItemUrl;
        var data = JSON.stringify({ 'id': this.data.id });
        ajaxData(url, data);
    },

    buttonEvent: function buttonEvent() {
        cc.log('buttonEvent');
        if (this.clickEvent) {
            this.clickEvent(this.userParam);
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function spriteToggle(index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.sprite.enabled = isOdd;
    }
});