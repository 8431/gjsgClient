var self;
cc.Class({
    extends: cc.Component,

    properties: {
        roleName:cc.Label,
        battle:cc.Sprite,
        battleList:{
            default: [],
            type: cc.SpriteFrame   
        },
        img:cc.Sprite,
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
        onLoad(){
            self=this;
    },
    init: function (msg) {
        this.roleName.string = msg.roleName;
        this.battle.spriteFrame = this.battleList[msg.num];
        this.id = msg;
         
        this.battle.node.on(cc.Node.EventType.TOUCH_START, this.alert, this);


    },
    alert: function (event) {
        if (this.id.num == 0) {
            pk.yeguai=this.id;
            loadingScene(HxsgScenes.pkWait,HxsgScenes.index);

        } else {
            if (this.id.roleName == '内测使者') {
                showAlert('你想领取每天的藏宝图大礼包吗？',this.succes);
                userWuPin.objets=this.id.roleName;
            } else {
                showAlert('可以找内测使者领取礼包哦')
            }

        }



    },
succes:function(){
    ajaxData(HxsgUrl.giftPackage,{'name':userWuPin.objets},self.succesAlert);


},
succesAlert:function(msg){
  showAlert(msg.msg);
},
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
