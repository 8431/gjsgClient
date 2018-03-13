var self;
cc.Class({
    extends: cc.Component,

    properties: {
        jjMsg:cc.RichText,
        fuName:cc.Label,
         cz:cc.Label,
         gj:cc.Label,
         jl:cc.Label,
         mj:cc.Label,
         qx:cc.Label,
         czb:cc.Button,
         gjb:cc.Button,
         jlb:cc.Button,
         qxb:cc.Button,
         mjb:cc.Button,
         pysm:cc.Button,
         qtfj:cc.Button,
         zyfj:cc.Button
    
        
        
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
  /**
     * 点击事件-->返回
     */
    backEvent: function () {
        returnLast();
    },
    // use this for initialization
    onLoad: function () {
         self=this;
         ajaxData(HxsgUrl.loadChuZhiPeiYang,{'fuId':userWuPin.wupinId},self.loadFujiangPy);      

    },
    
    loadFujiangPy:function (msg){
                var p = msg.msg;
                if(typeof(p.czl)=='undefined'){
                    showAlert(p.tiShiMsg);
                }else{
                self.jjMsg.string=p.jjMsg;
                self.fuName.string=p.fuName;
                self.cz.string=p.czl;
                self.gj.string=p.gj;
                self.qx.string=p.qx;
                self.jl.string=p.jl;
                self.mj.string=p.mj;
                }
               
                cc.log(p.tiShiMsg)  
    },
    pycz:function(){
        var da={"type":"成长","fuId":userWuPin.wupinId};
         ajaxData(HxsgUrl.peiYangFuJiang,da,self.pyajax);
        
    },
    pygj:function(){
        var da={"type":"攻击","fuId":userWuPin.wupinId};
          ajaxData(HxsgUrl.peiYangFuJiang,da,self.pyajax);
        
    },
    pymj:function(){
        var da={"type":"敏捷","fuId":userWuPin.wupinId};
            ajaxData(HxsgUrl.peiYangFuJiang,da,self.pyajax);
        
    },
    pyjl:function(){
        var da={"type":"精力","fuId":userWuPin.wupinId};
           ajaxData(HxsgUrl.peiYangFuJiang,da,self.pyajax);
        
    },
     pyqx:function(){
        var da={"type":"气血","fuId":userWuPin.wupinId};
        ajaxData(HxsgUrl.peiYangFuJiang,da,self.pyajax);
        
    },
    pyShuoMing:function(){
       loadingScene(HxsgScenes.pyShuoMing,HxsgScenes.chuZhiPy)
         //cc.director.loadScene('pyShuoMing');
        
    },
    pyajax:function(msg){
                var m=msg.msg;
                if(m[0]==0){
                     self.jjMsg.string="<color=#ff0000>您没有将军令了!</c>";
                }else{
                ajaxData(HxsgUrl.loadChuZhiPeiYang,{'fuId':userWuPin.wupinId},self.loadFujiangPy);      
                }        
    }
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});


