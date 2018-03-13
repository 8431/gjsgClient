cc.Class({
    extends: cc.Component,

    properties: {
        speakPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.canvas = cc.find('Canvas');
    },

    haoyouEvent: function(){
        cc.log('index hotkey 好友');
    },

    wupinEvent: function(){
        cc.log('index hotkey 物品');
    },

    xiaoxiEvent: function(){
        cc.log('index hotkey 消息');
    },

    paihangEvent: function(){
        cc.log('index hotkey 排行');
    },

    renwuEvent: function(){
        cc.log('index hotkey 任务');
    },

    fujiangEvent: function(){
        cc.log('index hotkey 副将');
    },

    youjianEvent: function(){
        cc.log('index hotkey 邮件');
    },

    baokuEvent: function(){
        cc.log('index hotkey 宝库');
    },

    wanjiaEvent: function(){
        cc.log('index hotkey 玩家');
    },

    gengduoEvent: function(){
        cc.log('index hotkey 更多');
    },

    pindaoEvent: function(){
        cc.log('index hotkey 频道');
    },

    fayanEvent: function(){
        cc.log('index hotkey 发言');

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

    backEvent: function(){
        cc.log('index hotkey 返回');
        this.node.active = false;
    }
});
