var PropertyType = cc.Enum({
    TiZhi: 1,       //体质
    ZhiLi: 2,       //智力
    LiLiang: 3,     //力量
    MinJie: 4       //敏捷
    // 体质: 1,       //体质
    // 智力: 2,       //智力
    // 力量: 3,     //力量
    // 敏捷: 4       //敏捷
});
cc.Class({
    extends: cc.Component,

    properties: {
        propMng: cc.Node,
        propType: {
            default: PropertyType.None,
            type: PropertyType
        },
        propValueLabel: cc.Label,
        propPointLabel: cc.Label,
        dealAllBtn: cc.Button,
        add1Btn: cc.Button,
        add3Btn: cc.Button,
        cut1Btn: cc.Button,
        cut3Btn: cc.Button
    },

    // use this for initialization
    onLoad: function () {
        this.propMng = this.propMng.getComponent('PorpertyManager');
    },

    /**
     * 初始化
     * @param propValueInit     属性值
     * @param propPoint     属性点
     */
    initData: function(propValueInit, propPoint){
        this.propInit = propPoint;                      //初始属性点
        this.propAdded = 0;                             //新分配的属性点
        this.propTotal = this.propInit + this.propAdded;     //该属性总属性点 = propInit + propAdded
        this.propValueInit = propValueInit;             //初始属性值

        this.propValue = propValueInit;
        this.propValueLabel.string = propValueInit;
        this.propPointLabel.string = propPoint;

        this.buttonInteraction();
    },

    /**
     * 重置自身，响应父级重新分配按钮
     */
    resetProp: function(){
        this.initData(this.propValueInit, this.propInit);
        this.buttonInteraction();
    },

    /**
     * 监听操作结果，预判断设置按钮交互状态
     */
    buttonInteraction: function(){
        //加
        if(this.propMng.remainPoints < 0) this.propMng.remainPoints = 0;
        switch (this.propMng.remainPoints){
            case 0:
                this.dealAllBtn.interactable = false;
                this.add1Btn.interactable = false;
                this.add3Btn.interactable = false;
                break;
            case 1:
            case 2:
                this.dealAllBtn.interactable = true;
                this.add1Btn.interactable = true;
                this.add3Btn.interactable = false;
                break;
            default:
                this.dealAllBtn.interactable = true;
                this.add1Btn.interactable = true;
                this.add3Btn.interactable = true;
                break;
        }
        //减
        if(this.propAdded < 0) this.propAdded = 0;
        switch(this.propAdded){
            case 0:
                this.cut1Btn.interactable = false;
                this.cut3Btn.interactable = false;
                break;
            case 1:
            case 2:
                this.cut1Btn.interactable = true;
                this.cut3Btn.interactable = false;
                break;
            default:
                this.cut1Btn.interactable = true;
                this.cut3Btn.interactable = true;
                break;
        }
    },

    /**
     * 是否可以进行操作
     * @param count
     * @returns {boolean}
     */
    canDo: function(count){
        if(count > 0) return this.propMng.remainPoints >= count ;
        else if(count < 0) {
            count = Math.abs(count);
            return this.propAdded >= count;
        }
    },

    dealAll: function(){
        this.propValueCalculate(this.propMng.remainPoints);
    },

    add1Point: function(){
        this.propValueCalculate(1);
    },

    add3Point: function(){
        this.propValueCalculate(3);
    },

    cut1Point: function(){
        this.propValueCalculate(-1);
    },

    cut3Point: function(){
        this.propValueCalculate(-3);
    },

    propValueCalculate: function(count){
        if(this.canDo(count)){
            //计算属性点
            this.propAdded += count;
            this.propTotal = this.propInit + this.propAdded;
            this.propMng.changeRemainPoints(count);
            //计算属性点改变后的属性值
            this.propValue = this.propMng.getPropValue(this.propType, this.propTotal);
            //Label刷新
            this.propValueLabel.string = this.propValue;
            this.propPointLabel.string = this.propTotal;

            this.propMng.onButtonEvent();
        }
    }
});
