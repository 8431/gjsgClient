
var self;
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
    },
    backEvent: function () {
        cc.find("Canvas/zhiling").active = true;
        cc.log("初始化技能列表")
        cc.find("Canvas/jineng").active = false;


    },
    onloading: function (e, id) {
        cc.loader.loadRes('pk/yao', cc.Prefab, function (err, prefab) {
            if (!err) {
                self.contents.removeAllChildren();
                ajaxUtils(HxsgUrl.queryRoleYao, null, function (data) {
                    self.contents.height= data.length/2*80+80;
                    for (let i = 0; i < data.length; i++) {
                        let node = cc.instantiate(prefab);
                        let imgName = data[i].yaoid;
                        let path;
                        if (imgName <= 10) {
                            path = "qx/";
                        } else {
                            path = "jl/";
                        }
                    
                        var jnJs = node.getComponent("yao");
                        var sprite = node.getComponent('cc.Sprite');
                        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/yao/" +path+ imgName + ".png"));
                        //cc.log(sprite.spriteFrame)
                        jnJs.setNum(data[i].sum);
                        node.on('click', self.clickEvent, self);
                        node.id = data[i];
                        self.contents.addChild(node);
                    }

                });


            }
        });


    },
    clickEvent: function (event) {
        let node = event.target;
        let jn = node.id;
        cc.log('使用药品名称:' + node.id.skillname);
        cc.find("Canvas/wupin").active = false;
        let data = null;
        //道具的使用，后期需要增加，经军令
        pk.selectStatus = 2000;
        data = pk.clickArrayRight[0]
        onloadJnZhiling(false);
        console.log("选择指令完成")
        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.yaoname);

    }
});
