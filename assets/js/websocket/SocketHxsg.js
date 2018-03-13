var SocketEvents = {
    connected: false,
    updataChat: null,       //处理聊天信息更新，在ChatManager.js中赋值
    updataFriendsMsg: null,       //处理好友聊天信息更新，talking.js中赋值
    times: null,       //赌场倒计时
    dzMsg: null,       //赌场押注数据加载
    cbMsg: null,       //赤壁押注数据加载
    data: null,
    updateRoleMsgEvent: null,//角色数据更新
}

var wabaolist = new Array();

window.ws = new WebSocket(HxsgUrl.socketUrl);
ws.onmessage = function (event) {
    onMessage(event);
};
ws.onerror = function (event) {
    console.log("Send Text fired an error");
};
ws.onclose = function (event) {
    console.log("WebSocket instance closed.");
};
ws.onopen = function (event) {


    cc.log("WebSocket = " + "已连接-");
    SocketEvents.connected = true;
};
function getDate(time) {
    var d = new Date(time);
    var hh = d.getHours();
    var mm = d.getMinutes();
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (hh < 10) {
        hh = "0" + hh;
    }
    var times = hh + ":" + mm;
    return times;
}
function getTime(time) {
    var hh = Math.floor(time / 1000 / 60 / 60 % 24); //所余时钟数    
    var mm = Math.floor(time / 1000 / 60 % 60); //所余分钟数  
    var ss = Math.floor(time / 1000 % 60); //所余秒数  
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (hh < 10) {
        hh = "0" + hh;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }
    var times = hh + ":" + mm + ":" + ss;
    return times;
}
function onMessage(event) {
    var totalMsg = event.data;
    totalMsg = eval("(" + totalMsg + ")");
    // totalMsg =  JSON.stringify(totalMsg);
    var num = totalMsg[0];
    var keyMsg = totalMsg[1];
    cc.log("1:区2:派3:商4:世------" + num + '有更新');
    cc.log(keyMsg);
    num = parseInt(num);
    switch (num) {
        case 1:
        case 2:
        case 3:
        case 4:
            SocketEvents.updataChat(num - 1, keyMsg);
            break;
        case 5:     //系
            showSystemMsgAlert(1, keyMsg);
            break;
        case 6:     //邮
            break;
        case 7:     //私
            break;
        case 8:
            try {
                SocketEvents.updataFriendsMsg(keyMsg);
            } catch (e) {


            }
            break;
        case 202:     //xxx拒绝添加好友，xxx同意添加好友。202状态只做信息提示
            showSystemMsgAlert(1, keyMsg.message);
            break;
        case 201:     //xxx发送添加好友信息，同意或者拒绝
            showAlert(keyMsg.message, yesAddFriends, noAddFriends, keyMsg, keyMsg);
            break;
        case 203:     //将好友信息推送到自己聊天界面中
            // 如果不在好友聊天界面则在catch快中调出【私】的动画，点击私的时候，将myFriends.friendid=keyMsg.roleid
            //myFriends.friendname=keyMsg.rolename传给。跳转到talking场景
            try {
                SocketEvents.updataFriendsMsg(keyMsg);
            } catch (e) {
                cc.log(keyMsg.rolename)
                showSystemMsgAlert(1, "【" + keyMsg.rolename + '】给你发来了新消息');

            }

            break;
        case 204:
            showAlert(keyMsg.message, exit, exit, null, null);
            break;
        //  case 1000:     //处理赌场 倒计时
        //     try{
        //            SocketEvents.times(keyMsg); 

        //     }catch(e){

        //     }
        //     break;
        case 1001:     //处理赌场 倒计时
            try {
                SocketEvents.dzMsg(keyMsg);
                cc.log(num + '更新中')
            } catch (e) {

            }
            break;
        case 5000:     //处理赌场 倒计时
            try {
                SocketEvents.cbMsg(keyMsg);
                cc.log(num + '更新中')
            } catch (e) {

            }
            break;
        case 1005:     //挖宝信息推送
            try {
                SocketEvents.wabaoMsg(keyMsg);
                cc.log(num + 'wabaoMsg')
            } catch (e) {
                cc.log(e)
            }
            break;
        case 204:
            showAlert(keyMsg.message, exit, exit, null, null);
            break;
        case 210://后期需要添加升级动画
            showAlert(keyMsg.msg, null, null, null, null);
            break;
        default:
            break;
    }
}

