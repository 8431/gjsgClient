'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        nameLabel: cc.Label,
        levelLabel: cc.Label,
        xiaoguoLabel: cc.Label,
        jieshaoLabel: cc.Label,
        photo: cc.Sprite
    },

    // use self for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.initDetail();
        //curItemData
        ajaxData(HxsgUrl.baoshiItemUrl, { 'id': '315' }, self.initDetail);
    },

    initDetail: function initDetail(data) {
        if (data === undefined || data === null) {
            self.titleLabel.string = '';
            self.nameLabel.string = '';
            self.levelLabel.string = '';
            self.xiaoguoLabel.string = '';
            self.jieshaoLabel.string = '';
            self.photo.spriteFrame = null;
        } else {
            var msg = data.msg;
            self.titleLabel.string = msg.zwName;
            self.nameLabel.string = msg.zwName;
            self.levelLabel.string = msg.zwLevel;
            self.xiaoguoLabel.string = msg.zwXiaoGuo;
            self.jieshaoLabel.string = msg.zwMiaoShu;
            if (msg.zwUrl) {
                cc.loader.loadRes(msg.zwUrl, cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        self.photo.spriteFrame = tex;
                    }
                });
            }
            //Label因为内容修改height发生改变时，layout组件不会自动更新，可使用对组件所在节点height进行设置激活layout组件自动更新
            self.nameLabel.node.parent.height += 1;
        }
    },

    backEvent: function backEvent() {
        curItemData = null;
        returnLastScene(HxsgScenes.baoshi);
    }

    // called every frame, uncomment self function to activate update callback
    // update: function (dt) {

    // },
});