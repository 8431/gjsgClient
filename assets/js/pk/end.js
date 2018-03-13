cc.Class({
    extends: cc.Component,

    properties: {
        background:[cc.SpriteFrame],
        bankLose:[cc.SpriteFrame],

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
    gameOver:function(){
        
        let  JsonData=pk.gameOverDetail;
        let arrJy=JsonData.jy;
         let arrJyResult="";
        for(var key in arrJy){
            arrJyResult+=arrJy[key]
        }
         let arrDj=JsonData.djArr
        let result=".恭喜您获得";
        for(let i=0;i<arrDj.length;i++){
        result+="【"+arrDj[i].name+"】"
        }
         showAlert(arrJyResult+result,function(){  cc.director.loadScene(HxsgScenes.index)});
    
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
