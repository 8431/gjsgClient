cc.Class({
    extends: cc.Component,
    properties: {
        attackName: cc.Label,
        type: cc.Label,
        xue: cc.Label,
        jing: cc.Label,
        su: cc.Label,

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
    setAttackName: function (name) {
        this.attackName.string = name;
    },
    setType: function (name) {
        this.type.string = name;
    },
    setXue: function (name) {
        this.xue.string = name;
    },
    setJing: function (name) {
        this.jing.string = name;
    },
    setsu: function (name) {
        this.su.string = name;
    },
    return: function () {
        let roleDetail = cc.find("Canvas/roleDetail");
        roleDetail.active = false;
        let zhiLing = cc.find("Canvas/zhiling");
        zhiLing.active = true;
        onloadJnZhiling(true);
        selectEnemy(null,pk.clickArrayLeft);
        pk.sureClick="";
        if(pk.pkyaostatus !="0"){
          pk.pkyaostatus = "0";
           selectEnemy( pk.clickArrayRight[0],pk.rightPlay);
        }
       

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
