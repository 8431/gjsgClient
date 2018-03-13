'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        leftContent: cc.Node,
        touxiang: cc.Sprite,
        juesename: cc.Label,
        nameBtn: cc.Button,
        zhiye: cc.Label,
        chenghao: cc.Label,
        jingyan: cc.Label,
        touxiangBtn: cc.Button,
        sjxiaolv: cc.Label,
        vip: cc.Label,
        tilizhi: cc.Label,
        qian: cc.Label,
        bindqian: cc.Label,
        huolizhi: cc.Label,
        successBtn: cc.Button,
        tanwei: cc.Label,
        juzhudi: cc.Label,
        house: cc.Label,
        jiaopai: cc.Label,
        peiou: cc.Label,
        skillBtn: cc.Button,
        shuxing: cc.Label,
        fenpeiBtn: cc.Button,
        chakanBtn: cc.Button,
        qixue: cc.Label,
        jingli: cc.Label,
        gongji: cc.Label,
        sudu: cc.Label,
        fangyu: cc.Label,
        fuzhong: cc.Label,
        info: cc.Label,
        infoBtn: cc.Button,
        fightingBtn: cc.Button,
        allLifeBtn: cc.Button,
        xinggeBtn: cc.Button,
        zuoqi: cc.Label,
        zuoqiBtn: cc.Button,
        fujiang: cc.Label,
        tianfu: cc.Label,
        videoBtn: cc.Button,
        videoToggleBtn: cc.Button,
        labelCount: 22,
        btnCount: 9
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        ajaxData(HxsgUrl.roleMsgUrl, null, function (msg) {
            self.initRoleDetails(msg);
        });
    },

    addChildTest: function addChildTest() {
        this.juesename.node.parent.removeFromParent();
        this.nameBtn.node.removeFromParent();

        this.leftContent.addChild(this.juesename.node.parent);
        this.leftContent.addChild(this.nameBtn.node);

        this.juesename.node.parent.setSiblingIndex(this.touxiangBtn.node.getSiblingIndex() + 1);
        this.nameBtn.node.setSiblingIndex(this.touxiangBtn.node.getSiblingIndex() + 2);

        this.content.height = this.labelCount * 50 + this.btnCount * 65;
    },

    initRoleDetails: function initRoleDetails(msg) {
        if (msg.roleMsg == undefined || msg.roleMsg == null) return;

        this.content.active = true;
        this.roleMsg = msg.roleMsg;
        var role = msg.roleMsg;

        //加载头像
        // cc.loader.loadRes()
        //头像
        var headName = role.img;
        headName = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        var headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(headUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.touxiang.spriteFrame = spriteFrame;
            }
        });

        //角色名
        this.juesename.string = role.rolename;
        //职业
        this.zhiye.string = role.zhiye;
        //等级
        this.dengji = role.level;

        //称号
        this.chenghao.string = role.chenghao;
        //升级所需经验
        this.jingyan.string = '需' + role.jingyan + '经验';
        //升级效率
        this.sjxiaolv.string = role.shengjixiaolv;
        //VIP
        this.vip.string = '';
        //体力值
        this.tilizhi.string = role.tilizhi;
        //钱
        var jin = role.jin;
        var yin = role.yin;
        this.qian.string = jin + '金' + yin + '银';
        //绑定银
        this.bindqian.string = '';
        //活力值
        this.huolizhi.string = 100;
        //摊位
        this.tanwei.string = "无";
        //居住地
        this.juzhudi.string = "无";
        //房产
        this.house.string = "无";
        //教派
        this.jiaopai.string = "无";
        //配偶
        this.peiou.string = "无";
        //属性
        var shuxingValue = role.keyongds > 0 ? true : false;
        cc.log(shuxingValue);
        this.fenpeiBtn.active = shuxingValue;
        this.chakanBtn.active = !shuxingValue;
        this.shuxing.string = role.keyongds;
        //气血
        var qixue1 = role.totalxue1;
        var qixue2 = role.totalxue2;
        this.qixue.string = qixue1 + '/' + qixue2;
        //精力
        var jingli1 = role.totaljing1;
        var jingli2 = role.totaljing2;
        this.jingli.string = jingli1 + '/' + jingli2;
        //攻击
        this.gongji.string = role.totalgong;
        //速度
        this.sudu.string = role.totalsudu;
        //防御
        this.fangyu.string = "无";
        // //负重
        // this.fuzhong.string = role.fuzhong1 + '/'+ role.fuzhong2;
        //个人信息
        this.info.string = '';
        this.infoBtn.interactable = false;
        //坐骑
        this.zuoqi.string = role.zuoji ? role.zuoji : '';
        this.zuoqiBtn.interactable = role.zuoji ? true : false;
        //副将
        var fj = role.fuLi;
        var fjName = "";
        for (var i = 0; i < fj.length; i++) {
            fjName += "(" + fj[i].fujiangname + ")";
        }
        this.fujiang.string = fjName;
        //天赋
        this.tianfu.string = '';
    },

    nickEvent: function nickEvent() {},

    headEvent: function headEvent() {},

    achievementEvent: function achievementEvent() {},

    skileEvent: function skileEvent() {},

    propertyCheckEvent: function propertyCheckEvent() {
        propCheckId = this.roleMsg.id;
        loadScene(HxsgScenes.propertyCheck, HxsgScenes.role);
    },

    propertyDealEvent: function propertyDealEvent() {
        propCheckId = this.roleMsg.id;
        loadScene(HxsgScenes.propertyDeal, HxsgScenes.role);
    },

    personInfoEvent: function personInfoEvent() {},

    fightingEvent: function fightingEvent() {},

    lifeEvent: function lifeEvent() {},

    characterEvent: function characterEvent() {},

    mountEvent: function mountEvent() {},

    videoEvent: function videoEvent() {},

    videoToggleEvent: function videoToggleEvent() {},

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.role);
    }
});