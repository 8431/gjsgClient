


/**
     *跳转到好友详情界面 
     */
function friendMessage(event) {
    cc.log('跳转到好友详情界面')
    var node = event.target;
    var r = node.getComponent(cc.RichText);
    cc.log(r.id)
    roleMsg.id = r.id.friendId;
    //  cc.log("跳转到好友详情界面:"+msg.friendName)
    loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends)
}
function onloadJn(key) {
    var roleDetail = cc.find("Canvas/roleDetail");
    roleDetail.active = false;
    onloadJnZhiling(key, "pkOnload");

}
function onloadJnZhiling(key, type) {
    try {
        //right 发送指令
        if (type == "pkOnload") {
            var toSendId = pk.rightOne;
            if (toSendId != "") {
                if (pk.clickArrayRight.indexOf(toSendId) == -1) {
                    pk.clickArrayRight.unshift(toSendId);
                }
                if (pk.rightPlay.indexOf(toSendId) == -1) {
                    pk.rightPlay.unshift(toSendId);
                }


            }


        } else {
            var toSendId = pk.clickArrayRight[0];
        }

        var attack = cc.find("Canvas/background/" + toSendId + "/attack")
        //cc.log(cc.find("Canvas/background"))
        var attackAnim = attack.getComponent(cc.Animation);
        if (key) {
            attack.active = true;
            attackAnim.play();
        } else {
            attackAnim.stop();
            attack.active = false;
        }

    } catch (e) {
        cc.log(e)
    }


}
function selectEnemy(name, clickArrayLeft) {
    for (var i = 0; i < clickArrayLeft.length; i++) {
        var attack = cc.find("Canvas/background/" + clickArrayLeft[i] + "/attack")
        var attackAnim = attack.getComponent(cc.Animation);
        //只允许选择主角true--对比下name是否是主角||(pk.pkyaostatus=="1"&&true)
        if (name == clickArrayLeft[i]) {
            attack.active = true;
            attackAnim.play();
        } else {
            attack.active = false;
            attackAnim.stop();

        }

    }
}


