"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        richText: cc.RichText
    },

    init: function init(data, id) {
        if (this.node.name === "zhuanqianItem") {
            var str = "<color=#ff9e00>【" + data.rolename + "】</c>";
            if (typeof data.jin != "undefined" && data.jin !== null && data.jin !== 0) {
                str += "<color=#ffffff>" + "(赢得" + data.jin.toString() + "金)" + "</color>";
            }
            if (typeof data.yin != "undefined" && data.yin !== null && data.yin !== 0) {
                str += "<color=#ffffff>" + "(赢得" + data.yin.toString() + "银)" + "</color>";
            }
            this.richText.string = str;
            this.id = id;
        } else {
            var str = "<color=#ff9e00>【" + data.rolename + "】</c>在第" + data.num + "期" + "";
            if (typeof data.jin != "undefined" && data.jin !== null && data.jin !== 0) {
                str += "<color=#ffffff>" + "(买" + data.result + "" + data.jin.toString() + "金)" + "</color>";
            }
            if (typeof data.yin != "undefined" && data.yin !== null && data.yin !== 0) {
                str += "<color=#ffffff>" + "(买" + data.result + "" + data.yin.toString() + "银)" + "</color>";
            }
            if (data.jieguo == '输') {
                str += "<color=#ffffff>" + "," + data.jieguo + "</color>";
            } else {
                str += "<color=#EDF715>" + "," + data.jieguo + "</color>";
            }

            this.richText.string = str;
            this.id = id;
        }
        if (id % 2 === 0) {
            this.node.color = new cc.Color(0, 0, 38);
        } else {
            this.node.color = new cc.Color(99, 65, 99);
        }
    },

    // use this for initialization
    onLoad: function onLoad() {}

});