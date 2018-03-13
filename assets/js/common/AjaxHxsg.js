
/**
 * 通用服务器访问方法（无数据）
 * 地址
 * 回调函数
 */
// function ajax(URL, callback) {
//   ajax({
//             type: 'POST',
//             url: URL,
//              timeout : 5000, //超时时间设置，单位毫秒
//             complete : function(XMLHttpRequest,status) { //请求完成后最终执行参数
//                 if (status == 'timeout'||status == 'error') {//超时,status还有success,error等值的情况
//            //  cc.director.getScene().getChildByName("wait").destroy();

//                 }
//             },
//             success: function (msg) {
//                      cc.log('URL:' +URL);


//                 cc.log('Ajax Data Hxsg 回调 ' + msg);
//                 if (callback) {
//                     callback(msg);

//                 }
//             },
//         });
// }

/**
 * 通用服务器访问方法
 * 地址
 * 数据
 * 回调函数
 */
function ajaxData(URL, jsonData, callback, key) {
    if (key == null || typeof (key) == 'undefined') {
        key = false;
    } else {
        key = true;
    }
    // loading();
    ajax({
        type: 'POST',
        url: URL,
        async: key,
        //  dataType: 'jsonp',
        data: jsonData,
        // jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        timeout: 5000, //超时时间设置，单位毫秒
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout' || status == 'error') {//超时,status还有success,error等值的情况
                //  cc.director.getScene().getChildByName("wait").destroy();

            }
        },
        success: function (msg) {
            cc.log('URL:' + URL);
            //   cc.director.getScene().getChildByName("wait").destroy();
            try {
                msg = eval("(" + msg + ")");
                ajaxReturnData.objets = msg.roleMsg;
                //cc.log('Ajax Data Hxsg 回调 ' +msg.roleMsg);
            } catch (e) {

            }


            cc.log('Ajax Data Hxsg 回调 ' + msg);
            if (callback) {
                callback(msg);

            }
        },
    });

};
function ajaxUtils(URL, jsonData, callback, key) {
    if (key == null || typeof (key) == 'undefined') {
        key = false;
    } else {
        key = true;
    }
    ajax({
        type: 'POST',
        url: URL,
        async: key,
        data: jsonData,
        timeout: 5000, //超时时间设置，单位毫秒
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout' || status == 'error') {
                showAlert("连接超时，请重试！")
            }
        },
        success: function (msg) {
            cc.log('URL:' + URL);
            msg = eval("(" + msg + ")");
            if (msg.code == "000") {
                if (callback) {
                    callback(msg.data);
                }

            } else {
                showAlert("服务器出错啦！")

            }
        },
    });

}

var arr = [1, 2]


arr[0]
function ajaxDataReturn(URL, jsonData) {
    var result = '';
    ajax({
        type: 'POST',
        url: URL,
        dataType: 'jsonp',
        data: jsonData,
        async: false,
        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        success: function (msg) {
            result = msg.roleMsg;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            cc.log("error: " + URL + ', ' + textStatus);
        }
    });
    cc.log(result);
    return result;
}

// var lastScene = '';
var lastSceneList = {};
var goableSceneArray = new Array();
/**
 * 保存当前场景名称并打开场景
 * 要新加载的场景
 * 新场景返回时，要返回到的场景(返回当前场景或者指定场景)
 */
function loadScene(newScene, curScene) {
    if (curScene) {
        lastSceneList[newScene] = curScene;
        cc.log(lastSceneList)
        cc.director.loadScene(newScene);
    }
    else {
        console.log('当前场景名参数不能为空');
    }
}
/**
 * 保存当前场景名称并打开场景
 * newScene 要新加载的场景
 * curScene 新场景返回时，要返回到的场景(返回当前场景或者指定场景)
 */
function loadingScene(newScene, curScene) {
    try {
        goableSceneArray.unshift(curScene);
        loading();
        cc.director.loadScene(newScene, function () {
            var wait = cc.director.getScene().getChildByName("wait")
            if (wait != null && wait != 'undefined')
                wait.destroy();
        });
    } catch (e) {
        cc.log("跳转场景异常：" + newScene);
    }
}

/**
 * 返回上一个场景
 * 当前场景
 */
