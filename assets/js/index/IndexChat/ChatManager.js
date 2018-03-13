//当前频道下标：0、区；1、派；2、商；3、世，
//注意：与num值不同，频道channel是以下标0开始
window.curChannel = 2;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        chatPreab: cc.Prefab,
        content: cc.Node,
        tipColor: cc.Color,      //新消息标识颜色/当前显示聊天页面的标题背景颜色
        btnbg: cc.Node,
        btnList: {
            default: [],
            type: cc.Button
        },
        labelList: {
            default: [],
            type: cc.Label
        },
        thisChannel: -1,        //保存本实例的频道，用于与全局频道值比较
        dataList: [],           //保存获取的聊天数据
        itemList: [],           //保存动态创建的聊天items
    },

    // use this for initialization
    onLoad: function () {
        self = this;
        self.updataMessageData();
        SocketEvents.updataChat = self.updateChannel;

        this.enemyPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.chatPreab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
        // var socket = new SocketHxsg('ddd');
        // socket.initWS();
    },

    onDestroy: function () {
        SocketEvents.updataChat = null;
    },

    test: function () {
        var data = {
            "id": 1198,
            "roleid": 1001,//游戏角色IDD
            "rolename": "awdawd",//角色名
            "message": "你是个好人！ <img src=\"f000\"/>",//信息
            "data": "Oct 10, 2016 2:00:12 PM"//时间
        }
        for (var i = 0; i < 3; i++) {
            this.createItem(data);
        }
    },

    /**
     * 获取/更新聊天数据
     */
    updataMessageData: function () {


        ajaxData(HxsgUrl.chatUrl, null, function (msg) {
            var totalMsg = msg.msg;
            for (var i = 0; i < totalMsg.length; i++) {
                var num = totalMsg[i][0];
                var keyMsg = totalMsg[i][1];
                self.dataList[num - 1] = keyMsg;
            }
            for (var i = 0; i < 20; i++) {
                var item = cc.instantiate(self.chatPreab);
                item.name = 'chat_' + i;
                self.content.addChild(item);
            }
            self.initChannel();
        })

        // $.ajax({
        //     type: 'GET',
        //     // url: "http://119.29.234.184:8080/hxsg/cocos2dIndex/chatMsg",//测试链接
        //     url: HxsgUrl.chatUrl,
        //     dataType: 'jsonp',
        //     jsonp: "jsonpCallback",
        //     success: function (msg) {
        //         //TODO:解析数据
        //         var totalMsg = msg.msg;
        //         for (var i = 0; i < totalMsg.length; i++) {
        //             var num = totalMsg[i][0];
        //             var keyMsg = totalMsg[i][1];
        //             self.dataList[num - 1] = keyMsg;
        //         }

        //         self.initChannel();
        //     },
        //     error: function () {
        //         cc.log('获取聊天信息数据失败');
        //     }
        // });
    },

    //--------------------聊天界面窗口管理
    /**
     * 初始化
     */
    initChannel: function () {
        //1、区；2、派；3、商；4、世
        //默认显示商
       // this.clearChat();
        for (var i = 0; i < 4; i++) {
            //动态绑定点击事件
            this.channelEvent(i);
        }
        this.changeChannel();
    },

    /**
     * 切换频道
     */
    changeChannel: function () {
        //设置新的频道，背景移动到新频道下
        if (this.thisChannel !== curChannel) {
            this.updateBtnBgColor(curChannel);
            this.thisChannel = curChannel;
        }
        self.createItem();
        // this.clearChat();



        // self.content.addChild(item);
    },

    /**
     * 更新频道背景颜色
     * 频道
     * 是否当前频道
     */
    updateBtnBgColor: function () {
        //移动背景
        var seq = cc.sequence(cc.moveTo(0.2, cc.p(this.btnList[curChannel].node.x, 0)).easing(cc.easeCubicActionOut(1)));
        this.btnbg.runAction(seq);
    },

    /**
     * 更新拼到文字颜色
     * 频道
     * 是否当前频道
     */
    updateBtnTextColor: function (channel, isCurrent) {
        this.labelList[channel].node.color = isCurrent ? cc.Color.WHITE : this.tipColor;
    },

    /**
     * 注册按钮点击事件
     */
    channelEvent: function (i) {
        var self = this;
        this.btnList[i].node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (curChannel === i) return;
            curChannel = i;
            self.labelList[i].node.color = cc.Color.WHITE;
            self.changeChannel();
            cc.log('click ' + curChannel);
        });
    },

    updateChannel: function (channel, keyMsg) {
        cc.log(keyMsg);
        if (curChannel === channel) {
            self.dataList[channel] = keyMsg;
            self.changeChannel(channel);
        }
        else {
            self.dataList[channel] = keyMsg;
            self.updateBtnTextColor(channel, false);
        }
    },

    //--------------------

    /**
     * 创建聊天item
     */
    createItem: function () {
        var items = self.content.children;
        cc.log( self.content.childrenCount) 
        self.clearChat();
        for (var i = 0; i < 20; i++) {
            var data = this.dataList[curChannel][i];
              //data=eval("("+data+")");
            if (data != "" && data != null && typeof (data) != 'undefined') {
                var item = items[i];
                //自适应分辨率设置宽度，留出两边的空白,左右各20
                var richText = item.getComponent(cc.RichText);
                richText.maxWidth = self.content.width - 40;
                var itemComp = item.getComponent('ChatLabelEvent');
                itemComp.setMsg(data);
            } else {
                break;
            }



        }
 
        

        // var self = this;

        // // var item = cc.instantiate(self.chatPreab);
        // var item = this.enemyPool.get();
        // item.name = 'chat_' + data.id;
        // //自适应分辨率设置宽度，留出两边的空白,左右各20
        // var richText = item.getComponent(cc.RichText);
        // richText.maxWidth = self.content.width - 40;

        // var itemComp = item.getComponent('ChatLabelEvent');
        // itemComp.setMsg(data);

        // self.content.addChild(item);
        // self.itemList.push(item);
    },

    /**
     *  清空聊天列表
     */
    clearChat: function () {
        // this.content.removeAllChildren();
        for (var i = 0; i < this.itemList.length; i++) {
            this.enemyPool.put(this.itemList[i]);
            // this.itemList[i].destroy();
        }
        this.itemList = [];
    }
});
