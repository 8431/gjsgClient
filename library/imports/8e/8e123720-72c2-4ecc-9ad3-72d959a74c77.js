'use strict';

/**
 *  气血=成长*等级*（体质点+气血初值*0.8）
 *  精力=成长*等级（智力点+精力初值*0.8）
 *  攻击=(等级*成长*攻击初值)/7+攻击初值*成长*0.5+等级*成长*力量点*0.2
 *  速度=成长*（速度初值+敏捷点）
 *
 *  点数分为。。体质，敏捷，智力，力量
 *  加点的话，只改变速度，气血，精力，攻击
 *
 */

var self;
var PropertyType = cc.Enum({
    TiZhi: 1, //体质
    ZhiLi: 2, //智力
    LiLiang: 3, //力量
    MinJie: 4 //敏捷
    // 体质: 1,
    // 智力: 2,
    // 力量: 3,
    // 敏捷: 4,
});

cc.Class({
    extends: cc.Component,

    properties: {
        totalPointsLabel: cc.Label,
        fangyuValueLabel: cc.Label,

        tizhiMng: cc.Node,
        zhiliMng: cc.Node,
        liliangMng: cc.Node,
        minjieMng: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.tizhiMng = self.tizhiMng.getComponent('PropertyPoints');
        self.zhiliMng = self.zhiliMng.getComponent('PropertyPoints');
        self.liliangMng = self.liliangMng.getComponent('PropertyPoints');
        self.minjieMng = self.minjieMng.getComponent('PropertyPoints');
        this.init();
        //var data = { 'id': propCheckId };
        // ajaxData(HxsgUrl.propertyUrl, data, self.ajaxCallback);
    },

    /**
     * 根据数据初始化场景页面
     * @param msg
     */
    init: function init() {
        //数据赋值
        var msg = fujiang.fjmsg;
        self.msg = msg;
        self.totalPoints = msg.keyongds;
        self.remainPoints = self.totalPoints;
        self.chengzhang = msg.chengzhang;
        self.Lv = msg.level; //等级
        self.fangyu = msg.chufang; //防御值
        self.qixueInitValue = msg.chuxue;
        self.jingliInitValue = msg.chujing;
        self.gongjiInitValue = msg.chugong;
        self.suduInitValue = msg.chusu;

        //Label赋值
        self.totalPointsLabel.string = self.totalPoints;
        self.fangyuValueLabel.string = 0;
        self.tizhiMng.initData(msg.qiXue2, msg.qixueds);
        self.zhiliMng.initData(msg.jingLi2, msg.jinglids);
        self.liliangMng.initData(msg.gongJi, msg.gongJids);
        self.minjieMng.initData(msg.suDu, msg.sududs);
    },

    /**
     * 重置场景页面
     */
    reset: function reset() {
        self.init(self.msg);

        //重置各个属性
        self.tizhiMng.resetProp();
        self.zhiliMng.resetProp();
        self.liliangMng.resetProp();
        self.minjieMng.resetProp();
    },

    /**
     * 提交更改
     */
    updatePoints: function updatePoints() {
        showAlert('确认提交当前属性点分配吗？', function () {
            var data = {
                id: self.msg.id,
                keyongds: self.remainPoints,
                qiXue2: self.tizhiMng.propValue,
                qixueds: self.tizhiMng.propTotal,
                jingLi2: self.zhiliMng.propValue,
                jinglids: self.zhiliMng.propTotal,
                gongJi: self.liliangMng.propValue,
                gongJids: self.liliangMng.propTotal,
                suDu: self.minjieMng.propValue,
                sududs: self.minjieMng.propTotal
            };
            cc.log(data);
            ajaxUtils(HxsgUrl.propertyUpdateUrl, data);
        }, null);
    },

    /**
     * 按钮点击后做属性点检查
     */
    onButtonEvent: function onButtonEvent() {

        self.tizhiMng.buttonInteraction();
        self.zhiliMng.buttonInteraction();
        self.liliangMng.buttonInteraction();
        self.minjieMng.buttonInteraction();
    },

    /**
     * 计算操作后的剩余属性点的值
     * @param count
     */
    changeRemainPoints: function changeRemainPoints(count) {
        this.remainPoints -= count;
        if (this.remainPoints < 0) this.remainPoints = 0;
        this.totalPointsLabel.string = this.remainPoints;
    },

    /**
     * 计算各个属性的属性值
     * @returns {Number}
     */
    getQixue: function getQixue(tizhiPoints) {
        return parseInt(self.chengzhang * self.Lv * (tizhiPoints + self.qixueInitValue * 0.8));
    },
    getJingli: function getJingli(zhiliPoints) {
        return parseInt(self.chengzhang * self.Lv * (zhiliPoints + self.jingliInitValue * 0.8));
    },
    getGongji: function getGongji(liliangPoints) {
        return parseInt(self.Lv * self.chengzhang * self.gongjiInitValue / 7 + self.gongjiInitValue * self.chengzhang * 0.5 + self.Lv * self.chengzhang * liliangPoints * 0.2);
    },
    getSudu: function getSudu(minjiePoints) {
        return parseInt(self.chengzhang * (self.suduInitValue + minjiePoints));
    },

    /**
     * 根据属性点计算属性的属性值
     * @param propType
     * @param propPoints
     * @returns {boolean}
     */
    getPropValue: function getPropValue(propType, propPoints) {
        var propValue = 0;
        switch (propType) {
            case PropertyType.TiZhi:
                propValue = this.getQixue(propPoints);
                break;
            case PropertyType.ZhiLi:
                propValue = this.getJingli(propPoints);
                break;
            case PropertyType.LiLiang:
                propValue = this.getGongji(propPoints);
                break;
            case PropertyType.MinJie:
                propValue = this.getSudu(propPoints);
                break;
            default:
                break;
        }
        return propValue;
    },

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.propertyDeal);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});