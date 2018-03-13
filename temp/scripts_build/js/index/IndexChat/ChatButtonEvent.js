"use strict";
cc._RFpush(module, '9d2f3RycMZJlq/bisnvOFyT', 'ChatButtonEvent');
// js\index\IndexChat\ChatButtonEvent.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        chatMng: cc.Node,
        speakPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.chatMng = this.chatMng.getComponent('ChatManager');
        this.canvas = cc.find('Canvas');
    },

    /**
     * 返回上一场景
     */
    backEvent: function backEvent() {
        var self = this;
        //返回
        cc.log('返回');
        returnLastScene(HxsgScenes.indexchat);
    },

    refreshEvent: function refreshEvent() {
        //刷新
        cc.log('刷新');
        this.chatMng.updataMessageData();
    },

    speakEvent: function speakEvent() {
        if (curChannel === 3) {
            cc.log('世界频道禁止发言');
            return; //世界频道禁止发言
        } else if (curChannel === 1) {
            //TODO:门派验证
            cc.log('门派系统还未开放');
        }
        //发言
        cc.log('发言');
        var speak = cc.instantiate(this.speakPrefab);
        speak.x = 0;
        speak.y = 0;
        this.canvas.addChild(speak);
    },

    /**
     * 进入聊天场景
     */
    viewClickEvent: function viewClickEvent() {
        cc.log('加载聊天页面');
        loadScene(HxsgScenes.indexchat, HxsgScenes.index);
    },

    hotkeyEvent: function hotkeyEvent() {
        cc.log('快捷键');
        //TODO:显示快捷键面板
    }

});

cc._RFpop();