function returnLastScene(curScene) {
    cc.log(lastSceneList)
    var newScene = lastSceneList[curScene];
    if (newScene) cc.director.loadScene(newScene);
    else cc.director.loadScene(HxsgScenes.index);
}
/**
 * 返回上一个场景
 */
function returnLast() {
    try {
        if (goableSceneArray[0] === '' || typeof (goableSceneArray[0]) === 'undefined') {
            goableSceneArray[0] = HxsgScenes.index;
            cc.director.loadScene(goableSceneArray[0]);

        } else {
            cc.director.loadScene(goableSceneArray[0]);
            goableSceneArray.shift();
        }


    } catch (e) {
        cc.log("返回上一个场景场景异常：" + goableSceneArray[0]);
    }
}
/**
 * 弹出提示框
 * @param msg
 * @param cancelCalback
 * @param sureCallback
 * @param suerParameter
 * @param cancelParameter
 */
function showAlert(msg, sureCallback, cancelCalback, suerParameter, cancelParameter) {
    cc.loader.loadRes('prefabs/alert', cc.Prefab, function (err, prefab) {
        if (!err) {
            var newAlert = cc.instantiate(prefab);
            cc.director.getScene().addChild(newAlert);
            var alert = newAlert.getComponent('Alert');
            alert.initAlert(msg, sureCallback, cancelCalback, suerParameter, cancelParameter);
        }
    })
}
/**
 * 系统信息提示框
 * @param msg
 */
function showSystemMsgAlert(type, msg) {
    cc.loader.loadRes('prefabs/systemMsg', cc.Prefab, function (err, prefab) {
        if (!err) {
            var newAlert = cc.instantiate(prefab);
            cc.find('Canvas').addChild(newAlert);

            var systemMsgJs = newAlert.getComponent('systemMsg');
            systemMsgJs.init(msg);

            newAlert.setPositionX(0);
            newAlert.setPositionY(0);
            switch (type) {
                case 1: {
                    newAlert.getChildByName('msgButton').getComponent(cc.Animation).play('systemMsg1');
                    break;
                }
                case 2: {
                    newAlert.getChildByName('msgButton').getComponent(cc.Animation).play('systemMsg2');
                    break;
                }
                case 3: {
                    newAlert.getChildByName('msgButton').getComponent(cc.Animation).play('systemMsg3');
                    break;
                }
            }

        }
    })
}
/**
 * 加載頂部和左右动画
 */
function loadCommomScence() {
    cc.loader.loadRes('prefabs/strake', cc.Prefab, function (err, prefab) {
        if (!err) {
            var strak = cc.instantiate(prefab);
            cc.find('Canvas').addChild(strak, 1);
            strak.setPositionY(24);
            strak.setPositionX(0);
            cc.find('Canvas').addChild(strak, 89);
            cc.log(cc.find('Canvas/strake').getPositionX())
            cc.log(cc.find('Canvas/strake').getPositionY())


        }
    });
    cc.loader.loadRes('prefabs/top', cc.Prefab, function (err, prefab) {
        if (!err) {
            var top = cc.instantiate(prefab);
            cc.find('Canvas').addChild(top, 90);

        }
    });
}
/**
 * 加载场景等待中。。。。
 * @param msg
 * @param cancelCalback
 * @param sureCallback
 * @param suerParameter
 *  @param cancelParameter
 */
function loading(msg, sureCallback, cancelCalback, suerParameter, cancelParameter) {
    cc.loader.loadRes('prefabs/wait', cc.Prefab, function (err, loading) {
        if (!err) {
            var newAlert = cc.instantiate(loading);
            newAlert.name = 'wait';
            newAlert.setPositionX(0)
            newAlert.setPositionY(540)
            cc.director.getScene().addChild(newAlert);
            cc.log(newAlert.getPositionX(), newAlert.getPositionY())


            // var alert = newAlert.getComponent('loading');
            //alert.initAlert(msg, sureCallback, cancelCalback,suerParameter,cancelParameter);
        }
    })
}
/**
 * 加载技能释放动画
 * @param msg
 * @param cancelCalback
 * @param sureCallback 
 * @param suerParameter
 *  @param cancelParameter
 */
