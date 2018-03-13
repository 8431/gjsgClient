cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node,
        leftContent: cc.Node,

    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        ajax({
            type: 'GET',
            url: "" + localhost + "cocos2dNotis/querySystemNotis",
            dataType: 'jsonp',

            jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
            success: function (msg) {
                var p = msg.msg;
                //alert(p);
                for (var i = 0; i < p.length; i++) {
                    //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                    var item = cc.instantiate(self.itemPrefab);
                    self.leftContent.addChild(item);
                    item.x = 0;
                    item.y = -1 * i * item.height;
                    item.name = 'history' + i;
                    self.content.height = (i + 1) * item.height;

                    item = item.getComponent('systemNotice');
                    var labelStr = "<color=#ff0000>新 </c><color=#ffffff>"+p[i].custom1+"</color>";
                    cc.log(labelStr)
                    item.setMsg(labelStr);
                }

            }
        });
    },
});
