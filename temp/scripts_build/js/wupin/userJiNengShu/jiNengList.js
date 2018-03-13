"use strict";
cc._RFpush(module, '90e351eGlNKbpxW2m7Aw6IU', 'jiNengList');
// js\wupin\userJiNengShu\jiNengList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Prefab
        },
        leftContent: cc.Node,
        content: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajax({
            type: 'GET',
            // url: "" + localhost + "gchang/applishi",
            url: "http://192.168.130.18:8080/cocos2dWuPin/getJiNengShuList?id=98",
            dataType: 'jsonp',
            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数
            success: function success(msg) {
                var p = msg.msg;
                //alert(p);
                for (var i = 0; i < p.length; i++) {
                    var item = cc.instantiate(self.target);
                    self.content.addChild(item);
                    item.x = 1;
                    item.y = -1 * i * item.height;
                    item.name = 'userList' + i;
                    self.leftContent.height = (i + 1) * item.height + 20;

                    var lab = item.getComponent("wuPinList");

                    lab.msg.string = p[i].rolename + "(" + p[i].fulevel + "级)";
                    // lab.id.string=p[i].rfid;
                    if (i % 2 != 0) {
                        item.color = new cc.Color(0, 0, 49);
                        console.log(item.color);
                        //lab.Node.Color="WHITE";
                    }
                    lab.selectBn.name = 'button' + i;
                    // var clickEventHandler = new cc.Component.EventHandler();
                    // clickEventHandler.target = lab.selectBn.node; //这个 node 节点是你的事件处理代码组件所属的节点
                    // clickEventHandler.component ='button0';
                    // clickEventHandler.handler = "skillList";
                    // clickEventHandler.customEventData =p[i].id;
                    //wuPin.jinengList="10311"
                    //lab.selectBn.id.string=p[i].rfid
                    var bn = lab.selectBn.getComponent("jiNengButton");
                    bn.id = p[i].rfid;
                    // lab.selectBn.setId(new cc.Label())
                    lab.selectBn.node.on('click', self.skillList, self);
                    //lab.selectBn.clickEvents.push(clickEventHandler);
                    // console.log (bn.id)
                    // console.log(p[i].id)
                    //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                    // var item = cc.instantiate(self.itemPrefab);
                    // self.leftContent.addChild(item);
                    // item.x = 0;
                    // item.y = -1 * i * item.height;
                    // item.name = 'history' + i;
                    // self.content.height = (i + 1) * item.height;

                    // item = item.getComponent('HistoryItem');
                    // var labelStr = "第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "\t\t" + p[i].result;
                    // item.setMsg(labelStr);
                }
            }
        });
    },
    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;
        var bn = node.getComponent("jiNengButton");
        var button = node.getComponent(cc.Button);
        window.wuPin.jinengList = bn.id;
        console.log(bn.id);
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
});

cc._RFpop();