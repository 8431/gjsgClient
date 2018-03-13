var self;
cc.Class({
    extends: cc.Component,

    properties: {
            yaopinPrefab: cc.Prefab,
                 content: cc.Node,
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
         ajaxData(HxsgUrl.queryFriends,userWuPin.objects,this.friendsList);


    },
    friendsList: function (data) {
       // this.clearScrollview();
        var msg = data.msg
        cc.log(data)
        var num=0;
        if(msg==''||typeof(msg)=='undefined'||msg.length==0){
            showAlert("没有查到搜索信息！")
        }else{
        var total=msg.length;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.yaopinPrefab);
            self.content.addChild(item);
              var comp = item.getComponentInChildren('friendsListItem');
            num+=comp.initFriendsList(i, 'friends', itemMsg);
           // comp.selectBn.node.on("click",self.skillList,self)
        }
        self.content.height = msg.length * 65;
        }
       
    },
     /**
     * 点击事件-->返回
     */
    backEvent: function () {
     returnLast();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
