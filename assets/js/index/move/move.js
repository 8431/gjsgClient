
cc.Class({
    extends: cc.Component,

    properties: {
        cityName: cc.Label,
        zuoBiao: cc.Sprite,
         move2: cc.Sprite,
        cityImg: cc.Sprite,
        zuoBiaoList: {
            default: [],
            type: cc.SpriteFrame
        },
        cityImgList: {
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
    init: function (msg) {
        try {
            this.cityName.string = msg.name;
            this.zuoBiao.spriteFrame = null;
            this.cityImg.spriteFrame = null;
            var key = Math.round(Math.random() * 15);
            cc.log('key' + key)
            this.cityImg.spriteFrame = this.cityImgList[key];
            if (msg.num != 4) {
                this.zuoBiao.spriteFrame = this.zuoBiaoList[msg.num];
            }
        } catch (e) {
            cc.log('加载地图信息异常:' + e)
        }



    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
