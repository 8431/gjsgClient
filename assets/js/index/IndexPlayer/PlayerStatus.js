var self;
cc.Class({
    extends: cc.Component,

    properties: {
        juesename: cc.Label,
        HP: cc.ProgressBar,
        MP: cc.ProgressBar,
        head: cc.Sprite,
        fujiang1: cc.Node,
        fujiang2: cc.Node,
        fujiang3: cc.Node,
        zhiye: cc.Label,
        yin : cc.Label,
        jin: cc.Label,
        jingyan: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        self=this;
        this.fujiang1 = this.fujiang1.getComponent('IndexFujiangButton');
        this.fujiang2 = this.fujiang2.getComponent('IndexFujiangButton');
        this.fujiang3 = this.fujiang3.getComponent('IndexFujiangButton');
    },

    initPlayer: function(role){
        //角色名
        this.juesename.string = role.rolename ? role.rolename : '';
        //头像
        var headName = role.img;
        headName = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        this.headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(this.headUrl, cc.SpriteFrame, function(err, spriteFrame){
            if(!err){
                self.head.spriteFrame = spriteFrame;
            }
        });
        
        //气血
        var qixue1 = role.totalxue1 ? role.totalxue1 : 0;
        var qixue2 = role.totalxue2 ? role.totalxue2 : 0;
        this.HP.progress = qixue2 === 0 ? 0 : qixue1 / qixue2;
        //精力
        var jingli1 = role.totaljing1 ? role.totaljing1 : 0;
        var jingli2 = role.totaljing2 ? role.totaljing2 : 0;
        this.MP.progress = jingli2 === 0 ? 0 : jingli1 / jingli2;
        //等级
        this.dengji = (role.level ? role.level : '') + '级';
           roleMsg.roleId=role.level;
 
        //职业
        this.zhiye.string = this.dengji + (role.zhiye ? role.zhiye : '');
        // //称号
        // this.zhiye.string = role.chenghao ? role.chenghao : '';
        //钱
        this.jin.string = role.jin ? role.jin : 0;
        this.yin.string = role.yin ? role.yin : 0;
        
        //升级所需经验
        this.jingyan.string = role.jingyan ? role.jingyan : 0;

        //副将
        //TODO:
        // if(role.fujiang){
        //     fujiang1.setHead(role.fujiang);
        // }
    },

});
