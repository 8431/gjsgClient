"use strict";
cc._RFpush(module, '7d27dshfGtIULnjPgEv+AFg', 'loadSelectRole');
// js\login\loadSelectRole.js

'use strict';

var id = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajax({
            type: 'GET',
            url: HxsgUrl.loadCreateRole,
            data: { "key": uuidKey },
            //jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
            success: function success(msg) {
                cc.log(uuidKey);
                msg = eval('(' + msg + ')');
                if (msg.code == "000") {

                    for (var j = 0; j < 3; j++) {
                        var item = cc.instantiate(self.itemPrefab);
                        item.x = 1;
                        item.y = 1 * j * item.height;

                        cc.find("Canvas/cotent").addChild(item);
                        var lab = item.getComponent("selectedRole");

                        lab.node.on(cc.Node.EventType.TOUCH_START, self.toIndex, self);
                        var p = msg.data;
                        if (p == null || p == "") {
                            lab.name = j;
                            item.name = 'item' + j;
                            lab.msg.string = "【空】";
                            lab.id.string = "";
                            lab.zhiye.string = "新建角色";
                        } else {
                            if (p[j] !== undefined && p[j] !== null) {
                                item.name = 'item' + p[j].id;
                                lab.name = p[j].id;
                                //将预制资源写入
                                lab.msg.string = p[j].rolename;
                                lab.id.string = "ID:" + p[j].id;
                                lab.zhiye.string = p[j].level + "级" + p[j].zhiye;

                                //lab.img.spriteFrame.setTexture("http://localhost:7456/res/raw-assets//resources/touxiang/wushi3.jpg");
                            } else {
                                lab.name = j;
                                item.name = 'item' + j;
                                lab.msg.string = "【空】";
                                lab.id.string = "";
                                lab.zhiye.string = "新建角色";
                            }
                        }

                        //点击事件

                    }
                } else {
                    showAlert("服务器异常");
                }
            }
        });
    },
    toIndex: function toIndex(event) {

        var node = event.target;

        var lab = node.getComponent("selectedRole");
        id = lab.name;
        //node.color=new cc.Color(230,21,21);
        var arr = node.parent.children;
        cc.log(id);
        for (var i = 0; i < arr.length; i++) {

            if (arr[i].name == "item" + id) {
                cc.log(arr[i].name.indexOf(id));
                arr[i].color = new cc.Color(240, 232, 232);
            } else {
                arr[i].color = new cc.Color(199, 135, 135);
            }
        }
        // node.parent.getChildByName("item1000").color=new cc.Color(230,21,21);
        cc.log(node.parent.getChildByName("item" + id));
        //  if(id<1000)
        // {
        //       cc.director.loadScene('createRole');
        //  }
        // cc.director.loadScene('inputNum');
    },
    game: function game() {
        if (id >= 1000) {
            ajaxData(HxsgUrl.selectRole, { 'id': id, "keys": uuidKey }, loadingScene('indexhg'));
        } else {

            loadingScene('createRole');
        }
    }
});

cc._RFpop();