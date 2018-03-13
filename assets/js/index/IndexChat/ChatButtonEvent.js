cc.Class({
    extends: cc.Component,

    properties: {
        chatMng: cc.Node,
        speakPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.chatMng = this.chatMng.getComponent('ChatManager');
        this.canvas = cc.find('Canvas');
    },

    /**
     * 返回上一场景
     */
    backEvent: function () {
        var self = this;
        //返回
        cc.log('返回');
        returnLastScene(HxsgScenes.indexchat);
    },

    refreshEvent: function () {
        //刷新
        cc.log('刷新');
        this.chatMng.updataMessageData();
    },

    speakEvent: function () {
        if(curChannel === 3) {
            cc.log('世界频道禁止发言');
            return;    //世界频道禁止发言
        }
        else if(curChannel === 1){
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
    viewClickEvent: function () {
        cc.log('加载聊天页面');
        loadScene(HxsgScenes.indexchat, HxsgScenes.index);
    },

    hotkeyEvent: function () {
        cc.log('快捷键');
        //TODO:显示快捷键面板
    }

});
