cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button,
        
    },

    // use this for initialization
    onLoad: function () {

    },
 /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initFriendsItem: function (index, type, data) {
        var num=0;
        this.spriteToggle(index);
        this.node.name = type + index;
        this.type = type;
        this.data = data;
       // this.event = event;
         var richString;
         
        var btn=this.selectBn.id={'id':data.friendId,'name':data.friendName};
      
        //cc.log(btn+btn2);
         if(data.status=='离线'){
                   richString = '<color=#918E83 click="friendInfo">' + data.friendName + '【离线】</c> ';
                }else{
                    num=1;
                       richString = '<color=#FFFF00 click="friendInfo">' + data.friendName + '</c><color=#FF0000>【在线】</c> ' ;
                }
     
        this.richLabel.string = richString;
        this.richLabel.id=data;
        return num;
    },
     /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initFriendsList: function (index, type, data, event) {
        var num=0;
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
         var richString;
         
        var btn=this.selectBn.id={'id':data.id,'name':data.rolename};
      
        //cc.log(btn+btn2);
         if(data.status=='离线'){
                   richString = '<color=#918E83 click="friendInfo">' + data.rolename + '【离线】</c> ';
                }else{
                    num=1;
                       richString = '<color=#FFFF00 click="friendInfo">' + data.rolename + '</c><color=#FF0000>【在线】</c> ' ;
                }
     
        this.richLabel.string = richString;
        this.richLabel.id=data;
        return num;
    },
    /**
     *跳转到好友详情界面 
     */
    friendInfo:function(event){
        var node = event.target;
         var r=node.getComponent( cc.RichText);
        cc.log(r.id)
        roleMsg.id=r.id.friendId;
       //  cc.log("跳转到好友详情界面:"+msg.friendName)
 loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends)
    },
    /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZhuangbeiItem: function (index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;

        var richString = '<color=#FFFF00 click="zhuangbeiRichTextEvent">' + data.friendName + '</c>';
        this.richLabel.string = richString;
    },

    RichTextEvent: function () {
        cc.log('跳转到查询该角色详情界面' + this.data.name);
       
    },

    /**
     * 矿石
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initKuangshiItem: function (index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.selectBn.getCom
        var richString = '<color=#FFFF00 click="kuangshiRichTextEvent">' + data.zwName + '(' + data.zwXiaoGuo + ')' + '</c>';
        this.richLabel.string = richString;
    },

    kuangshiRichTextEvent: function () {
        cc.log('kuangshi item ' + this.data.zwName);
        curItemData = { 'id': this.data.id + ''};
        loadScene(HxsgScenes.baoshi, HxsgScenes.wupin);
    },

    /**
     * 杂物
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZawuItem: function (index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.clickEvent = event;

        //数量
        var btn = this.node.parent.getChildByName('useBtn');
        btn.active = (data.custom1 === '1') ? true : false; //&& (data.num > 0)

        var num = '(' + data.num + ')';
         var richString;
        if(data.status=='离线'){
           richString = '<color=#918E83 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        }else{
               richString = '<color=#FFFF00 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        }
       
        this.richLabel.string = richString;
    },

    zawuRichTextEvent: function () {
        cc.log('zawu item ' + this.data.name);
        var url = HxsgUrl.zawuItemUrl;
        var data = JSON.stringify({ 'id': this.data.id });
        ajaxData(url, data);
    },

    buttonEvent: function () {
        if (this.clickEvent) {
            this.clickEvent();
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function (index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.sprite.enabled = isOdd;
    }
});
