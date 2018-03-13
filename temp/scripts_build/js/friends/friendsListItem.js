"use strict";
cc._RFpush(module, '69618wiQxZHS77HQ5Yt03E5', 'friendsListItem');
// js\friends\friendsListItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},
    /**
     *跳转到好友详情界面 
     */
    friendInfo: function friendInfo(event) {
        cc.log('跳转到好友详情界面');
        var node = event.target;
        var r = node.getComponent(cc.RichText);
        cc.log(r.id);
        roleMsg.id = r.id.id;
        //  cc.log("跳转到好友详情界面:"+msg.friendName)
        loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends);
    },
    initFriendsList: function initFriendsList(index, type, data) {

        var num = 0;
        this.node.name = type + index;
        this.type = type;
        this.data = data;
        // this.event = event;
        var richString;

        var btn = this.selectBn.id = { 'id': data.id, 'name': data.rolename };

        //cc.log(btn+btn2);
        if (data.status == '离线') {
            richString = '<color=#918E83 click="friendInfo">' + data.rolename + '【离线】</c> ';
        } else {
            num = 1;
            richString = '<color=#FFFF00 click="friendInfo">' + data.rolename + '</c><color=#FF0000 click="friendInfo">【在线】</c> ';
        }
        this.richLabel.string = richString;
        this.richLabel.id = data;
        return num;
    }

});

cc._RFpop();