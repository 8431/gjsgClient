cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },

    yiguanEvent: function () {
        cc.log('sheshi panel 医馆');
          loadingScene(HxsgScenes.yiguan,HxsgScenes.index);
    },

    qianzhuangEvent: function () {
        cc.log('sheshi panel 钱庄');
        loadScene(HxsgScenes.bank, HxsgScenes.index);
    },

    guanyiEvent: function () {
          showAlert("暂未开放")
        cc.log('sheshi panel 馆驿');
    },

    shichangEvent: function () {
        cc.log('sheshi panel 市场');
        cc.director.loadScene('shiChangIndex');
    },

    guangchangEvent: function () {
        cc.log('sheshi panel 广场');
        cc.director.loadScene('guangChang');
    },

    guanfuEvent: function () {
        showAlert("暂未开放")
        cc.log('sheshi panel 官府');
    },

    zhanchangEvent: function () {
          showAlert("暂未开放")
        cc.log('sheshi panel 战场');
    },

    guanjiaEvent: function () {
          showAlert("暂未开放")
        cc.log('sheshi panel 管家');
    },
     wabaoEvent: function () {
       loadingScene(HxsgScenes.wabao,HxsgScenes.index);
    }
    
});
