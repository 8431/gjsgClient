"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {},

    initChatMsgItem: function initChatMsgItem(index, type, data, event) {

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
        var richString;
        var time = data.data;
        var d = new Date(time);
        var hh = d.getHours();
        var mm = d.getMinutes();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (hh < 10) {
            hh = "0" + hh;
        }
        var times = hh + ":" + mm;
        if (myFriends.friendid == data.roleid) {
            richString = times + '<color=#FF0000 click="zawuRichTextEvent">' + data.rolename + ":<c><color=#FAF9F9 >" + data.message + '</c>';
        } else {
            richString = times + '<color=#00B30F click="zawuRichTextEvent">' + data.rolename + ':<c><color=#FAF9F9>' + data.message + '</c>';
        }

        this.richLabel.string = richString;
    }

});