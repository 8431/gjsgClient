window.curItemData = null;
window.currentWupin = 0;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        chatMsg: cc.Prefab,
        content: cc.Node,
        title: cc.RichText,
         msg:cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
       
           self = this;
           for (var i = 0; i <20; i++) {
            var item = cc.instantiate(self.chatMsg);
            self.content.addChild(item);
        }
        cc.view.setDesignResolutionSize(720,1080,2);
         SocketEvents.updataFriendsMsg=this.initFriendsMsg;
        //cc.log(myFriends)
        ajaxData(HxsgUrl.chatRecord,myFriends,this.initChatMsg);

    },
 /**
     * 点击事件-->快速恢复
     */
    sendMsg: function () {
      
        
         var msessage=this.msg.getComponent(cc.EditBox).string;
         myFriends.message=msessage;
         ajaxData(HxsgUrl.sendMsgForFriends,myFriends,this.initSendMsg);
         
          //cc.log(msessage);
    },
   initSendMsg: function (data) {
         
        var msg = data.msg;
        //cc.log(msg)
            var itemMsg = msg;
            if(itemMsg===''||typeof(itemMsg)==='undefined'){
                    cc.log("返回null")
            }else{
             var item = cc.instantiate(self.chatMsg);
     
            // frist.zIndex=0;
              
               //self.content.children[0].zIndex=0;
               
            //  var li=self.content.children;
            
            self.content.addChild(item);
            //  for(var i=0;i<li.length;i++){
            //       cc.log('index'+i+':'+li[i].zIndex)
            //  }
         cc.log( self.content)
                var comp = item.getComponent('chatMsgItem');
            comp.initChatMsgItem(self.content.height, 'friends', itemMsg);
        self.content.height+=50;
            }
        
         //cc.log(item)
    },
    initFriendsMsg: function (data) {
            var itemMsg = data;
             // cc.log(itemMsg)
            var item = cc.instantiate(self.chatMsg);
            self.content.addChild(item);
        // cc.log( self.content)
                var comp = item.getComponent('chatMsgItem');
            comp.initChatMsgItem(self.content.height, 'friends', itemMsg);
        self.content.height+=50;
        // cc.log(item)
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function () {
        //调用通用的返回上一场景方法
        returnLastScene();

    },


    initChatMsg: function (data) {
        //self.content.removeAllChildren();
        var msg = data.msg
        var len=msg.length-1;
       // cc.log(msg)
        var items = self.content.children;
        for (var i = 19; i >=0; i--) {
            var item =items[i];
            var comp = item.getComponent('chatMsgItem');
             var itemMsg = msg[len];
             len--;
            comp.initChatMsgItem(i, 'friends', itemMsg);
        }
        self.title.string='<color=#00ff00>与【'+myFriends.friendname+'】聊天</c>';
        self.content.height = msg.length * 50;
    },

   

    zawuItemEvent: function(data){
        //TODO:
    },

    clearScrollview: function () {
        this.content.removeAllChildren();
    },

});
