"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'loginCreateRole');
// js\login\loginCreateRole.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        inputName: {
            default: null,
            type: cc.EditBox
        },
        touxiang1: {
            default: null,
            type: cc.Sprite
        },
        touxiang2: {
            default: null,
            type: cc.Sprite
        },
        touxiang3: {
            default: null,
            type: cc.Sprite
        },
        txt: {
            default: null,
            type: cc.Label
        }
    },

    // 上传角色信息 创建角色
    uploadinfo: function uploadinfo() {
        var self = this;
        self.info.name = self.inputName.string;
        //cc.log("验证角色信息：",self.info);
        //cc.log("验证选中的头像：",eval("self.txFile.tx"+self.txFile.flag));
        var dataJson = { 'rolename': self.info.name };
        //cc.log("角色名验证\n准备创建角色");
        ajaxData(HxsgUrl.checkRole, dataJson, function (msg) {
            cc.log(msg);
            if (msg.code == "000") {
                switch (msg.data) {
                    case '000':
                        //var txurl = eval("self.txFile.tx"+self.txFile.flag);
                        var dataJson = {
                            "zhiye": self.info.job,
                            "rolename": self.info.name,
                            "sex": self.info.sex,
                            "img": self.txFile.tx,
                            "keys": uuidKey
                        };

                        cc.log("准备开始创建角色:", dataJson);
                        //此处需要丰富内容
                        ajaxData(HxsgUrl.createRole, dataJson, function (msg) {
                            cc.log(msg);
                            if (msg.code == "000") {
                                if (msg.data == '000') {
                                    cc.log("创建角色成功");
                                    loadScene(HxsgScenes.index, HxsgScenes.index);
                                } else {
                                    cc.log("创建角色失败");
                                    showAlert("创建角色失败");
                                }
                            } else {
                                showAlert("服务器异常");
                            }
                        });
                        //end
                        break;
                    case '001':
                        cc.log("角色名已存在或为空");
                        showAlert("角色名已存在或为空");
                        break;
                    default:
                        cc.log("发生未知错误");
                        showAlert("注册失败，未知错误：" + msg);
                        break;
                } //end switch
            } else {
                showAlert("服务器异常");
            }
        });
    },
    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.txt.string = "请输入您在游戏中的名称";

        //保存角色信息
        self.info = new Object();
        self.info.txUrl = 'resources/touxiang/';
        self.info.sex = "男";
        self.info.sex_flg = 0;
        self.info.job = "武士";
        self.info.job_flg = 0;
        self.info.name = '';

        //保存选中的头像路径    
        self.txFile = new Object();
        //self.txFile.flag = 1;
        //self.txFile.tx1 = '';
        //self.txFile.tx2 = '';
        self.txFile.tx = ''; //保存选中的头像

        /* 获取所有按钮组件 */
        self.buttons = self.node.getComponentsInChildren(cc.Button);
        self.nanButton = this.getComponentByNodeName("nan");
        self.nvButton = this.getComponentByNodeName("nv");
        self.wushiButton = this.getComponentByNodeName("wushi");
        self.wenrenButton = this.getComponentByNodeName("wenren");
        self.yishiButton = this.getComponentByNodeName("yishi");
        self.tx1Button = this.getComponentByNodeName("touxiang1");
        self.tx2Button = this.getComponentByNodeName("touxiang2");
        self.tx3Button = this.getComponentByNodeName("touxiang3");

        //获取头像按钮的精灵组件
        //cc.log(self.tx1Button.node.name);
        self.touxiang1 = self.tx1Button.node.getComponent(cc.Sprite);

        /* 初始化头像矩阵 */
        /*
            +----+------+-----+------+-----
            |    | 武士 | 文人 | 异士 |
            +----+-------------------------
            | 男 |      |      |     |
            +----+-------------------------
            | 女 |      |      |     |
            +----+---------------------------
         */
        self.txtable = new Array(new Array(), new Array());

        self.txtable[0][0] = [cc.url.raw(self.info.txUrl + 'wushi1.jpg'), cc.url.raw(self.info.txUrl + 'wushi2.jpg'), cc.url.raw(self.info.txUrl + 'wushi3.jpg')];
        self.txtable[0][1] = [cc.url.raw(self.info.txUrl + 'wenren1.jpg'), cc.url.raw(self.info.txUrl + 'wenren2.jpg'), cc.url.raw(self.info.txUrl + 'wenren3.jpg')];
        self.txtable[0][2] = [cc.url.raw(self.info.txUrl + 'yishi1.jpg'), cc.url.raw(self.info.txUrl + 'yishi2.jpg'), cc.url.raw(self.info.txUrl + 'yishi3.jpg')];

        self.txtable[1][0] = [cc.url.raw(self.info.txUrl + 'wushinv1.jpg'), cc.url.raw(self.info.txUrl + 'wushinv2.jpg'), cc.url.raw(self.info.txUrl + 'wushinv3.jpg')];
        self.txtable[1][1] = [cc.url.raw(self.info.txUrl + 'wenrennv1.jpg'), cc.url.raw(self.info.txUrl + 'wenrennv2.jpg'), cc.url.raw(self.info.txUrl + 'wenrennv3.jpg')];
        self.txtable[1][2] = [cc.url.raw(self.info.txUrl + 'yishinv1.jpg'), cc.url.raw(self.info.txUrl + 'yishinv2.jpg'), cc.url.raw(self.info.txUrl + 'yishinv3.jpg')];
        cc.log(self.txtable);
    },
    /* 通过node.name获取按钮 */
    getComponentByNodeName: function getComponentByNodeName(nodeName) {
        //cc.log(nodeName);
        //cc.log(typeName);
        for (var i = 0; i < this.buttons.length; i++) {
            var element = this.buttons[i];
            if (element.node.name === nodeName) {
                /* enableAutoGrayEffect==true，当 button 的 interactable 属性为 false 的时候
                会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰 */
                element.enableAutoGrayEffect = true;
                return element;
            }
        }

        return null;
    },

    // called every frame
    /*
    update: function (dt) {
        
    },
    */
    updatetx: function updatetx() {

        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        // 更新头像
        cc.log(self.txtable[sex_flg][job_flg][0]);
        cc.log(self.txtable[sex_flg][job_flg][1]);
        cc.log(self.txtable[sex_flg][job_flg][2]);

        self.touxiang1.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][0]);
        self.touxiang2.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][1]);
        self.touxiang3.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][2]);

        //self.touxiang1.spriteFrame.ensureLoadTexture();
        //调试代码
        /*
                var url = self.info.txUrl + "yishi1";  
                cc.loader.loadRes(self.txtable[sex_flg][job_flg][0], function (err, spriteFrame) {
                    if(!err && spriteFrame)
                    {
                        cc.log("dsds");
                    //var node = new cc.Node("New Sprite");
                    //var sprite = node.addComponent(cc.Sprite);
                    self.touxiang1.spriteFrame = spriteFrame;
                    self.touxiang2.spriteFrame = spriteFrame;
                    self.touxiang3.spriteFrame = spriteFrame;
                    //node.parent = self.node
                    //self.touxiang1.spriteFrame.ensureLoadTexture();
                    }
                    if (!spriteFrame)
                    {
                        cc.log(err);
                        cc.log("xxxx");
                    }
                });
        */
        //调试代码 end
    },
    //输入框回调
    inputCK: function inputCK() {
        var self = this;
        self.txt.string = "请输入您在游戏中的名称";
    },

    //男按钮
    nanButt: function nanButt() {
        var self = this;
        self.info.sex = "男";
        self.info.sex_flg = 0;
        self.txt.string = "请选择在游戏中角色的性别";

        self.nanButton.interactable = false;
        self.nvButton.interactable = true;

        self.updatetx();
    },
    //女按钮
    nvButt: function nvButt() {
        var self = this;
        self.info.sex = "女";
        self.info.sex_flg = 1;
        self.txt.string = "请选择在游戏中角色的性别";

        self.nvButton.interactable = false;
        self.nanButton.interactable = true;

        self.updatetx();
    },
    //武士
    wushiButt: function wushiButt() {
        var self = this;
        self.info.job = "武士";
        self.info.job_flg = 0;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = false;
        self.wenrenButton.interactable = true;
        self.yishiButton.interactable = true;

        self.updatetx();
    },
    //文人
    wenrenButt: function wenrenButt() {
        var self = this;
        self.info.job = "文人";
        self.info.job_flg = 1;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = true;
        self.wenrenButton.interactable = false;
        self.yishiButton.interactable = true;

        self.updatetx();
    },
    //异士
    yishiButt: function yishiButt() {
        var self = this;
        self.info.job = "异人";
        self.info.job_flg = 2;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = true;
        self.wenrenButton.interactable = true;
        self.yishiButton.interactable = false;

        self.updatetx();
    },
    //头像1选中
    tx1Butt: function tx1Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        // 更新头像
        cc.log(self.txtable[sex_flg][job_flg][0]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][0];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = false;
        self.tx2Button.interactable = true;
        self.tx3Button.interactable = true;
    },
    //头像2选中
    tx2Butt: function tx2Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        cc.log(self.txtable[sex_flg][job_flg][1]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][1];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = true;
        self.tx2Button.interactable = false;
        self.tx3Button.interactable = true;
    },
    //头像3选中
    tx3Butt: function tx3Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        cc.log(self.txtable[sex_flg][job_flg][2]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][2];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = true;
        self.tx2Button.interactable = true;
        self.tx3Button.interactable = false;
    }
});

cc._RFpop();