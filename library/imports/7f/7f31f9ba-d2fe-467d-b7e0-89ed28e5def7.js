'use strict';

window.curItemData = null;
window.currentWupin = 0;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        kshuifuPrefab: cc.Prefab,
        yaopinPrefab: cc.Prefab,
        zhuangbeiPrefab: cc.Prefab,
        kuangshiPrefab: cc.Prefab,
        zawuPrefab: cc.Prefab,

        content: cc.Node,
        title: cc.Label,
        fuzhong: cc.Label,
        menu: {
            default: [],
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
        this.clearScrollview();

        switch (currentWupin) {
            case 0:
                this.yaopinEvent();
                break;
            case 1:
                this.zhuangbeiEvent();
                break;
            case 2:
                this.kuangshiEvent();
                break;
            case 3:
                this.zawuEvent();
                break;
            default:
                this.yaopinEvent();
                break;
        }
    },

    /**
     * 点击事件-->快速恢复
     */
    kshuifuEvent: function kshuifuEvent() {
        cc.log('wupin mananger 快速恢复');
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
        curItemData = null;
    },
    myZhuangBeiEvent: function myZhuangBeiEvent() {
        //调用通用的返回上一场景方法
        loadingScene(HxsgScenes.myZhuangBei, HxsgScenes.wupin);
    },
    /**
     * -->药品
     */
    yaopinEvent: function yaopinEvent() {
        cc.log('wupin mananger 药品');
        this.title.string = '药品';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 0;
        this.menu[currentWupin].interactable = false;

        var kshuifu = cc.instantiate(this.kshuifuPrefab);
        this.content.addChild(kshuifu);
        this.kshuifuButton = kshuifu.getChildByName('huifuBtn');
        this.kshuifuButton.on(cc.Node.EventType.TOUCH_END, function () {
            //TODO快速恢复
            cc.log('wupin mananger 药品 快速恢复');
        });

        // ajax(HxsgUrl.yaopinUrl, this.initYaopin);
    },

    initYaopin: function initYaopin(data) {
        if (currentWupin != data.type) return;

        // this.content.height = (msg.length + 1) * 65;
    },

    /**
     * -->装备
     */
    zhuangbeiEvent: function zhuangbeiEvent() {
        cc.log('wupin mananger 装备');
        this.title.string = '装备';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 1;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.zhuangbeiUrl, null, this.initZhuangbei);
    },

    initZhuangbei: function initZhuangbei(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zhuangbeiPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            comp.initZhuangbeiItem(i, 'zhuangbei', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->矿石
     */
    kuangshiEvent: function kuangshiEvent() {
        cc.log('wupin mananger 矿石');
        this.title.string = '矿石';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 2;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.kuangshiUrl, null, this.initKuangshi);
    },

    initKuangshi: function initKuangshi(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var item = cc.instantiate(self.kuangshiPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            var itemMsg = msg[i];
            comp.initKuangshiItem(i, 'kuangshi', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->杂物
     */
    zawuEvent: function zawuEvent() {
        cc.log('wupin mananger 杂物');
        this.title.string = '杂物';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 3;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.zawuUrl, null, this.initZawu);
    },

    initZawu: function initZawu(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            try {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.zawuPrefab);
                self.content.addChild(item);
                var comp = item.getComponentInChildren('WupinItem');
                comp.initZawuItem(i, 'zawu', itemMsg, self.zawuItemEvent, itemMsg);
            } catch (e) {}
        }
        self.content.height = msg.length * 65;
    },

    zawuItemEvent: function zawuItemEvent(data) {
        var type = data.type1;
        userWuPin.wupinId = data.id;
        userWuPin.objects = data;
        cc.log(userWuPin.wupinId);
        if (type == '令') {
            cc.log('令');
            loadScene(HxsgScenes.userJiangJunLing, HxsgScenes.wupin);
        }
        if (type == '技能书' || type == '技能') {
            cc.log('技能书');
            loadScene(HxsgScenes.userList, HxsgScenes.wupin);
        }
        if (type == '心法书') {
            cc.log('心法书');
            loadScene(HxsgScenes.userXinFaShu, HxsgScenes.wupin);
        }
        if (type == '石') {
            cc.log('砸矿石');
            self.userMineral();
        }
    },
    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    },
    userMineral: function userMineral() {
        cc.log('data:' + userWuPin.wupinId);
        ajaxData(HxsgUrl.userMineral, { 'id': userWuPin.wupinId, 'num': '1' }, self.tiShi);
    },
    tiShi: function tiShi(data) {
        cc.log(data);
        showAlert(data.msg);
    }

});