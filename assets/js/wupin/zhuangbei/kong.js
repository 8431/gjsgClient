var self;
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
        self = this;
    },
    click: function (e, id) {
        if (cc.find('Canvas/zbBaoshi') != null) {
            cc.find('Canvas/zbBaoshi').destroy();
        }

        //空槽
        if (id == 1) {
            cc.log("宝石孔按钮: " + id)
        cc.loader.loadRes('prefabs/bs', cc.Prefab, function (err, prefab) {
                        if (!err) {
                        
                            var bsList = cc.instantiate(prefab);
                            cc.find('Canvas').addChild(bsList);
                          
                        }
                    });

        } else {
            cc.log("宝石孔按钮: " + id)
            cc.loader.loadRes('prefabs/zbBaoshi', cc.Prefab, function (err, prefab) {
                if (!err) {
                    cc.log(self)
                    cc.log(self.msgid)
                    var zbBaoshi = cc.instantiate(prefab);
                    cc.find('Canvas').addChild(zbBaoshi, 90);
                    zbBaoshi.setPositionX(30);
                    zbBaoshi.setPositionY(-10);
                }
            });

        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
