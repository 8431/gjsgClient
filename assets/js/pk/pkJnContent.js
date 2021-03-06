
var self;
var pkWait = require("pkWait");
cc.Class({
    extends: cc.Component,

    properties: {
        contents: cc.Node,
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
        // this.onloading();
    },
    backEvent: function () {
        cc.find("Canvas/zhiling").active = true;
        cc.log("初始化技能列表")
        cc.find("Canvas/jineng").active = false;
    },
    onloading: function (e, id) {
        cc.loader.loadRes('pk/jnButton', cc.Prefab, function (err, prefab) {
            if (!err) {
                var p = getRoleMsg(pk.clickArrayRight[0], pk.player2)
                var jn = p.jineng;
                self.contents.removeAllChildren();
                var hPrefab = cc.instantiate(prefab);
                self.contents.height = jn.length * (hPrefab.height + 5);
                for (let i = 0; i < jn.length; i++) {
                    var jnPrefab = cc.instantiate(prefab);
                    var jnJs = jnPrefab.getComponent("jnName");
                    jnJs.setJname(jn[i].skillname);
                    jnPrefab.on('click', self.clickEvent, self);
                    jnPrefab.id = jn[i];
                    self.contents.addChild(jnPrefab);
                }
            }
        });
    },
    clickEvent: function (event) {
        var node = event.target;
        var jn = node.id;
        cc.log('技能名称:' + node.id.skillname);
        cc.find("Canvas/jineng").active = false;
        var data = null;
        //有些技能可以对自己或者队友释放
        switch (node.id.skillname) {
            case "气冲斗牛": {
                pk.selectStatus = 2000;
                data = pk.clickArrayRight[0]
                break;
            }
            default: {
                pk.selectStatus = 3000;
                data = pk.clickArrayLeft[0];
                break;
            }
        }


        onloadJnZhiling(false);
        console.log("选择指令完成")

        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.skillname);

    }
});
