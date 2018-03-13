var self;
cc.Class({
    extends: cc.Component,

    properties: {
        playerStatus: cc.Node,
        nearbyPlayer: cc.Node,
        chatMng: cc.Node,
        hotkeyBoard: cc.Node
        //menuPanel: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        self = this;
        self.playerStatus = self.playerStatus.getComponent('PlayerStatus');
        //缓存在本地
        if (indexhgRoleMsg.id == 0) {
            if (indexHg.indexroleMsgUrl != null && indexHg.indexroleMsgUrl != "" && typeof (indexHg.indexroleMsgUrl) != 'undefined') {
                self.initIndexroleMsgUrl();
            } else {
                ajaxData(HxsgUrl.indexroleMsgUrl, null, function (msg) {
                    indexHg.indexroleMsgUrl = msg;
                    self.initIndexroleMsgUrl();
                    SocketEvents.updateRoleMsgEvent();
                });
            }
        } else {
            self.playerStatus.initPlayer(indexhgRoleMsg.roleMsg);
            self.startWebsocket(role.id);
        }
    },
    initIndexroleMsgUrl: function () {
        cc.log('role-----' + indexHg.indexroleMsgUrl);
        let msg = indexHg.indexroleMsgUrl;
        var role = msg.roleMsg;
        self.playerStatus.initPlayer(role);
        self.startWebsocket(role.id);
        pk.roleID = role.id;
    },
    startWebsocket: function (id) {
        // url = "ws://119.29.234.184:8080/hxsg/chat",
        this.id = id + '';
        //  var  data= JSON.stringify({ 'id': this.id });
        SocketEvents.data = { 'id': this.id };
        var login = JSON.stringify({ 'key': uuidKey, 'type': "login", 'role': SocketEvents.data });
        console.log('initWS login = ' + login);
        ws.send(login);
        cc.log(HxsgUrl.socketUrl)


    },

    hotkeyEvent: function () {
        cc.log('index 快捷键');
        this.hotkeyBoard.active = true;
    },

    fujiangEvent: function () {
        loadScene(HxsgScenes.fujiang, HxsgScenes.index);
    },

    roleEvent: function () {
        loadScene(HxsgScenes.role, HxsgScenes.index);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