function clickRoleTool(name, jnName) {
    if (pk.sureClick == name || jnName == '防御') {
        cc.log("攻击确认");
        pk.sureClick = "";
        if (pk.selectStatus == 2000 || jnName == '防御') {
            selectEnemy(0, pk.rightPlay)
        } else {
            selectEnemy(0, pk.leftPlay)
        }
        //传递数据
        var selectJson = {
            //说明:player1----攻击者
            'player1': pk.clickArrayRight[0],
            //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
            'player2': [name],
            'battleData': {},

            //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
            // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
            //说明：status代表动作指令中出现的方式
            // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
            'attackType': { 'name': '', 'status': '暴击', 'type': '', 'rolePosition': 'right' }
        }
        //设置技能名称

        selectJson.attackType.name = jnName;

        switch (jnName) {
            case "普通攻击": {
                selectJson.attackType.type = "jnzhanpugong";
                break;
            }
            case "舍命一击": {
                selectJson.attackType.type = "sheming";
                break;
            }
            case "万剑归宗": {
                selectJson.attackType.type = "wanjian";
                break;
            }
            case "画地为牢": {
                selectJson.attackType.type = "wei";
                break;
            }
            case "四面楚歌": {
                selectJson.attackType.type = "feng";
                break;
            }
            case "趁火打劫": {
                selectJson.attackType.type = "luan";
                break;
            }
            case "五雷轰顶": {
                selectJson.attackType.type = "lei";
                break;
            }
            case "巫蛊极毒": {
                selectJson.attackType.type = "wugujidu";
                break;
            }
            case "妖火燎原": {
                selectJson.attackType.type = "tianhuo";
                break;
            }
            case "龙腾一击": {
                selectJson.attackType.type = "long";
                break;
            }
            case "四面楚歌": {
                selectJson.attackType.type = "feng";
                break;
            }
            case "力劈华山": {
                selectJson.attackType.type = "lipi";
                break;
            }
            case "气冲斗牛": {
                selectJson.attackType.type = "qichong";
                selectJson.attackType.rolePosition = "self";
                break;
            }
            default: {
                var yaoid = pkYaoId[jnName];

                if (typeof (yaoid) != 'undefined') {

                    //使用药品
                    var yaoid = pkYaoId[jnName];
                    selectJson.attackType.type = yaoid;
                    selectJson.attackType.rolePosition = "self";
                    selectJson.attackType.name = yaoid;
                    ajaxUtils(HxsgUrl.usrYao, { 'id': yaoid }, function (data) {
                        pk.pkyaostatus = "0";
                        
                    })
                }


            }


        }
        //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        selectJson.battleData[name] = { 'Qx2': '0', 'Qx': '222', 'Jl': '' }

        //test
        if (jnName != '防御') {
            pk.msg.push(selectJson)
        }

        pk.clickArrayRight = removeByValue(pk.clickArrayRight, pk.clickArrayRight[0])
        var zhiLing = cc.find("Canvas/zhiling");
        var roleDetail = cc.find("Canvas/roleDetail");

        if (pk.clickArrayRight.length == 0) {
            //test
            // selectJson.battleData[1002] = { 'Qx2': '0', 'Qx': '-11200', 'Jl': '1000' }
            // selectJson.battleData[1003] = { 'Qx2': '0', 'Qx': '-11200', 'Jl': '1000' }
            // selectJson.battleData[1004] = { 'Qx2': '0', 'Qx': '-11200', 'Jl': '1000' }
            // selectJson.battleData[1005] = { 'Qx2': '0', 'Qx': '-11200', 'Jl': '1000' }
            //test
            zhiLing.active = false;
            roleDetail.active = false;
            pk.timeStatus = 8000;//关闭倒计时
            pk.selectStatus = 5000;
            //发送数据到后端服务器
            var jsonData = { jsonData: pk.msg, uuid: pk.uuid }

             cc.log("---------------发送指令数据---------------------")
             cc.log(JSON.stringify(jsonData))
                     cc.log("---------------发送指令数据---------------------")
            //使用ajax传输Pk数据
            ajaxData(HxsgUrl.attackData, { jsonData: JSON.stringify(jsonData) }, function (data) {
                if (data == "1000") {
                    cc.log("加入成功");


                }
            }, false);
            //pkWs.send(JSON.stringify(jsonData));

            cc.log("等待数据计算，播放动画");
            pk.msg = [];
        } else {
            roleDetail.active = false;
            zhiLing.active = true;
            onloadJnZhiling(true);
            pk.selectStatus = 3001;



        }



    } else {
        pk.sureClick = name;

    }
    //根据状态实行动画播放
    switch (pk.selectStatus) {
        case 2000: {
            selectPlayStatus(name, pk.selectStatus, jnName, pk.rightPlay)
            break;
        }
        case 3000: {
            selectPlayStatus(name, pk.selectStatus, jnName, pk.leftPlay)
            break;
        }
        //控制动画播放
        case 5000: {
           // cc.log(pk.msg)
            cc.log("提交数据播放动画");
            // var playAmnim = cc.find("Canvas/playAmnim")
            // var playerItem = playAmnim.getComponent("playerItem");
            // playerItem.shifa();
            break;
        }
    }



}
/** 
 * 技能选中敌方或者友方指示标志
 * name   玩家预制ID
 * selectStatus 选中状态标志  2000 3000 5000
 * jnName 技能名称
 * arryData 玩家数组  分为左右阵营
*/
function selectPlayStatus(name, selectStatus, jnName, arryData) {
    if (pk.selectStatus == selectStatus) {
        pk.jnName = jnName;
        selectEnemy(name, arryData)
        var roleDetail = cc.find("Canvas/roleDetail");
        var roleDetailJs = roleDetail.getComponent("roledetail")
        roleDetail.active = true;
        var play1 = null;
        switch (pk.selectStatus) {
            case 2000: {
                play1 = pk.player2;
                break;
            }
            case 3000: {
                play1 = pk.player1;
                break;
            }

        }

        for (var i = 0; i < play1.length; i++) {

            if (play1[i].id == name) {
                roleDetailJs.setAttackName(jnName);
                roleDetailJs.setType(play1[i].name);
                roleDetailJs.setXue("血:" + play1[i].qixue);
                roleDetailJs.setJing("精:" + play1[i].jingli);
                roleDetailJs.setsu("速度第" + play1[i].sudu);
                break;
            }
        }
        var zhiLing = cc.find("Canvas/zhiling");
        zhiLing.active = false;
    }

}
function removeByValue(arr, num) {
    var array = new Array();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != num) {
            array.push(arr[i]);
        }



    }
    return array;

}
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//查询数组某个元素
function getRoleMsg(id, arr) {
    var roleMsg = null;
    for (var i = 0; i < arr.length; i++) {
        if (id == [arr[i].id]) {
            roleMsg = arr[i];
            break;
        }


    }
    return roleMsg;



}