
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // use this for initialization
    onLoad: function () {
      self=this;
        cc.log(roleMsg.id)
       ajaxData(HxsgUrl.indexNewRoleMsg,roleMsg ,this.init.bind(this));
      

    },
    init:function(msg){
        var m=msg.roleMsg;
        myFriends.friendid=m.id;
        myFriends.friendname=m.rolename;
        // cc.log(ajaxReturnData)
        var ViewNode=this.node.getChildByName("scrollView");
         var btnlist=ViewNode.getChildByName("view").getChildByName("content").getChildByName("top_btnlist");
         //拉黑，解黑
         var lahei=btnlist.getChildByName("lahei").getChildren()[0].getComponent(cc.Label);
         lahei.string=m.heiStatus;
         //禁言，解禁
         var jinyan=btnlist.getChildByName("jinyan").getChildren()[0].getComponent(cc.Label);
         jinyan.string=m.jinStatus;
        var playerInfo=ViewNode.getChildByName("view").getChildByName("content").getChildByName("playerinfo");
        var name=ViewNode.getChildByName("Info").getChildren()[0].getComponent(cc.Label);
        name.string=m.rolename+'(ID:'+m.id+')'+'【'+m.roleStatus+'】';
        var img=playerInfo.getChildByName("img").getComponent(cc.Sprite);
        var zhiy=playerInfo.getChildByName("zhiy").getChildren()[0].getComponent(cc.Label);
        zhiy.string=m.level+'级'+m.zhiye;
        var chenh=playerInfo.getChildByName("chenh").getChildren()[0].getComponent(cc.Label);
        chenh.string=m.chenghao;//称号
        var jiaop=playerInfo.getChildByName("jiaop").getChildren()[0].getComponent(cc.Label);
         jiaop.string=m.jiaopai;//教派
        var huol=playerInfo.getChildByName("huol").getChildren()[0].getComponent(cc.Label);
        huol.string=m.tilizhi;//体力值
        var meil=playerInfo.getChildByName("meil").getChildren()[0].getComponent(cc.Label);
        meil.string=m.meili;//魅力值
        var tanw=playerInfo.getChildByName("tanw").getChildren()[0].getComponent(cc.Label);
        tanw.string=m.tanwei;//摊位
        var fanc=playerInfo.getChildByName("fanc").getChildren()[0].getComponent(cc.Label);
        fanc.string=m.fangchan;//房产
        var yis=playerInfo.getChildByName("yis").getChildren()[0].getComponent(cc.Label);
        yis.string=m.killnum;//杀人数目
        var xing=playerInfo.getChildByName("xing").getChildren()[0].getComponent(cc.Label);
        xing.string=m.xingge;//性格
        var peio=playerInfo.getChildByName("peio").getChildren()[0].getComponent(cc.Label);
        peio.string=m.peiou;//配偶
        var fuj=playerInfo.getChildByName("fuj").getChildren()[0].getComponent(cc.Label);
        
        var tianf=playerInfo.getChildByName("tianf").getChildren()[0].getComponent(cc.Label);
        tianf.string=m.tianfu;//天赋
        var zuoq=playerInfo.getChildByName("zuoq").getChildren()[0].getComponent(cc.Label);
        zuoq.string=m.zuoqi;//坐骑
        var kangx=playerInfo.getChildByName("kangx").getChildren()[0].getComponent(cc.Label);
        var kangf=playerInfo.getChildByName("kangf").getChildren()[0].getComponent(cc.Label);
        var feng=playerInfo.getChildByName("feng").getChildren()[0].getComponent(cc.Label);
         
         
         
        
        
    },
    onBtnList:function(e,d){
        switch(d){
            case "1":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
                 loadScene(HxsgScenes.talking, HxsgScenes.friendInfo);
            break;
            case "2":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
                myFriends.status='202';
                myFriends.type='yes';
                ajaxData(HxsgUrl.noAddFriends,myFriends);
            break;
            case "3":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "4":
            try{
                var notice= e.target.getChildByName('Label').getComponent(cc.Label).string;
                console.log(notice);
                if(notice==='拉黑'){
                    myFriends.status='拉黑';
                     ajaxData(HxsgUrl.speakStatus,myFriends,function(data){
                    if(data.msg==='true'){
                    showAlert('拉黑成功')
                    e.target.getChildByName('Label').getComponent(cc.Label).string='解黑';
                    }
                   
                });
                }
                if(notice==='解黑'){
                    myFriends.status='正常';
                      ajaxData(HxsgUrl.speakStatus,myFriends,function(data){
                    if(data.msg==='true'){
                    showAlert('解黑成功')
                    e.target.getChildByName('Label').getComponent(cc.Label).string='拉黑';
                    }
                
                });
                }
                //拉黑解黑操作
                cc.log(myFriends)
               
            }catch(e){
              
            }
           
            break;
            case "5":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "6":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "7":
             try{
                var notice= e.target.getChildByName('Label').getComponent(cc.Label).string;
                console.log(notice);
                if(notice==='禁言'){
                   showAlert("禁言成功，在本次登录时有效");
              e.target.getChildByName('Label').getComponent(cc.Label).string='解禁';
                   
                    
                }
                if(notice==='解禁'){
                     showAlert("解禁成功")
                          e.target.getChildByName('Label').getComponent(cc.Label).string='禁言';
                }
                //拉黑解黑操作
                cc.log(myFriends)
               
            }catch(e){
              
            }
            break;
            case "8":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "9":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "10":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "11":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "12":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "13":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "14":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "15":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string+","+d);
            break;
            case "16":
           returnLast();
            break;
        }
    }
});