var rolePk = null;
function jinengLoad(msg, node, result) {
    rolePk = new Array();
    cc.log('技能预制')
    try {
        var attackType = msg.attackType;
        var p1 = msg.player1;
        var p2 = msg.player2;
        var data = msg.battleData;
        var battleData = msg.battleData;
        //var wanjian=node.getChildByName('wanjian');
        cc.loader.loadRes('pk/jn/' + attackType.type, cc.Prefab, function (err, loading) {
            if (!err) {

                var jn = cc.instantiate(loading);
                if (attackType.rolePosition == 'right') {
                    var flipYAction = cc.flipX(true);
                    jn.runAction(flipYAction);
                    jn.setPosition(200, 0);
                } else {
                    jn.setPosition(-200, 0);
                }
                cc.log('jn-position:' + jn.getPosition())
                node.addChild(jn);
                var anim = jn.getComponent(cc.Animation);
                anim.on('finished', function () {
                    cc.log("-----动画完成:" + name)
                    jn.destroy();
                    // jn.active = false;

                    //node.active=false;

                    var background = node;

                    var finished = cc.callFunc(function (target, score) {
                        pk.msg.shift();
                        if (pk.msg.length > 0)
                            cc.log('the frist anim is end ')
                        PkAnimation();

                        // cc.log("-----------------------rolePk.length:" + rolePk.length)
                        // for (var m in rolePk) {
                        //     rolePk[m].role.getChildByName('label').active = false;
                        //     cc.log('rolePk[m].status:' + rolePk[m].status)
                        //     if (rolePk[m].status == 'live') {
                        //         rolePk[m].role.getChildByName('status').active = true;

                        //     }
                        //     rolePk.shift();

                        // }

                        // pk.msg.shift();
                        // if (pk.msg.length > 0)
                        //     PkAnimation();
                    }, this, 100);//动作完成后会给玩家加100分
                    var seq = cc.sequence(cc.moveTo(1, cc.p(0, 137)).easing(cc.easeCubicActionOut(1)), finished);
                    background.color = new cc.Color(245, 245, 245);
                    background.runAction(seq);

                    function roleFunc(n) {

                        requestAnimationFrame(function () {
                            var roleName = p2[n];
                            cc.log(roleName)
                            var role = background.getChildByName(roleName);

                            role.getChildByName('status').active = false;
                            var label = role.getChildByName('label');

                            if (n == p2.length - 1) {
                                label.name = 'end';
                            }
                            label.active = true;
                            var font = label.getChildByName('font');
                            font.getComponent(cc.Label).string = battleData[roleName].Qx;
                            //气血为0的时候切换显示状态
                            var qx2 = battleData[roleName].Qx2;
                            cc.log('qixue:' + qx2)
                            if (qx2 <= 0) {
                                rolePk.push({ 'role': role, 'status': 'killed' });
                                cc.log('++++++++++++++++++killed')
                            } else {
                                rolePk.push({ 'role': role, 'status': 'live' });
                                cc.log('++++++++++++++++++live')
                            }
                            cc.log('++++++++++++++++++rolePk:' + rolePk.length)
                            var fontAnim = font.getComponent(cc.Animation);

                            fontAnim.on('finished', function () {
                                this.active = false;
                                if (label.name == 'end') {

                                    for (var m in rolePk) {
                                        var la = rolePk[m].role.getChildByName('label');
                                        if (typeof (la) == 'undefined' || la == null) {
                                            la = rolePk[m].role.getChildByName('end');
                                        }


                                        cc.log('rolePk[m].status:' + rolePk[m].status)
                                        if (rolePk[m].status == 'live') {
                                            rolePk[m].role.getChildByName('status').active = true;
                                            //cc.log(rolePk)

                                        } else {
                                            rolePk[m].role.getComponent('playerItem').death();


                                        }
                                        // rolePk.shift();

                                    }
                                    cc.log("--------------------------------------------")

                                    label.name = 'label';
                                    la.active = false;
                                }


                            }, label);
                            fontAnim.play();

                        }, n * 20, this)








                    };
                    for (var n in p2) {

                        roleFunc(n)
                    }
                    //执行扣血动画  

                    // for (var n in p2) {
                    //   roleFunc(n)

                    // if (n == p2.length - 1) {
                    //     var fontAnim = font.getComponent(cc.Animation);

                    //     fontAnim.on('finished', function () {

                    //         if (n == p2.length - 1) {
                    //             cc.log("-----------------------rolePk.length:" + rolePk.length)
                    //             for (var m in rolePk) {
                    //                 rolePk[m].role.getChildByName('label').active = false;
                    //                 cc.log('rolePk[m].status:' + rolePk[m].status)
                    //                 if (rolePk[m].status == 'live') {
                    //                     rolePk[m].role.getChildByName('status').active = true;

                    //                 }
                    //                 rolePk.shift();

                    //             }
                    //             cc.log("--------------------------------------------")

                    //             pk.msg.shift();
                    //             PkAnimation();



                    //         }
                    //     }, this);
                    //     fontAnim.play();
                    // cc.log('n == p2.length - 1:--------------' + n);
                    // for (var m in rolePk) {
                    //     rolePk[m].role.getChildByName('label').active = false;
                    //     cc.log('rolePk[m].status:' + rolePk[m].status)
                    //     if (rolePk[m].status == 'live') {
                    //         rolePk[m].role.getChildByName('status').active = true;

                    //     }
                    //     rolePk.shift();

                    // }
                    // cc.log("--------------------------------------------")
                    // pk.msg.shift();
                    // PkAnimation();

                    // } else {
                    //     var fontAnim = font.getComponent(cc.Animation);
                    //     fontAnim.play();

                    // }
                    //    fontAnim.on('finished', function () {
                    //                 pk.msg.shift();
                    //                 PkAnimation();
                    // if (n == p2.length - 1) {
                    //     cc.log("-----------------------n:"+n)
                    //     for (var m in rolePk) {
                    //         rolePk[m].role.getChildByName('label').active = false;
                    //          cc.log('rolePk[m].status:'+rolePk[m].status)
                    //             if (rolePk[m].status == 'live') {
                    //                 rolePk[m].role.getChildByName('status').active = true;

                    //             }
                    //              rolePk.shift();

                    //     }
                    //     cc.log("--------------------------------------------")

                    //         pk.msg.shift();
                    //         PkAnimation();



                    // }
                    //    }, this);


                    // }






                }, this);
                anim.play();


            }
        });





    } catch (e) {

    }

}

