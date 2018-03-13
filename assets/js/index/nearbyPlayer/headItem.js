cc.Class({
    extends: cc.Component,

    properties: {
        headImg:cc.Sprite,
        headImgList:{
            default: [],
            type: cc.SpriteFrame
        },
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
    init:function(num){
        this.headImg.spriteFrame=this.headImgList[num];

    }
});
