'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaopinPrefab: cc.Prefab,
        content: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        ajaxData(HxsgUrl.queryFriends, userWuPin.objects, this.friendsList);
    },
    friendsList: function friendsList(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        var num = 0;
        if (msg == '' || typeof msg == 'undefined' || msg.length == 0) {
            showAlert("没有查到搜索信息！");
        } else {
            var total = msg.length;
            for (var i = 0; i < msg.length; i++) {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.yaopinPrefab);
                self.content.addChild(item);
                var comp = item.getComponentInChildren('friendsListItem');
                num += comp.initFriendsList(i, 'friends', itemMsg);
                // comp.selectBn.node.on("click",self.skillList,self)
            }
            self.content.height = msg.length * 65;
        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        returnLast();
    }
});