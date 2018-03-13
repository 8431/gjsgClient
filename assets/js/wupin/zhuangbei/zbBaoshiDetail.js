var self;
var bsid;
var zbid;
cc.Class({
    extends: cc.Component,

    properties: {
        bsname: cc.Label,
        level: cc.Label,
        xiaoguo: cc.Label,
        jieshao: cc.RichText,
        img: cc.Sprite,
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
    click: function () {
        self.node.destroy();
    },
    init: function (data) {
        self.bsname.string = data.zwName;
        self.level.string = data.zwLevel;
        self.xiaoguo.string = data.zwXiaoGuo;
        self.jieshao.string = data.zwMiaoShu;
        bsid = data.id;
    },
    xqClick: function () {

        let param = { 'bsId': bsid, 'zbId': zhaungBeiDetailsZbid.id };
        ajaxData(HxsgUrl.mosaicGemtoZhuangBei, param, function (data) {
            cc.log(data)
            if (data.code = "000") {
                showAlert(data.data, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                }, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                });


            } else {
                showAlert("服务器崩溃了:" + data.message, function () { cc.director.loadScene(HxsgScenes.zhuangbei); }, function () { cc.director.loadScene(HxsgScenes.zhuangbei); });

            }

        });



    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
