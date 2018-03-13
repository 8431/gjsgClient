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

    },
   backEvent: function () {
        //调用通用的返回上一场景方法
       var scene = cc.director.getScene().name;
        returnLastScene(scene);
    },
     backUserList: function () {
         cc.director.loadScene('userList');
    },
    // HxsgScenes
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
