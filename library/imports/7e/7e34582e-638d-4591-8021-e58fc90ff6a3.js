'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        page: {
            default: [],
            type: cc.Node
        },
        selectedFrame: {
            default: [],
            type: cc.SpriteFrame
        },
        unselectedFrame: {
            default: [],
            type: cc.SpriteFrame
        },
        menu: {
            default: [],
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        try {
            self = this;
            //0、人物，1、设施，2、移动，3、功能
            SocketEvents.updateRoleMsgEvent = this.yidongEvent;
            this.yidongEvent();
        } catch (e) {
            cc.log(e);
        }
    },

    renwuEvent: function renwuEvent() {
        try {
            cc.log('人物');
            if (this.curMenu === 0) return;
            this.switchMenu(0);
        } catch (e) {
            cc.log(e);
        }
    },

    sheshiEvent: function sheshiEvent() {
        try {
            cc.log('设施');

            if (this.curMenu === 1) return;
            this.switchMenu(1);
        } catch (e) {
            cc.log(e);
        }
    },

    yidongEvent: function yidongEvent() {
        try {
            cc.log('移动');

            if (this.curMenu === 2) return;
            var p = cc.find("Canvas/menuPanel/yidong");
            if (p.childrenCount <= 0) {
                cc.log('ajaxReturnData.objets' + ajaxReturnData.objets);
                self.initMap(indexHg.indexroleMsgUrl);
                //ajaxData(HxsgUrl.indexroleMsgUrl, null, self.initMap);
            }
            //点击按钮变换
            this.switchMenu(2);
        } catch (e) {
            cc.log(e);
        }
    },
    initMap: function initMap(msg) {
        try {

            ajaxReturnData.topCity = msg.roleMsg.zuobiao;
            cc.log(ajaxReturnData.topCity);
            if (pk.moveMsg != null && pk.moveMsg != "" && typeof pk.moveMsg != 'undefined') {
                self.initMove();
            } else {
                ajaxData(HxsgUrl.moveCity, { "centerCity": msg.roleMsg.zuobiao }, function (data) {
                    pk.moveMsg = data;
                    self.initMove();
                });
            }
            // ajaxData(HxsgUrl.moveCity, { "centerCity": msg.roleMsg.zuobiao }, self.initMove);
        } catch (e) {
            cc.log(e);
        }
    },

    gongneng: function gongneng() {
        try {
            cc.log('功能');
            if (this.curMenu === 3) return;
            this.switchMenu(3);
        } catch (e) {
            cc.log(e);
        }
    },

    switchMenu: function switchMenu(curMenu) {
        var bz = false;
        for (var key in self.page) {

            if (key == curMenu) {
                self.menu[key].spriteFrame = self.selectedFrame[key];
                self.page[key].active = true;
                if (ajaxReturnData.topCity.indexOf('宝石矿洞') >= 0 && key == 1) {
                    bz = false;
                    cc.find('Canvas/menuPanel/sheshi2').active = true;
                    cc.find('Canvas/menuPanel/sheshi').active = false;
                }
            } else {
                self.menu[key].spriteFrame = self.unselectedFrame[key];
                self.page[key].active = false;
            }
        }
        if (ajaxReturnData.topCity.indexOf('宝石矿洞') >= 0 && curMenu != 1) {

            cc.find('Canvas/menuPanel/sheshi2').active = false;
        }
    },
    clickCity: function clickCity(event) {
        try {
            var node = event.target;
            ajaxData(HxsgUrl.moveCity, { "centerCity": node.id }, function (data) {
                pk.moveMsg = data;
                self.initMove();
            });
        } catch (e) {
            cc.log(e);
        }
    },
    initMove: function initMove() {
        try {
            var msg = pk.moveMsg;
            var p = cc.find("Canvas/menuPanel/yidong");
            p.removeAllChildren();
            var rw = cc.find("Canvas/menuPanel/renwu");
            rw.removeAllChildren();
            var hd = cc.find("Canvas/nearbyPlayer/head");
            hd.removeAllChildren();
            var m = msg.map;
            var g = msg.guai;
            var n = msg.near;
            cc.find("Canvas/nearbyPlayer/label").getComponent("cc.Label").string = '更多(' + n.length + ')';
            ajaxReturnData.nearRole = n;
            //  self.addMovePrefab({'num':'0','name':m.nCity}); 
            cc.loader.loadRes('prefabs/move', cc.Prefab, function (err, prefab) {
                if (!err) {
                    //当前所在地
                    if (m.centerCity != '' && typeof m.centerCity != 'undefined') {
                        var result = false;
                        for (var city in mapArrays) {
                            if (m.centerCity == mapArrays[city]) {

                                result = true;
                                break;
                            };
                        }
                        cc.find('Canvas/menu/sheshi').getComponent("cc.Button").interactable = result;
                    }

                    //上
                    if (m.nCity != '' && typeof m.nCity != 'undefined') {
                        var movePrefab = cc.instantiate(prefab);
                        var moveJs = movePrefab.getComponent('move');
                        movePrefab.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab.id = m.nCity;
                        p.addChild(movePrefab);
                        moveJs.init({ 'num': '0', 'name': m.nCity });
                    }
                    //下
                    if (m.sCity != '' && typeof m.sCity != 'undefined') {
                        var movePrefab2 = cc.instantiate(prefab);
                        movePrefab2.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab2.id = m.sCity;
                        var moveJs2 = movePrefab2.getComponent('move');
                        moveJs2.init({ 'num': '1', 'name': m.sCity });
                        p.addChild(movePrefab2);
                    }
                    //左
                    if (m.wCity != '' && typeof m.wCity != 'undefined') {
                        var movePrefab3 = cc.instantiate(prefab);
                        var moveJs3 = movePrefab3.getComponent('move');

                        movePrefab3.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab3.id = m.wCity;
                        moveJs3.init({ 'num': '2', 'name': m.wCity });
                        p.addChild(movePrefab3);
                    }

                    //右
                    if (m.eCity != '' && typeof m.eCity != 'undefined') {
                        var movePrefab4 = cc.instantiate(prefab);
                        var moveJs4 = movePrefab4.getComponent('move');
                        movePrefab4.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab4.id = m.eCity;
                        moveJs4.init({ 'num': '3', 'name': m.eCity });
                        p.addChild(movePrefab4);
                    }
                    //中心
                    if (m.quyu != '' && typeof m.quyu != 'undefined') {
                        var movePrefab5 = cc.instantiate(prefab);
                        var moveJs5 = movePrefab5.getComponent('move');
                        movePrefab5.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        var centerCityName;
                        switch (m.quyu) {
                            case '徐州':
                                centerCityName = '下邳';
                                break;
                            case '淮南':
                                centerCityName = '寿春';
                                break;
                            case '豫州':
                                centerCityName = '许昌';
                                break;
                            case '南蛮':
                                centerCityName = '三江城';
                                break;
                            case '益州':
                                centerCityName = '成都';
                                break;
                            case '扬州':
                                centerCityName = '吴城';
                                break;
                            case '司隶':
                                centerCityName = '洛阳';
                                break;
                            case '兖州':
                                centerCityName = '陈留';
                                break;
                            case '荆州':
                                centerCityName = '江陵';
                                break;
                            case '荆北':
                                centerCityName = '新野';
                                break;

                            default:
                                centerCityName = '新手村';
                        }
                        movePrefab5.id = centerCityName;
                        moveJs5.init({ 'num': '4', 'name': '返回' + centerCityName });
                        p.addChild(movePrefab5);
                    }
                }
            });
            if (typeof g != 'undefined') {
                //人物预制
                cc.loader.loadRes('prefabs/rolePrefabs', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        cc.find('Canvas/menu/renwu').getComponent("cc.Button").enableAutoGrayEffect = true;
                        //怪1
                        if (g.guaiid1 != '' && typeof g.guaiid1 != 'undefined') {
                            cc.find('Canvas/menu/renwu').getComponent("cc.Button").interactable = true;
                            var gd1 = cc.instantiate(prefab);
                            var rolePrefabsJs1 = gd1.getComponent('rolePrefabs');
                            //gd1.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs1.id = g.guaiid1;
                            rw.addChild(gd1);
                            rolePrefabsJs1.init({ 'num': g.status, 'roleName': g.guaiid1, 'level': g.level });
                        } else {
                            //表示没有人物，所以替换人物按钮的图标，并禁止点击人物interactable=false;

                            cc.find('Canvas/menu/renwu').getComponent("cc.Button").interactable = false;
                        }
                        //怪2
                        if (g.guaiid2 != '' && typeof g.guaiid2 != 'undefined') {
                            var gd2 = cc.instantiate(prefab);
                            var rolePrefabsJs2 = gd2.getComponent('rolePrefabs');
                            //gd2.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs2.id = g.guaiid2;
                            rw.addChild(gd2);
                            rolePrefabsJs2.init({ 'num': g.status, 'roleName': g.guaiid2, 'level': g.level });
                        }
                        //怪3
                        if (g.guaiid3 != '' && typeof g.guaiid3 != 'undefined') {
                            var gd3 = cc.instantiate(prefab);
                            var rolePrefabsJs3 = gd3.getComponent('rolePrefabs');
                            // gd3.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs3.id = g.guaiid3;
                            rw.addChild(gd3);
                            rolePrefabsJs3.init({ 'num': g.status, 'roleName': g.guaiid3, 'level': g.level });
                        }
                        //怪4
                        if (g.guaiid4 != '' && typeof g.guaiid4 != 'undefined') {
                            var gd4 = cc.instantiate(prefab);
                            var rolePrefabsJs4 = gd4.getComponent('rolePrefabs');
                            //gd4.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs4.id = g.guaiid4;
                            rw.addChild(gd4);
                            rolePrefabsJs4.init({ 'num': g.status, 'roleName': g.guaiid4, 'level': g.level });
                        }
                    }
                });
            }

            //头部动画调用
            var top = cc.find("Canvas/top");
            //top.getComponent("cc.Label").string=m.centerCity;
            var TopManagerJs = top.getComponent('TopManager');
            TopManagerJs.setLabel(m.centerCity);
            ajaxReturnData.topCity = m.centerCity;
            TopManagerJs.play;
            self.switchMenu(0);
            //附近的玩家
            cc.loader.loadRes('prefabs/headItem', cc.Prefab, function (err, prefab) {
                cc.log('附近的玩家' + err);
                if (!err) {
                    var le;
                    if (n.length < 6 && n.length > 0) {
                        le = n.length;
                    } else if (n.length > 6) {
                        le = 6;
                    }
                    for (var i = 0; i < le; i++) {
                        var headItems = cc.instantiate(prefab);
                        var headItemJs = headItems.getComponent("headItem");
                        headItems.id = n[i];
                        headItems.on(cc.Node.EventType.TOUCH_START, self.clickHead, self);
                        hd.addChild(headItems);
                        var num = 0;
                        cc.log(n[i].zhiye);
                        cc.log(n[i].level);
                        switch (n[i].zhiye) {
                            case '武士':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 3;
                                    } else {
                                        num = 0;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 4;
                                    } else {
                                        num = 1;
                                    }
                                }
                                break;
                            case '异人':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 9;
                                    } else {
                                        num = 6;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 10;
                                    } else {
                                        num = 7;
                                    }
                                }
                                break;
                            case '文人':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 15;
                                    } else {
                                        num = 12;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 16;
                                    } else {
                                        num = 13;
                                    }
                                }
                                break;
                        }
                        cc.log('   headItemJs.init(num)---' + num);
                        headItemJs.init(num);
                    }
                }
            });
            if (g.guaiid1 == '' || typeof g.guaiid1 == 'undefined') {
                self.switchMenu(2);
            }
        } catch (e) {
            cc.log(e);
        }
    },
    roleDetail: function roleDetail(msg) {

        loadingScene(HxsgScenes.friendInfo, HxsgScenes.index);
    },
    clickHead: function clickHead(event) {
        var node = event.target;
        var m = node.id;
        var message = "玩家：" + m.level + m.zhiye + "     " + "【" + m.rolename + "】";
        myFriends.friendid = m.id;
        showAlert(message, self.roleDetail);
    }

});