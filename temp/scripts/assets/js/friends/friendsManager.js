"use strict";
cc._RFpush(module, 'e0d6eI92jxJMIYujH2nqZ4k', 'friendsManager');
// js\friends\friendsManager.js

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
        msg: cc.EditBox,
        menu: {
            default: [],
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        cc.director.preloadScene('talking');
        // this.clearScrollview();

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
    sendMsg: function sendMsg() {
        //cc.log('wupin mananger 发送消息');
        ajaxData(HxsgUrl.sendMsgForFriends, { 'type': '好友' }, this.initYaopin);
        var msessage = this.msg.getComponent(cc.EditBox).string;
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.index, HxsgScenes.index);
        curItemData = null;
    },

    /**
     * -->药品
     */
    yaopinEvent: function yaopinEvent() {
        // cc.log('wupin mananger 好友');
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 0;
        this.menu[currentWupin].interactable = false;

        // var kshuifu = cc.instantiate(this.kshuifuPrefab);
        // this.content.addChild(kshuifu);
        // this.kshuifuButton = kshuifu.getChildByName('huifuBtn');
        // this.kshuifuButton.on(cc.Node.EventType.TOUCH_END, function () {
        //     //TODO快速恢复
        //     cc.log('wupin mananger 药品 快速恢复');
        // });
        ajaxData(HxsgUrl.friends, { 'type': '好友' }, this.initYaopin);
    },
    queryMoHu: function queryMoHu(e, type) {
        var msg = cc.find("Canvas/mohu/input").getComponent('cc.EditBox').string;
        if (msg == '' || typeof msg == 'undefined') {
            showAlert("输入不能为空");
        } else {
            switch (type) {
                case "ID":
                    //正则表达式
                    var re = /[^0-9]/;
                    if (!re.test(msg)) {
                        userWuPin.objects = { 'type': 'ID', 'msg': msg };
                        loadingScene(HxsgScenes.friendsList, HxsgScenes.friends);
                    } else {
                        showAlert("查询ID只能输入数字");
                    }
                    break;
                case "NAME":
                    userWuPin.objects = { 'type': 'NAME', 'msg': msg };
                    loadingScene(HxsgScenes.friendsList, HxsgScenes.friends);
                    break;
            }
        }
    },
    friendsList: function friendsList(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        var num = 0;
        var total = msg.length;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.yaopinPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('friendsItem');
            num += comp.initFriendsList(i, 'friends', itemMsg);
            comp.selectBn.node.on("click", self.skillList, self);
        }
        self.title.string = '在线' + num + '/' + total;
        self.content.height = msg.length * 65;
    },

    initYaopin: function initYaopin(data) {
        //if(currentWupin != data.type) return;

        var msg = data.msg;
        var num = 0;
        var total = msg.length;
        //showAlert(msg, null, null);
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.yaopinPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('friendsItem');
            num += comp.initFriendsItem(i, 'friends', itemMsg);
            comp.selectBn.node.on("click", self.skillList, self);
        }
        self.title.string = '在线' + num + '/' + total;
        self.content.height = msg.length * 65;
    },
    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;

        var button = node.getComponent(cc.Button);
        //window.wuPin.jinengList=bn.id;
        myFriends.friendid = button.id.id;
        myFriends.friendname = button.id.name;
        loadingScene("talking", "friends");

        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    /**
     * -->装备
     */
    zhuangbeiEvent: function zhuangbeiEvent() {

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 1;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '最近' }, this.initYaopin);
    },

    initZhuangbei: function initZhuangbei(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zawuPrefab);
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
        cc.log('wupin mananger 亲人');

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 2;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '亲人' }, this.initYaopin);
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
        cc.log('wupin mananger 仇人');

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 3;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '仇人' }, this.initYaopin);
    },

    initZawu: function initZawu(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zawuPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            comp.initZawuItem(i, 'zawu', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    zawuItemEvent: function zawuItemEvent(data) {
        //TODO:
    },

    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    }

});

cc._RFpop();