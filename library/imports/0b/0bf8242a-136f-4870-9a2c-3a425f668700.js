"use strict";

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
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
        curItemData = null;
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.log(userWuPin.objects);
        var obj = userWuPin.objects;
        cc.log(obj);
        var title = cc.find("Canvas/title");
        var userTitle = cc.find("Canvas/book/userTitle");
        var xiaoGuo = cc.find("Canvas/result/xiaoGuo");
        title.getComponent('cc.Label').string = obj.name;
        userTitle.getComponent('cc.Label').string = '使用' + obj.name;
        var urls;
        switch (obj.type1) {
            case '技能':
                xiaoGuo.getComponent('cc.Label').string = '效果:可使玩家或者副将学习技能【' + obj.name + '】';
                urls = HxsgUrl.queryFuJiangJiNengBook;
                break;
            case '技能书':
                xiaoGuo.getComponent('cc.Label').string = '效果:可使玩家或者副将的' + obj.name + '的熟练度增加100';
                urls = HxsgUrl.jiNengShu;
                break;
        }

        var self = this;
        ajaxData(urls, { "id": userWuPin.wupinId }, function (msg) {
            var p = msg.msg;
            if (p.length === 0 || p.length === 'undefined') {
                showAlert('没有可以使用的对象');
                return;
            }
            //alert(p);
            for (var i = 0; i < p.length; i++) {
                var item = cc.instantiate(self.target);
                self.content.addChild(item);
                item.x = 1;
                item.y = -1 * i * item.height;
                item.name = 'userList' + i;
                self.leftContent.height = (i + 1) * item.height + 20;

                var lab = item.getComponent("wuPinList");

                // lab.id.string=p[i].rfid;
                if (i % 2 !== 0) {
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
                var bn = lab.selectBn;
                cc.log(p[i].rolename);
                cc.log(p[i].name);
                if (typeof p[i].rolename == 'undefined') {
                    bn.id = p[i].roleId;
                    lab.msg.string = p[i].name;
                    userWuPin.fuId = p[i].roleId;
                    lab.selectBn.node.on('click', self.showUserBook, self);
                }
                if (typeof p[i].name == 'undefined') {
                    bn.id = p[i].rfid;
                    userWuPin.fuId = p[i].rfid;
                    lab.msg.string = p[i].rolename + "(" + p[i].roleLevel + "级)";
                    lab.selectBn.node.on('click', self.skillList, self);
                }

                // lab.selectBn.setId(new cc.Label())

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
        });
    },
    returnWuPin: function returnWuPin() {
        cc.log("ccccccccc");
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },
    showUserBook: function showUserBook(event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        userWuPin.num = 1;
        userWuPin.id = button.id;
        ajaxData(HxsgUrl.userWuPin, userWuPin, this.tishi);
    },
    tishi: function tishi(msg) {
        showAlert(msg.msg, self.returnWuPin, self.returnWuPin);
    },

    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点


        //this.node.Scrollview.clearScrollview();
        //   this.cannons = [];
        //     this.cannons = this.node.getChildren();
        // this.node.getChildren()[3].clearScrollview()
        // console.log( this.node.getChildren()[3]) 
        var node = event.target;
        var button = node.getComponent(cc.Button);
        console.log(button.id);
        var self = this;
        ajaxData(HxsgUrl.userJiNengShu, { "id": userWuPin.wupinId, "status": button.id }, function (msg) {
            self.content.removeAllChildren();
            var p = msg.msg;
            for (var i = 0; i < p.length; i++) {
                var item = cc.instantiate(self.target);
                self.content.addChild(item);

                item.x = 1;
                item.y = -1 * i * item.height;
                item.name = 'userList' + i;
                self.leftContent.height = (i + 1) * item.height + 20;
                var lab = item.getComponent("wuPinList");
                lab.msg.string = p[i].skillname;
                var bn = lab.selectBn;
                bn.id = p[i].id;
                //userWuPin.jnId=p[i].id;
                console.log("技能ID" + bn.id);
                if (i % 2 !== 0) {
                    item.color = new cc.Color(0, 0, 49);
                    console.log(item.color);
                    //lab.Node.Color="WHITE";
                }
                lab.selectBn.name = 'button' + i;
                lab.selectBn.node.on('click', self.imputNum, self);
            }
        });
        // console.log(bn.id)
    },

    imputNum: function imputNum(event) {
        var node = event.target;

        var button = node.getComponent(cc.Button);

        userWuPin.jnId = button.id;
        cc.log(button.id);
        cc.director.loadScene('inputNum');
    }

});