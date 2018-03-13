cc.Class({
    extends: cc.Component,

    properties: {
        msg:cc.EditBox,
        selectBn:cc.Button,
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

    },
    buttonEvent:function(){
        var num=this.msg.string
        if(num>10||num<0){
          showAlert('请输正确的数量')
        }else{
            userWuPin.num=num;
            console.log(userWuPin)
            ajaxData(HxsgUrl.userWuPin,userWuPin,this.tiShi)
        }

    },
    tiShi:function(data){
        cc.log(data.msg)
        showAlert(data.msg);
        
    },
backEvent: function () {
        //调用通用的返回上一场景方法
          loadScene(HxsgScenes.wupin, HxsgScenes.index);

    },
});
