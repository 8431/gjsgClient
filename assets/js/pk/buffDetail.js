var self;

cc.Class({
    extends: cc.Component,

    properties: {
        feng:cc.SpriteFrame,
        wei:cc.SpriteFrame,
        luan:cc.SpriteFrame,
        gong:cc.SpriteFrame,
        yin:cc.SpriteFrame,
        su:cc.SpriteFrame,
        gu:cc.SpriteFrame,
        du:cc.SpriteFrame,
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
      self=this;
    },
   getSpriteFrame:function(name){
       cc.log(this[name])
     
        return this[name];

   }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
