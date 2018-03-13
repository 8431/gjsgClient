cc.Class({
    extends: cc.Component,

    properties: {
        wait:cc.Sprite,
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
  var action= cc.repeatForever(cc.rotateBy(3.0, 360));
  this.wait.node.runAction(action);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
