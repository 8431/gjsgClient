cc.Class({
    extends: cc.Component,

    properties: {
        msg:cc.RichText,
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
        var self=this;
         self.msg.string="";
           ajaxData(HxsgUrl.userWuPin,{"wupinId":userWuPin.wupinId,"num":1}, function (msg) {
            self.msg.string=msg.msg;
            }
              
          );
    },
 /**
     * 点击事件-->返回
     */
    backEvent: function () {
        //调用通用的返回上一场景方法
       //调用通用的返回上一场景方法
          loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
