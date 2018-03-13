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
             cc.game.addPersistRootNode(this.node);
        // var animation = this.node.getComponent(cc.Animation);
        // // frames 这是一个 SpriteFrame 的数组.
        //  cc.url.raw(self.info.txUrl + 'yishinv3.jpg');
        // var spriteFrameArr=new
        // var clip = cc.AnimationClip.createWithSpriteFrames(frames, 17);
        // clip.name = "anim_run";
        // clip.wrapMode = cc.WrapMode.Loop;



    },
    endEvent: function () {
        cc.log("技能释放结束s")
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
