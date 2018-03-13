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
  backEvent: function backEvent() {
    //调用通用的返回上一场景方法
    loadScene(HxsgScenes.wupin, HxsgScenes.index);
    curItemData = null;
  },
  onLoad: function onLoad() {
    var self = this;
    ajaxData(HxsgUrl.getXinFaFuJiang, userWuPin, function (msg) {
      var p = msg.msg;
      if (p == null || p == 'undefined' || p.length == 0) {
        showAlert('没有可以使用该心法书的副将');
      } else {
        for (var i = 0; i < p.length; i++) {
          var item = cc.instantiate(self.target);
          self.content.addChild(item);
          item.x = 1;
          item.y = -1 * i * item.height;
          item.name = 'userList' + i;
          self.leftContent.height = (i + 1) * item.height + 20;

          var lab = item.getComponent("wuPinList");

          lab.msg.string = p[i].fujiangname + "(" + p[i].leve + "级)";
          // lab.id.string=p[i].rfid;
          if (i % 2 !== 0) {
            item.color = new cc.Color(0, 0, 49);
            console.log(item.color);
            //lab.Node.Color="WHITE";
          }
          lab.selectBn.name = 'button' + i;
          //lab.selectBn.id.string=p[i].rfid
          var bn = lab.selectBn;
          bn.id = p[i].id;
          //userWuPin.fuId=p[i].id;
          // lab.selectBn.setId(new cc.Label())
          lab.selectBn.node.on('click', self.imputNum, self);
        }
      }
    });
  },
  skillList: function skillList(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点

    cc.director.loadScene('inputNum');
    //this.node.Scrollview.clearScrollview();
    //   this.cannons = [];
    //     this.cannons = this.node.getChildren();
    // this.node.getChildren()[3].clearScrollview()
    // console.log( this.node.getChildren()[3]) 
    console.log(userWuPin.fuId);
    var self = this;

    // console.log(bn.id)
  },
  imputNum: function imputNum(event) {
    var node = event.target;

    var button = node.getComponent(cc.Button);
    userWuPin.fuId = button.id;
    cc.director.loadScene('inputNum');
  }

});