function yesAddFriends(msgData) {
    msgData.message = "";

    ajaxData(HxsgUrl.yesAddFriends, msgData, null)
}

function noAddFriends(msgData) {
    cc.log("拒绝添加你为好友")
    msgData.message = '玩家【' + msgData.friendname + '】拒绝添加你为好友'
    msgData.status = '202';
    msgData.type = 'no';
    msgData.friendid = msgData.roleid;
    ajaxData(HxsgUrl.noAddFriends, msgData, null)

}

function exit() {
    //cc.exit();



}
/////////////////////////////////////////////////////PK服务端//////////////////////////////////////////////////////////////
window.PkSocketEvents = {
    connected: false,
    onloadPlay: null,//加载玩家函数
    tempData: null,
}
window.pkWs = new WebSocket(HxsgUrl.pkSocketUrl);
pkWs.onmessage = function (event) {
    pkOnMessage(event);
};
pkWs.onerror = function (event) {
window.pkWs = new WebSocket(HxsgUrl.pkSocketUrl);
};
pkWs.onclose = function (event) {
    
window.pkWs = new WebSocket(HxsgUrl.pkSocketUrl);
};
pkWs.onopen = function (event) {
    PkSocketEvents.connected = true;
    pkOnopen(event)
};

function pkOnopen(event) {

    cc.log("开启pk连接onopen")
}
// 监听消息
function pkOnMessage(event) {
    // console.log('Client notified socket has closed', JSON.stringify(event.data));
    var returnJsonData = JSON.parse(event.data);
    // cc.log(returnJsonData);
    var type = returnJsonData[1];

    switch (type) {
        case 'roleMsg': {
            cc.log("roleMsg监听数据初始化！");
            var dataJson = returnJsonData[0];
            onloadPkMsg(dataJson);
            //主角id
            pk.rightOne = dataJson.rightOne;
            PkSocketEvents.onloadPlay(-160, -165, 0);
            PkSocketEvents.onloadPlay(253, 205, 1);

            onloadJn(true);
            break;
        }
        case 'sendPkMsg': {
            var dataJson = returnJsonData[0];
            pk.msg = dataJson.pkJson;
            //主角id
            pk.rightOne = dataJson.rightOne;
            //pk结束标志
            pk.pkstatus = dataJson.winPlay;
            pk.tempMsg = dataJson;
            pk.gameOver = dataJson.winPlay;
            cc.log(pk.msg)
            cc.log("提交数据播放动画");
            var playAmnim = cc.find("Canvas/playAmnim")
            var playerItem = playAmnim.getComponent("playerItem");
            pk.initType = "pkscoket"
            playerItem.shifa();
            break;
        }
        case 'gameOver': {
            var dataJson = returnJsonData[0];
            pk.gameOverDetail = dataJson;

            break;
        }



    }

};
function onloadPkMsg(dataJson) {
    try {
        pk.uuid = dataJson.uuid;
        pk.player1 = dataJson.rvLiB;
        pk.player2 = dataJson.rvLiA;
        //  pk.player2 = returnJsonData;
        pk.leftPlay = [];
        pk.clickArrayLeft = [];
        pk.clickArrayRight = [];
        pk.rightPlay = [];
        for (var i = 0; i < pk.player1.length; i++) {
            cc.log(pk.player1[i].id);

            pk.leftPlay.push(pk.player1[i].id);
            pk.clickArrayLeft.push(pk.player1[i].id);

            //  pk.rightPlay.push(returnJsonData[i].id)
        }
        for (var j = 0; j < pk.player2.length; j++) {
            if (pk.player2[j].qixue > 0) {
                pk.rightPlay.push(pk.player2[j].id);
                pk.clickArrayRight.push(pk.player2[j].id);
            }

        }
    } catch (e) {
        cc.log(e)
    }




}
function openPkScoket(key) {
    if (key) {
       
        // 发送一个初始化消息
        // 发送一个初始化消息
        var jsonData = {
            type: "pkWait",
            pkType: "1001",
            jsonData: {
                'uuidKey': uuidKey
            }
        };
        var strJsonData = JSON.stringify(jsonData);
        cc.log(strJsonData);
        pkWs.send(strJsonData);
        ajaxData(HxsgUrl.getYeGuaiData, { 'name': pk.yeguai.roleName, 'level': pk.yeguai.level }, function (data) {
            //cc.log(data)
        });
    }
}