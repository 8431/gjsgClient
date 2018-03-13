"use strict";
cc._RFpush(module, 'b1a946mxvhBFbk/e+hnN4bE', 'Bank');
// js\bank\Bank.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        money_label: cc.Label
    },

    // 返回上一场景
    back: function back() {
        returnLast();
    },

    // 加载 银两取款 场景
    loadGetSilverScene: function loadGetSilverScene() {
        loadingScene('getSilver', 'bank');
    },

    // 加载 银两存款 场景
    loadSaveSilverScene: function loadSaveSilverScene() {
        loadingScene('saveSilver', 'bank');
    },

    // 加载 金砖取款 场景
    loadGetGoldScene: function loadGetGoldScene() {
        loadingScene('getGold', 'bank');
    },

    // 加载 金砖存款 场景
    loadSaveGoldScene: function loadSaveGoldScene() {
        loadingScene('saveGold', 'bank');
    },

    // 加载 求购金砖 场景
    loadBuyGoldScene: function loadBuyGoldScene() {
        loadingScene('buyGold', 'bank');
    },

    // 加载 出售金砖 场景
    loadSellGoldScene: function loadSellGoldScene() {
        loadingScene('sellGold', 'bank');
    },

    // 加载 订单记录 场景
    loadOrdersScene: function loadOrdersScene() {
        loadingScene('bankOrders', 'bank');
    },

    // 加载 金砖充值 场景
    loadRechargeGoldScene: function loadRechargeGoldScene() {
        loadingScene('rechargeGold', 'bank');
    },

    // 加载 查看金券 场景
    loadLookOverGoldCertificateScene: function loadLookOverGoldCertificateScene() {
        loadingScene('lookOverGoldCertificate', 'bank');
    },

    // 加载 金券充值 场景
    loadRechargeGoldCertificateScene: function loadRechargeGoldCertificateScene() {
        loadingScene('rechargeGoldCertificate', 'bank');
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.bankUrl, null, function (msg) {
            var money = msg.result; //拿到金银数据
            //存入全局变量
            Bank.bankGold = money.money.jin;
            Bank.bankSilver = money.money.yin;
            Bank.playerGold = money.role.jin;
            Bank.playerSilver = money.role.yin;

            self.money_label.string = "您目前有" + Bank.playerSilver + "两" + Bank.playerGold + "金砖";
        });
    }

});

cc._RFpop();