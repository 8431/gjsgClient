'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        edit: cc.EditBox
    },

    sendEvent: function sendEvent() {
        if (SocketEvents.connected) {
            var datas = JSON.stringify({ 'key': uuidKey, 'type': 'chat', 'typeChat': (curChannel + 1).toString(), 'role': SocketEvents.data, 'chatMsg': this.edit.string });
            ws.send(datas);
            cc.log('ws.send: ' + datas);
            this.node.destroy();
        } else {
            cc.log('ws 未连接');
        }
    },

    cancelEvent: function cancelEvent() {
        this.node.destroy();
    }
});