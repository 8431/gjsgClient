cc.Class({
    extends: cc.Component,

    properties: {
       richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button,
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
    /**
     *跳转到好友详情界面 
     */
    friendInfo:function(event){
     cc.log('跳转到好友详情界面')
        var node = event.target;
         var r=node.getComponent( cc.RichText);
        cc.log(r.id)
        roleMsg.id=r.id.id;
       //  cc.log("跳转到好友详情界面:"+msg.friendName)
       loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends)
    },
    initFriendsList: function (index, type, data) {


         var num=0;
        this.node.name = type + index;
        this.type = type;
        this.data = data;
       // this.event = event;
         var richString;
         
        var btn=this.selectBn.id={'id':data.id,'name':data.rolename};
      
        //cc.log(btn+btn2);
         if(data.status=='离线'){
                   richString = '<color=#918E83 click="friendInfo">' + data.rolename + '【离线】</c> ';
                }else{
                    num=1;
                       richString = '<color=#FFFF00 click="friendInfo">' + data.rolename + '</c><color=#FF0000 click="friendInfo">【在线】</c> ' ;
                }
         this.richLabel.string = richString;
        this.richLabel.id=data;
        return num;
     
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
