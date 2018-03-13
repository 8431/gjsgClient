cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },

    zhuangtaiEvent: function(){
        cc.log('gongneng panel 状态');
           loadScene(HxsgScenes.role, HxsgScenes.index);
    },

    wupinEvent: function(){
        cc.log('gongneng panel 物品');
        var scene = cc.director.getScene().name;
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },

    fujiangEvent: function(){
        cc.log('gongneng panel 副将');
        loadScene(HxsgScenes.fujiang, HxsgScenes.index);
    },

    zuduiEvent: function(){
        cc.log('gongneng panel 组队');
    },

    paihangEvent: function(){
        cc.log('gongneng panel 排行');
    },

    haoyouEvent: function(){
        cc.log('gongneng panel 好友');
         loadScene(HxsgScenes.friends, HxsgScenes.index);
    },

    youjianEvent: function(){
        cc.log('gongneng panel 邮件');
    },

    renwuEvent: function(){
        cc.log('gongneng panel 任务');
    },

    leitaiEvent: function(){
        cc.log('gongneng panel 擂台');
    },

    jiaopaiEvent: function(){
        cc.log('gongneng panel 教派');
    },

    xunlianEvent: function(){
          loadingScene(HxsgScenes.xunLian, HxsgScenes.index);
        cc.log('gongneng panel 训练');
    },

    baokuEvent: function(){
        cc.log('gongneng panel 宝库');
    },

    gonggaoEvent: function(){
        cc.log('gongneng panel 公告');
          loadScene(HxsgScenes.ggList, HxsgScenes.index);
        
    },

    gonglueEvent: function(){
        cc.log('gongneng panel 攻略');
    },

    dengchuEvent: function(){
        cc.log('gongneng panel 登出');
    }
});
