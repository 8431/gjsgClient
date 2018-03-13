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
              loadCommomScence();

    },
     zhp: function () {
             showAlert("暂未开放")

    },
    tjp: function () {
           showAlert("暂未开放")

    },
    wqd: function () {
            loadingScene(HxsgScenes.wuqi,HxsgScenes.index)
            

    },
     tzsc: function () {
            showAlert("暂未开放")

    },
    dp: function () {
              showAlert("暂未开放")

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
