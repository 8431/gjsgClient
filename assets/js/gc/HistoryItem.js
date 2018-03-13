cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.msg.string = '';
    },

    setMsg: function(msgStr){
        this.msg.string = msgStr;
    }

});
