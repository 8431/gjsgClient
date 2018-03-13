var self;
var playJs = require("playerItem");

/**
 * PK动画播放有限状态机
 */

var status;

// var pkStateMachine = new StateMachine({
//     data: {
//         battle: null,
//     },
//     transitions: [
//         { name: 'toStart', from: 'none', to: 'start' },
//         { name: 'toShifa', from: 'start', to: 'shifa' },
//         { name: 'toMoveBackGround', from: 'shifa', to: 'backgorund' },
//         { name: 'toSkill', from: 'backgorund', to: 'skill' },
//         { name: 'finshed', from: 'skill', to: 'end' },
//         { name: 'end', from: 'end', to: 'start' }
//     ],
//     methods: {
//         onToShifa() {



//         },
//         onToMoveBackGround() {

//         },

//         onToSkill() {

//         },

//         onFinshed() {

//         },
//         onEnd() {

//         },
//     }
// });
var pkWait = cc.Class({
    extends: cc.Component,

    properties: {
        playPrefab: cc.Prefab,
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

    // use this for initialization
    onLoad: function () {
        self = this;
        pkWait.load = this;
        var py = new playJs();
        var pkStateMachine = py.pkStateMachine;
        pkStateMachine.toStart();
        // this.back();
        //this.loading();
    },
    loading: function () {
        cc.find("Canvas/jineng").active = false;

        var result = {
            'player1': [
                {
                    'name': '黄月英',
                    'id': '1002',
                    'qixue': '2123',
                    'jingli': '21210',
                    'sudu': '1',
                    'jineng': [
                        {
                            'name': '舍命一击',
                            'type': '1',
                            'status': 'left'
                        },
                        {
                            'name': '力劈华山',
                            'type': '1',
                            'status': 'left'
                        },
                        {
                            'name': '气冲斗牛',
                            'type': '1',
                            'status': 'right'
                        }
                    ]
                },
                {
                    'name': '黄月英',
                    'id': '1003',
                    'qixue': '21210',
                    'jingli': '20',
                    'sudu': '1',
                    'jineng': [
                        {
                            'name': '五雷轰顶',
                            'type': '1',
                            'status': 'left'
                        }
                    ]
                },
                {
                    'name': '黄月英',
                    'id': '1004',
                    'qixue': '3130',
                    'jingli': '0',
                    'sudu': '1',
                },
                {
                    'name': '黄月英',
                    'id': '1005',
                    'qixue': '0',
                    'jingli': '0',
                    'sudu': '1',
                }
            ],
            'player2': [
                {
                    'name': '咕叽',
                    'id': '1032',
                    'qixue': '0',
                    'jingli': '0',
                    'sudu': '1',
                    'jineng': [
                        {
                            'name': '舍命一击',
                            'type': '1',
                            'status': 'left'
                        },
                        {
                            'name': '力劈华山',
                            'type': '1',
                            'status': 'left'
                        },
                        {
                            'name': '气冲斗牛',
                            'type': '1',
                            'status': 'right'
                        },

                    ]
                },
                {
                    'name': '黄月英',
                    'id': '10077',
                    'qixue': '21210',
                    'jingli': '20',
                    'sudu': '1',
                    'jineng': [
                        {
                            'name': '五雷轰顶',
                            'type': '1',
                            'status': 'left'
                        }
                    ]
                },
                {
                    'name': '舞女',
                    'id': '1062',
                    'qixue': '0',
                    'jingli': '0',
                    'sudu': '1',
                },
                {
                    'name': '舞女',
                    'id': '1006',
                    'qixue': '0',
                    'jingli': '0',
                    'sudu': '1',
                }
            ]
        };

        try {
            //初始化右边玩家数组
            pk.rightPlay = new Array();
            //初始化右边玩家数组
            pk.leftPlay = new Array();
            cc.loader.loadRes('pk/player', cc.Prefab, function (err, prefab) {
                if (!err) {
                    var p2 = result.player2;
                    var p1 = result.player1;
                    pk.play1 = p1;
                    pk.play2 = p2;
                    pk.jn = '普通攻击'

                    for (var i in p1) {
                        pk.leftPlay.push(p1[i].id);
                        var play1 = cc.instantiate(prefab);
                        play1.id = p1[i].id;
                        play1.name = p1[i].id;

                        var play1Js = play1.getComponent("playerItem");
                        play1Js.attackHide();
                        play1.id = i;
                        var x = 0;
                        var y = 740 - i * 70;
                        var num = parseInt(i) + parseInt(1);
                        cc.log(num)
                        if (num % 2 == 0) {
                            x = 170;
                        } else {
                            x = 100;
                        }

                        play1.setPosition(x, y)
                        cc.director.getScene().addChild(play1);


                    }

                    for (var m in p2) {
                        pk.rightPlay.push(p2[m].id);

                        var play2 = cc.instantiate(prefab);

                        var play2Js = play2.getComponent("playerItem");
                        if (m == 0) {
                            play2Js.attackShow();


                        } else {
                            play2Js.attackHide();
                        }


                        var flipYAction = cc.flipX(true);
                        play2.runAction(flipYAction);
                        play2.name = p2[m].id;
                        var x = 0;
                        var y = 740 - m * 70;
                        var num = parseInt(m) + parseInt(1);
                        cc.log(num)
                        if (num % 2 == 0) {
                            x = 650;
                        } else {
                            x = 560;
                        }

                        play2.setPosition(x, y)
                        cc.director.getScene().addChild(play2);


                    }


                }
            })

        } catch (e) {
            cc.log("初始化pk界面异常:" + e)
        }



    },
    index: function () {
        loading();
        cc.director.preloadScene('indexhg', function () {

            cc.log('Next scene index');

            cc.director.loadScene('indexhg');


        });





    },
    /**
     * 指令函数
     * param e 事件对象
     * param num 区分按钮类型
     * param type 区分攻击类型
     * param status 区分左右角色
     */
    attack: function (e, num, type, status) {
        var name;
        try {
            switch (num) {
                //攻击指令
                case 'gj': {
                    cc.log(type)
                    if (typeof (type) == 'undefined' || type == null || type == '') {
                        pk.jn = '普通攻击';
                    }
                    cc.log("攻击")
                    cc.find("Canvas/zhiling").active = false;
                    cc.find("Canvas/roleDetail").active = true;
                    if (status == 'left' || typeof (status) == 'undefined') {
                        name = pk.leftPlay[0];
                        this.rightShow();
                    } else if (status == 'right') {
                        name = pk.rightPlay[0];
                    }


                    pk.clickStatus = true;
                    // this.leftShow(name)
                    var role = cc.director.getScene().getChildByName(name)

                    var button = role.getComponentInChildren(cc.Button);
                    playJs.load.playerClickEvent(role);


                    break;
                }
                //技能指令
                case 'jn': {
                    cc.log("技能")
                    var p = getPkRoleMsg(pk.rightPlay[0], 2);
                    var jn = p.jineng;
                    cc.log(jn[0].name)
                    cc.find("Canvas/zhiling").active = false;
                    cc.log("初始化技能列表")
                    var jineng = cc.find("Canvas/jineng");
                    jineng.active = true;
                    cc.find("Canvas/jineng/detail/scrollview/view/content").getComponent('pkJnContent').onloading();



                    break;
                }
            }

        } catch (e) {
            cc.log('加载技能列表异常:' + e)
        }


    },
    leftShow: function (num) {
        var left = pk.leftPlay;
        var sccen = cc.director.getScene()

        for (var i in left) {
            var child = sccen.getChildByName(left[i]);
            if (num != left[i]) {
                child.getComponent("playerItem").attackHide();
            } else {
                child.getComponent("playerItem").attackShow();
            }


        }

    },
    rightShow: function () {
        var right = pk.rightPlay;
        var child = cc.director.getScene().getChildByName(right[0]);
        child.getComponent("playerItem").attackHide();
    },
    back: function () {
        pk.status = null;
        cc.find("Canvas/zhiling").active = true;
        cc.find("Canvas/roleDetail").active = false;
        var left = pk.leftPlay;
        for (var i in left) {
            var child = cc.director.getScene().getChildByName(left[i]);
            child.getComponent("playerItem").attackHide();
        }
        var right = pk.rightPlay;

        for (var m in right) {
            var child = cc.director.getScene().getChildByName(right[m]);
            if (m == 0) {
                child.getComponent("playerItem").attackShow();
            } else {
                child.getComponent("playerItem").attackHide();
            }

        }


    },
    playerClickEvent: function (event) {
        var node = event.target;
        cc.log(node.name);
    },
    /**
     * 接收服务器返回数据播放动画
     */
    playPkAnimation: function () {
        PkAnimation();
    },
    animationTest: function () {
        //this.playPkAnimation()
        //     var background = cc.find("Canvas/background");
        //     var seq;
        //     if (status == 1) {
        //         seq = cc.sequence(cc.moveTo(1, cc.p(0, 137)).easing(cc.easeCubicActionOut(1)));
        //         background.color = new cc.Color(245, 245, 245);

        //         status = null;
        //     } else {
        //         seq = cc.sequence(cc.moveTo(1, cc.p(200, 137)).easing(cc.easeCubicActionOut(1)));
        //         background.color = new cc.Color(0, 0, 0);
        //         //对应技能动画
        //         //五雷轰顶

        //         status = 1;
        //     }



        //     background.runAction(seq);
        //   jinengLoad('wanjian',background);



    },
    JnAnimation: function (msg) {
        var background = cc.find("Canvas/background");
        var seq;
        var x = 0;
        if ('left' == msg.msg.attackType.direction) {
            x = 200;
            background.color = new cc.Color(0, 0, 0);
        } else {
            x = -200;
        }
        seq = cc.sequence(cc.moveTo(1, cc.p(x, 137)).easing(cc.easeCubicActionOut(1)));




        // seq = cc.sequence(cc.moveTo(1, cc.p(x, 137)).easing(cc.easeCubicActionOut(1)));
        // background.color = new cc.Color(0, 0, 0);
        background.runAction(seq);
        jinengLoad(msg, background, null);



    },
    animationDanClose: function (event) {

        var background = cc.find("Canvas/background");
        background.getChildByName("dan").active = false;
        this.animationTest();

    },
    alertImg:function(){
         loadingScene(HxsgScenes.index,HxsgScenes.index)

    }
});
