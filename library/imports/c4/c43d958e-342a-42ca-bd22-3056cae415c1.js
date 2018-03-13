'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        roleName: cc.Label,
        battle: cc.Sprite,
        battleList: {
            default: [],
            type: cc.SpriteFrame
        },
        img: cc.Sprite
    },
    onLoad: function onLoad() {
        self = this;
    },

    init: function init(msg) {
        this.roleName.string = msg.roleName;
        this.battle.spriteFrame = this.battleList[msg.num];
        this.id = msg;

        this.battle.node.on(cc.Node.EventType.TOUCH_START, this.alert, this);
    },
    alert: function alert(event) {
        if (this.id.num == 0) {
            pk.yeguai = this.id;
            loadingScene(HxsgScenes.pkWait, HxsgScenes.index);
        } else {
            if (this.id.roleName == '内测使者') {
                showAlert('你想领取每天的藏宝图大礼包吗？', this.succes);
                userWuPin.objets = this.id.roleName;
            } else {
                showAlert('可以找内测使者领取礼包哦');
            }
        }
    },
    succes: function succes() {
        ajaxData(HxsgUrl.giftPackage, { 'name': userWuPin.objets }, self.succesAlert);
    },
    succesAlert: function succesAlert(msg) {
        showAlert(msg.msg);
    }
});