/**
    * 接收服务器返回数据播放动画
    */
function PkAnimation() {
    cc.log('================playPkAnimation')
    var msg = pk.msg;
    var result = { 'battle': { '1002': { 'qixue': '0', 'jingli': '0', sudu: '1' }, '1003': { 'qixue': '0', 'jingli': '1000', 'sudu': 2 } } };


    try {
        var attackRole;
        //
        var background = cc.find("Canvas/background");
        // for (var i in msg) {
        var attackType = msg[0].attackType;
        //播放攻击者施法动画
        //需要判断职业，播放不同的释放动画
        var p1 = msg[0].player1;
        var seq;
        var role1 = background.getChildByName(p1);

        if (attackType.rolePosition == 'left') {
            var flipYAction = cc.flipX(true);
            role1.runAction(flipYAction);

        }
        var anim = role1.getChildByName('shifa').getComponent(cc.Animation)

        var attackFinished = cc.callFunc(function (target, score) {
            anim.play();


        }, this, 100);

        if (attackType.rolePosition == 'left') {
            attackRole = cc.sequence(cc.moveTo(1, cc.p(-200, 137)).easing(cc.easeCubicActionOut(1)), attackFinished);

        } else {
            attackRole = cc.sequence(cc.moveTo(1, cc.p(200, 137)).easing(cc.easeCubicActionOut(1)), attackFinished);
        }


        background.runAction(attackRole);
        anim.on('finished', function () {

            background.runAction(seq);
            jinengLoad(msg[0], background, result);

        }, this);

        cc.log(attackType.name)
        if (attackType.name != '普通攻击') {

            var x = 0;
            cc.log(attackType.rolePosition)
            if ('left' == attackType.rolePosition) {
                x = 200;
                background.color = new cc.Color(0, 0, 0);
            } else {
                x = -200;
            }
            seq = cc.sequence(cc.moveTo(1, cc.p(x, 137)).easing(cc.easeCubicActionOut(1)));

            //background.runAction(seq);


        }
        // }
    } catch (e) {
        cc.log("--------" + e)

    }




}

