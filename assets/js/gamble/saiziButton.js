var  times=3000;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        type: 3,
        gold: true,
        issend: 0,
        msg: cc.RichText,
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    sure: function () {
        loadingScene(HxsgScenes.guangChang, HxsgScenes.index);

    },
    times: function (msg) {
       times=msg.times;
        self.schedule(self.scheduleTime, 1);

    },
   scheduleTime: function () {
        DuChangVo.num=times;
        
            if (times == '0' || typeof (times) == 'undefined') {
                self.unschedule(self.scheduleTime);
                self.init();
                  var jiesuan=cc.find("Canvas/jiesuan");
                jiesuan.active=true;
               jiesuan.getComponent("jiesuan").setMsg("猜猜猜结算中，请稍后再来");     
                //showAlert("赌场结算中，请稍后再来", self.sure, self.sure);
              
            }
                var minutes = Math.floor(times / 1000 / 60 % 60); //所余分钟数  
                var second = Math.floor(times / 1000 % 60); //所余秒数  
                //1分58秒后开盅，买定离手
                var target = cc.find("Canvas/saizi/main/label2");
                var mstr = minutes.toString() + "分" + second.toString() + "秒后开蛊";
                target.getComponent("cc.Label").string = mstr;

               
           
         times=times-1000;
    

        },
    initMsg: function (msg) {
        var loadJson = msg.msg;
        cc.log('initMsg:-------')

        var baozijin = loadJson.baoZiJin;
        var baoziyin = loadJson.baoZiYin;

        var dajin = loadJson.daJin;
        var dayin = loadJson.daYin;

        var danjin = loadJson.danJin;
        var danyin = loadJson.danYin;

        var xiaojin = loadJson.xiaoJin;
        var xiaoyin = loadJson.xiaoYin;

        var shuangjin = loadJson.shuangJin;
        var shuangyin = loadJson.shuangYin;

        var lastId = loadJson.yldaxiao.id;
        var lastNum1 = loadJson.yldaxiao.num1;
        var lastNum2 = loadJson.yldaxiao.num2;
        var lastNum3 = loadJson.yldaxiao.num3;
        var lastResult = loadJson.yldaxiao.result;
        var lastStatus = loadJson.yldaxiao.status;

        var sumJin = loadJson.totalSumJin;
        var sumYin = loadJson.totalSumYin;
        var curstr;
        var curtarget;
        try {
            curstr = "上期" + lastId.toString() + "开" + lastNum1.toString() + " " +
                lastNum2.toString() + " " + lastNum3.toString() + " " + lastResult;
            curtarget = cc.find("Canvas/saizi/main/label1");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = "目前买小" + xiaojin.toString() + "金" + xiaoyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label3");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = "目前买大" + dajin.toString() + "金" + dayin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label4");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = "目前买单" + danjin.toString() + "金" + danyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label5");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = "目前买双" + shuangjin.toString() + "金" + shuangyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label6");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = "目前买豹子" + baozijin.toString() + "金" + baoziyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label7");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {
        }
        try {
            curstr = '<on click="handler">' + sumJin.toString() + '金' + sumYin.toString() + '银</on>';
            curtarget = cc.find("Canvas/saizi/msg");
            //   cc.log(curtarget)
            //   this.msg.string=curstr;
            curtarget.getComponent("cc.RichText").string = curstr;


        } catch (e) {
        }

    },
    init: function () {
        cc.log('init----------')
        ajaxData(HxsgUrl.queryCasinoMsg, null, self.initMsg);
    },
    // use this for initialization
    onLoad: function () {
        self = this;
        //alert(globalInfo.url());
             if( DuChangVo.num==='1000'){
                         cc.find("Canvas/jiesuan").active=true;
                       } else{
                           cc.find("Canvas/jiesuan").active=false;
                       }
        this.canceldialog(null);
         SocketEvents.dzMsg=function(){
         self.init();
        ajaxData(HxsgUrl.appsxtime, null, self.times)
        // 这里的 this 指向 component
         }
          this.init();
        ajaxData(HxsgUrl.appsxtime, null, this.times)


    },
    buttonChangeNormal: function (node) {
        node.color = new cc.Color(236, 13, 13);
    },
    handler: function (data) {
        cc.log('赢家')
        loadingScene(HxsgScenes.yingJia, HxsgScenes.saizi)
    },
    buttonChangeLight: function (node) {
        node.color = new cc.Color(236, 86, 0);
    },
    displaydialog: function () {
        cc.find("Canvas/saizi/dialog/dialog/msg").active = false;
        cc.find("Canvas/saizi/dialog/dialog/count").active = true;
        cc.find("Canvas/saizi/dialog/dialog/top").active = true;
        cc.find("Canvas/saizi/dialog/dialog/right").active = true;
        var topString = "您选择的是 ";
        switch (this.type) {
            case 1: topString += "大"; break;
            case 2: topString += "小"; break;
            case 3: topString += "豹子"; break;
            case 4: topString += "单"; break;
            case 5: topString += "双"; break;
        }
        var rightString = "";
        if (this.gold === true)
            rightString += "金";
        else
            rightString += "银";
        var dialog = cc.find("Canvas/saizi/dialog");
        var top = cc.find("Canvas/saizi/dialog/dialog/top");
        var right = cc.find("Canvas/saizi/dialog/dialog/right");
        top.getComponent("cc.Label").string = topString;
        right.getComponent("cc.Label").string = rightString;
        dialog.active = true;

    },
    goldtype: function (event) {
        var node = event.target;
        var typenode = node.parent;

        switch (typenode.name) {
            case "da": this.type = 1; break;
            case "xiao": this.type = 2; break;
            case "baozi": this.type = 3; break;
            case "dan": this.type = 4; break;
            case "shuang": this.type = 5; break;
        }
        if (node.name == "ying")
            this.gold = false;
        else
            this.gold = true;
        this.displaydialog();
    },

    okdialog: function (event) {
        var msgnode = cc.find("Canvas/saizi/dialog/dialog/msg");
        if (this.issend == 0) {
            msgnode.active = true;
            cc.find("Canvas/saizi/dialog/dialog/count").active = false;
            cc.find("Canvas/saizi/dialog/dialog/top").active = false;
            cc.find("Canvas/saizi/dialog/dialog/right").active = false;
            var count = parseInt(cc.find("Canvas/saizi/dialog/dialog/count").getComponent("cc.EditBox").string);
            if (count <= 0 || isNaN(count)) {
                msgnode.getComponent("cc.Label").string = "请输入正确的金额";
                this.issend = -1;
            }
            else {
                //msgnode.getComponent("cc.Label").string=count.toString();
                var result = "";

                switch (this.type) {
                    case 1: result = "大"; break;
                    case 2: result = "小"; break;
                    case 3: result = "豹子"; break;
                    case 4: result = "单"; break;
                    case 5: result = "双"; break;
                }
                var sdata;
                if (this.gold) {
                    sdata = {
                        'jin': count,
                        'result': result
                    };
                }
                else {
                    sdata = {
                        'yin': count,
                        'result': result
                    };
                }
                ajaxData(HxsgUrl.roleStakeResult,sdata,function (msg) {
                        msgnode.getComponent("cc.Label").string = msg.msg//返回消息
                    }
                );
                this.issend = 1;
            } 
        }
        else if (this.issend == 1) {
            msgnode.getComponent("cc.Label").string = "正在连接";
            this.canceldialog(event);
        }
        else {
            msgnode.getComponent("cc.Label").string = "正在连接";
            this.displaydialog();
            this.issend = 0;
        }
    },
    canceldialog: function (event) {
        cc.find("Canvas/saizi/dialog").active = false;
        this.issend = 0;
    },
    bottomMenu: function (event) {
        var node = event.target;
        switch (node.name) {
            case "touzhujilu": loadingScene(HxsgScenes.touzhujilu, HxsgScenes.saizi)
                break;
            case "zhuanqianpaihang": loadingScene(HxsgScenes.zhuanqianpaihang, HxsgScenes.saizi)
                break;
            case "lishichaxun": loadingScene(HxsgScenes.lishichaxun, HxsgScenes.saizi)
                break;

        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function () {
        //调用通用的返回上一场景方法
     returnLast();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
