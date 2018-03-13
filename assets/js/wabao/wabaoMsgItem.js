cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        richText:cc.RichText
    },
    


    init: function(data,id){
            var str="<color=#08E7BA>"+ getDate(data.date)+"</c><color=#ff9e00>   "+data.rolename+"</c>";
            str+="<color=#F8EEEB>挖到了</c>";
            str+="<color=#F34913>  "+data.baoname+"</color>";
            this.richText.string=str;
            this.id=id;
    
       if(id%2===0){
               this.node.color=new cc.Color(0, 0,38);
            }
            else{
               this.node.color=new cc.Color(99,65,99);
           }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
