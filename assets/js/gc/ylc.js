cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        // showSystemMsgAlert(1,'11111');
        //  showSystemMsgAlert(2,'22222');
        //   showSystemMsgAlert(3,'33333');
   
    },
    ylc: function () {
        loadingScene(HxsgScenes.saizi, HxsgScenes.index);
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function () {
        //调用通用的返回上一场景方法
        returnLast();
    },
});
