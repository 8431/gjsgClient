cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        text: cc.Label,
    },

    //加载公告列表场景
    back: function () {
        returnLast();
    },

    // use this for initialization
    onLoad: function () {
        this.title.string = GG.title;
        this.text.string = GG.text;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
