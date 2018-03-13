cc.Class({
    extends: cc.Component,

    properties: {
        msg:cc.RichText,
        buttonMsg:cc.Button
    },

    // use this for initialization
    onLoad: function () {
    },

    setMsg: function(msgStr){
        this.msg.string = msgStr;
    }

});
