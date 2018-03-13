'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        bangItem: cc.Prefab,
        content: cc.Node,
        title: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        self.title.string = ChiBiVo.title;
        ajaxData(ChiBiVo.url, null, this.loading);
    },
    loading: function loading(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        if (msg == '' || typeof msg == 'undefined' || msg.length == 0) {
            showAlert("系统没有该信息！");
        } else {
            self.content.removeAllChildren();
            self.content.height = msg.length * 100;
            for (var i = 0; i < msg.length; i++) {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.bangItem);

                self.content.addChild(item);
                var comp = item.getComponent('bangItem');
                if (ChiBiVo.title == "历史查询") {
                    comp.setMsg("第" + msg[i].id + "期赤壁斗" + msg[i].resut + "胜利");
                }
                if (ChiBiVo.title == "战利品排行") {
                    comp.setMsg("<color=#F19CC5>" + msg[i].rolename + "</c>" + msg[i].jin + "金" + msg[i].yin + "银");
                }
                if (ChiBiVo.title == "声援记录") {
                    var m = "";
                    if (msg[i].jieguo == null || typeof msg[i].jieguo == 'undefined') {
                        m = "待定";
                    } else {
                        m = msg[i].jieguo;
                    }
                    comp.setMsg("第" + msg[i].num + "期赤壁斗，增援" + msg[i].result + "军" + msg[i].jin + "金" + msg[i].yin + "银【" + m + "】");
                }
                if (ChiBiVo.title == "奖励排行") {
                    comp.setMsg("<color=#F19CC5>" + msg[i].rolename + "</c>" + msg[i].jin + "金" + msg[i].yin + "银");
                }
                // comp.selectBn.node.on("click",self.skillList,self)
            }
        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        returnLast();
    }
});