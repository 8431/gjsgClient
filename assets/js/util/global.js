/**
 * 游戏场景(必须window前缀)
 */
//技能伤害公式和耗蓝公式-------耗蓝公式=（技能基本值+熟练度）*0.25
//伤害公式=（技能基本值+熟练度）*0.8


window.HxsgScenes = {
    index: 'indexhg',                     //主场景
    indexchat: 'indexchat',               //聊天场景
    role: 'role',                         //角色详情场景
    fujiang: 'fujiang',                   //副将列表场景
    fjxiangqing: 'fjxiangqing',           //副将详情场景
    propertyCheck: 'shuxingChakan2',       //属性查看
    propertyDeal: 'shuxingFenpei2',        //属性分配
    history: 'history',                   //赌场历史信息场景
    wupin: 'wupin',                       //物品场景
    zhuangbei: 'zhuangbei',               //装备详情
    baoshi: 'baoshi',                     //宝石详情
    ggList: 'ggList',                     //公告列表f
    ggDetail: 'ggDetail',                 //公告详情
    bank: 'bank',                         //钱庄
    getSilver: 'getSilver',               //银两取款
    saveSilver: 'saveSilver',             //银两存款
    getGold: 'getGold',                   //金砖取款
    saveGold: 'saveGold',                 //金砖存款
    buyGold: 'buyGold',                   //求购金砖
    sellGold: 'sellGold',                 //出售金砖
    orders: 'bankOrders',                 //订单记录
    rechargeGold: 'rechargeGold',         //金砖充值
    rechargeReward: 'rechargeReward',     //充值奖励
    friends: 'friends',                   //好友界面
    talking: 'talking',                   //与好友私信
    userXinFaShu: 'userXinFaShu',         //使用心法书界面   
    userList: 'userList',                 //使用技能书界面
    userJiangJunLing: 'userJiangJunLing', //使用将军令
    saizi: 'saizi',                       //赌场猜猜猜
    guangChang: 'guangChang',             //广场
    lishichaxun: 'lishichaxun',           //赌场历史开盘数据
    touzhujilu: 'touzhujilu',             //赌场-投注记录
    zhuanqianpaihang: 'zhuanqianpaihang', //赌场-赚钱排行
    friendInfo: 'friendInfo',//好友详情界面
    friendsList: 'friendsList',//搜索好友界面
    yingJia: 'yinJia',//赢家界面
    chuZhiPy: 'chuZhiPy',//副将初值培养
    wabao: 'wabao',//挖宝界面
    xunLian: 'xunLian',//训练
    bang: "bang",//赤壁子页面详情
    pkWait: 'pkWait',
    myZhuangBei: 'myZhuangBei',
    yiguan: 'yiguan',//医馆
    wuqi: 'wuqi',//武器店

}



////////////////////正试版//////////////////////

var  pkWsUrl= "ws://39.108.53.12:8086/pkServer/pkServerTest";
var loginlocalUrl = "http://39.108.53.12:8082/login/"

var localUrlPk = "http://39.108.53.12:8086/pkServer/"

var localUrl = "http://39.108.53.12:8085/admin/";
var  wsUrl = "ws://39.108.53.12:8085/admin/chat";

////////////////测试/////////////
// var localUrl = "http://127.0.0.1:8080/";
// var wsUrl = "ws://127.0.0.1:8080/chat";
// var pkWsUrl = "ws://127.0.0.1:8082/pkServer/pkServerTest";
// var loginlocalUrl = "http://127.0.0.1:8082/login/"

// var localUrlPk = "http://127.0.0.1:8082/pkServer/"

var imgUrl = "http://39.108.53.12:8082/img/"
var txUrl = "http://39.108.53.12:8082/touxiang/"
/**
 * 网络地址 
 */
window.HxsgUrl = {
    zhuceUrl: loginlocalUrl + 'zhuce/applogin',                                 //注册
    // socketUrl: 'ws://119.29.234.184:8080/hxsg/chat',                     //建立websocket
    socketUrl: wsUrl,
    pkSocketUrl: pkWsUrl,                                                   //建立websocket

    //主界面
    roleMsgUrl: localUrl + 'cocos2dIndex/indexRoleMsg',                    //获取角色信息
    indexroleMsgUrl: localUrl + 'cocos2dIndex/queryRoleMsgQx',                    //主界面获取角色信息
    queryRoleMsgId: localUrl + 'cocos2dIndex/queryRoleMsgId',                    //根据主键获取角色信息
    indexNewRoleMsg: localUrl + 'cocos2dIndex/indexNewRoleMsg',            //新的获取角色信息
    chatUrl: localUrl + 'cocos2dIndex/chatMsg',                            //获取聊天信息
    fujiangConfigUrl: localUrl + 'cocos2dYg/appfujiang',                   //副将配置信息
    fujiangXiangqingUrl: localUrl + 'Cocos2dFuJiang/loadRoleFujiang',      //副将详情信息
    propertyUrl: localUrl + 'fujiang/appckds',                             //属性点
    propertyUpdateUrl: localUrl + 'Cocos2dFuJiang/commitSxd',                       //属性点分配提交
    moveCity: localUrl + 'cocos2dIndex/moveCity',//获取地图和人物信息
    //药品
    queryYaoPinDetail: localUrl + 'cocos2dYaoPin/queryYaoPinDetail',                   //读取药品详情
    buyYao: localUrl + 'cocos2dYaoPin/buyYao',                   //购买药品
    queryRoleYao: localUrl + 'cocos2dYaoPin/queryRoleYao',                   //藥品加載
    usrYao: localUrlPk + 'Cocos2dAddPk/usrYao',                   //使用药品pk
    //物品
    yaopinUrl: localUrl + 'cocos2dWuPin/yaopin',                           //读取药品信息
    zhuangbeiUrl: localUrl + 'cocos2dWuPin/zhaungbei',                     //读取装备信息
    kuangshiUrl: localUrl + 'cocos2dWuPin/baoshi',                         //读取矿石信息
    zawuUrl: localUrl + 'cocos2dWuPin/wupin',                              //读取杂物信息
    zbDetailUrl: localUrl + 'cocos2dWuPin/queryZhuangBeiDetail',
    myZhuangBei: localUrl + 'cocos2dWuPin/myZhuangBei', //我的装备

    zhuangbei: localUrl + 'cocos2dWuPin/queryZhuangBeiDetail',             //装备详情
    zawuItemUrl: localUrl + 'cocos2dWuPin/wupinDescribe',                  //获取杂物详情
    baoshiItemUrl: localUrl + 'cocos2dWuPin/baoshiDescribe',         //获取宝石详情
    xqbsList: localUrl + 'cocos2dWuPin/xqbsList',//根据装备加载宝石
    mosaicGemtoZhuangBei: localUrl + 'cocos2dWuPin/mosaicGemtoZhuangBei',//将宝石镶嵌到装备上  
    zbWuQi: localUrl + 'cocos2dWuPin/zbWuQi',//角色裝備武器
    xiezai: localUrl + 'cocos2dWuPin/xiezai',//角色卸载武器    

    //赌场
    historyUrl: localUrl + 'cocos2Gc/queryCasinoHistory',                              //赌场历史信息
    appsxtime: localUrl + 'cocos2Gc/Casinotime',                              //赌场历史信息
    queryCasinoMsg: localUrl + 'cocos2Gc/queryCasinoMsg ',                  //赌场历史信息
    roleStakeResult: localUrl + 'cocos2Gc/roleStakeResult ',                //赌场历史信息
    queryBettingRecord: localUrl + 'cocos2Gc/queryBettingRecord ',                //投注记录
    queryWinJinBang: localUrl + 'cocos2Gc/queryWinJinBang',                     //赚钱排行
    queryWinMoneyRole: localUrl + 'cocos2Gc/queryWinMoneyRole',                 //赢家
    //赤壁
    chiBiTime: localUrl + 'cocos2dChiBi/Casinotime',//赤壁时间倒计时
    loadChiBi: localUrl + 'cocos2dChiBi/queryCasinoMsg',//加载赤壁押注信息
    chiBiYaZhu: localUrl + 'cocos2dChiBi/roleStakeResult',//赤壁押注
    loadYaZhuMsg: localUrl + 'cocos2dChiBi/loadYaZhuMsg',//赤壁押注页面加载
    chiBiYaZhuRecord: localUrl + 'cocos2dChiBi/queryBettingRecord',//赤壁投注记录
    chiBiWinRecord: localUrl + 'cocos2dChiBi/queryWinMoneyRole',//赤壁战利品排行
    chiBiBang: localUrl + 'cocos2dChiBi/queryWinJinBang',//赤壁奖励排行
    chiBiHistory: localUrl + 'cocos2dChiBi/queryCasinoHistory',//赤壁历史查询
    //挖宝
    wabaoMsg: localUrl + 'Cocos2dWaBao/wbMessage',
    loadWaBao: localUrl + 'Cocos2dWaBao/loadWaBao',                         //加载挖宝界面
    startWaBao: localUrl + 'Cocos2dWaBao/startWaBao',                       //开始挖宝
    init: localUrl + 'Cocos2dWaBao/init',                                   //消耗藏宝图
    nextWaBao: localUrl + 'Cocos2dWaBao/nextWaBao',                                                                       //继续挖宝
    //公告
    ggUrl: localUrl + 'cocos2dNotis/querySystemNotis',                     //公告信息

    //钱庄
    bankUrl: localUrl + 'Cocos2dMoney/quKuanLoading',                        //您目前有xxx，钱庄存款xxx
    bankSGUrl: localUrl + 'Cocos2dMoney/money',                              //存取款金银
    bankSGRecordUrl: localUrl + 'Cocos2dMoney/moneyRecord',                  //存取款金银记录
    bankBSGoldMsgUrl: localUrl + 'Cocos2dMoney/loading',                     //获取金砖求购和出售的情况
    bankBSGoldUrl: localUrl + 'Cocos2dMoney/queryGoldShopMsg',               //金砖求购和出售
    //bankUrl: localUrl + 'Cocos2dMoney/shopping',
    //bankUrl: localUrl + 'Cocos2dMoney/transactionRecord',
    //bankUrl: localUrl + 'Cocos2dMoney/cancelOrder',

    //使用物品
    userWuPin: localUrl + 'cocos2dWuPin/userWuPin',
    queryFuJiangJiNengBook: localUrl + 'cocos2dWuPin/queryFuJiangJiNengBook',//使用技能书学习技能

    //登录
    checkVersion: loginlocalUrl + 'cocos2dLogin/checkVersion',              //版本检测
    loadCreateRole: loginlocalUrl + 'cocos2dLogin/loadSelectRole',              //加载选择角色页面
    selectRole: loginlocalUrl + 'cocos2dLogin/selectRole',                       //选择角色   
    createRole: loginlocalUrl + 'cocos2dLogin/createRole',                       //创建角色
    login: loginlocalUrl + 'cocos2dLogin/login',                                //登录游戏
    checkRole: loginlocalUrl + 'cocos2dLogin/checkRole',                        //检查角色名是否重复
    checkAcount: loginlocalUrl + 'cocos2dLogin/checkAcount',                    //检查账号名是否重复
    register: loginlocalUrl + 'cocos2dLogin/creatAccount',                      //注册游戏账号
    friends: localUrl + 'Cocos2dFrineds/queryRoleFriends',                    //查询好友列表（好友，最近，亲人，仇人）
    chatRecord: localUrl + 'Cocos2dFrineds/loadFrinedsMsg',                   //加载与好友的聊天记录
    sendMsgForFriends: localUrl + 'Cocos2dFrineds/sendMsg',                   //给好友发送聊天信息
    yesAddFriends: localUrl + 'Cocos2dFrineds/addFriends',                    //同意添加好友
    noAddFriends: localUrl + 'Cocos2dFrineds/sendAddFriendsMsg',              //拒绝添加好友
    queryFriends: localUrl + 'Cocos2dFrineds/queryFriends',                    //模糊查询好友          
    speakStatus: localUrl + 'Cocos2dFrineds/speakStatus',                     //拉黑禁言
    jiNengShu: localUrl + 'cocos2dWuPin/getJiNengShuList',                    //技能书加载
    userJiNengShu: localUrl + 'cocos2dWuPin/getJiNengShuList',                 //使用技能书
    getXinFaFuJiang: localUrl + 'cocos2dWuPin/getXinFaFuJiang',               //加载使用心法书
    userMineral: localUrl + 'cocos2dWuPin/userMineral',                       //砸矿石
    //副将
    loadChuZhiPeiYang: localUrl + 'Cocos2dFuJiang/loadChuZhiPeiYang', //加载初值培养界面
    peiYangFuJiang: localUrl + 'cocos2dWuPin/peiYangFuJiang', //初值培养
    setFjState: localUrl + 'Cocos2dFuJiang/setFjState', //设置副将参战
    //礼物
    giftPackage: localUrl + 'Cocos2dGiftPackage/giftPackage', //内测礼包
    //训练
    startTraining: localUrl + 'Cocos2dXunLian/startTraining',//开始训练
    training: localUrl + 'Cocos2dXunLian/training',//查询训练详情
    queryJingYan: localUrl + 'Cocos2dXunLian/queryJingYan',//领取经验页面初始化
    getJingYan: localUrl + 'Cocos2dXunLian/getJingYan',//领取经验
    //pk加入
    attackData: localUrlPk + 'Cocos2dAddPk/attackData',//传送PK指令
    queryPk: localUrlPk + 'Cocos2dAddPk/queryPk',//查找是否有pk
    getYeGuaiData: localUrlPk + 'Cocos2dAddPk/getYeGuaiData',//初始化数据
    //装备商店
    queryZhuangBei: localUrl + 'cocos2dZhuangBei/queryZhuangBei',//查询装备商店
    buyZhuangBei: localUrl + 'cocos2dZhuangBei/buyZhuangBei',//购买装备
}
window.indexHg = {
    indexroleMsgUrl: "",//界面ajax返回数据体
}
window.wuqiShop = {
    shop: "",//武器商店
}
window.myFriends = {
    friendid: '',//好友ID
    friendname: '',//好友明
    message: '',//消息体
    status: '',//状态
    type: '',//同意或者拒绝
}

window.userWuPin = {
    wupinId: '',   //物品ID
    num: '',//数量
    jnId: '',//技能ID
    fuId: '',//副将ID
    objects: '',//任意对象

}

window.roleMsg = {
    id: '1000',//主键

}
window.fujiang = {
    fjmsg: '',//副将信息

}
//indexhg界面获取角色信息查询过渡变量
window.indexhgRoleMsg = {
    id: '0',//主键

}
window.ajaxReturnData = {
    objets: '新手村',//任意对象
    topCity: '',//top城市名
    nearRole: ''//附近玩家

}
//公告
window.GG = {
    title: "",//标题
    text: "",//内容
}

//钱庄
window.Bank = {
    bankGold: 0,//存款金砖
    bankSilver: 0,//存款银两
    playerGold: 0,//玩家金砖
    playerSilver: 0,//玩家银两
}
//赤壁
window.ChiBiVo = {
    topMsg: '',//头部信息
    type: '',//金或者银
    url: '',//url临时变量
    title: '',//标题信息
    num: '',//赤壁时间标志
}
window.zhaungBeiDetailsZbid = {}//装备id
//赤壁
window.DuChangVo = {
    num: '',//赌场倒计时标志
}

//地图主城
window.mapArrays = ['新手村', '新野', '江陵', '陈留', '洛阳', '吴城', '成都', '三江城', '许昌', '寿春', '下邳', '宝石矿洞', '宝石矿洞2', '咕叽城'];
window.propCheckId = null;
//pk
window.pk = {
    msg: [
        //  {
        //     //说明:player1----攻击者
        //     'player1': '1002',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //     'player2': ['10077'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //     'battleData': { '10077': { 'Qx2': '33', 'Qx': '-11200', 'Jl': '1000' }},
        //     //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'yaohuo', 'rolePosition': 'left' }
        // },
        //  {
        //     //说明:player1----攻击者
        //     'player1': '1003',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //     'player2': ['10078'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //     'battleData': { '10078': { 'Qx2': '33', 'Qx': '-11200', 'Jl': '1000' }},
        //     //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'jnzhanpugong', 'rolePosition': 'left' }
        // },
        //  {
        //     //说明:player1----攻击者
        //     'player1': '1004',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //     'player2': ['10079'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //     'battleData': { '10079': { 'Qx2': '33', 'Qx': '-11200', 'Jl': '1000' }},
        //     //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'jnzhanpugong', 'rolePosition': 'left' }
        // },
        // {
        //     //说明:player1----攻击者
        //     'player1': '1005',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //     'player2': ['10079'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //     'battleData': { '10079': { 'Qx2': '11', 'Qx': '-11200', 'Jl': '1000' }, '1003': { 'Qx2': '0', 'Qx': '-300', 'Jl': '1000' }, '1004': { 'Qx2': '10', 'Qx': '-400', 'Jl': '1000' }, '1005': { 'Qx2': '10', 'Qx': '-500', 'Jl': '1000' } },
        //     //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'wugujidu', 'rolePosition': 'left' }
        // },
        // {
        //     //说明:player1----攻击者
        //     'player1': '1004',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //     'player2': ['1000'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //     'battleData': { '1000': { 'Qx2': '11', 'Qx': '-111111', 'Jl': '1000' } },
        //     //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'long', 'rolePosition': 'right' }
        // },
        // {
        //     //说明:player1----攻击者
        //     'player1': '1000',
        //     //说明:player2---被攻击者,群体技能有多个被攻击者，普通攻击只有一个目标，所以设计数组形式
        //       'player2': ['1002'],

        //     //说明:Qx代表气血，负数代表被扣除的气血，正数代表增加的气血（增加气血，来自于玩家使用回血道具）
        //     //说明:Jl代表蓝量，负数代表被扣除的蓝量，正数代表增加的蓝量（增加蓝量，来自于玩家使用蓝量道具）
        //      'battleData': { '1002': { 'Qx2': '0', 'Qx': '-11111', 'Jl': '1000' } },            //说明：type代表相应的动作指令，比如 普通攻击，使用道具，五雷轰顶，。。。。等等攻击名称，技能名称，使用道具等等一系列指令
        //     // TYPE所有的指令【普通攻击】【使用道具】【五雷轰顶】【妖火燎原】【呼风唤雨】【舍命一击】【力劈华山】【排山倒海】【画地为牢】【四面楚歌】【趁火打劫】
        //     //说明：status代表动作指令中出现的方式
        //     // ---status所有指令（'攻击'，'暴击','致命一击','反击','反震','未中'）
        //     'attackType': { 'name': '万剑归宗', 'status': '暴击', 'type': 'huo', 'rolePosition': 'right' }
        // }

    ],
    // leftPlay: ['1002', '1003', '1004', '1005'],//左边玩家数组
    // clickArrayLeft:['1002', '1003', '1004', '1005'],//右边玩家数组,
    // rightPlay:['1000','10077','10078','10079'],//右边玩家数组
    // clickArrayRight: ['1000','10077','10078','10079'],//左边玩家数组,
    gameOver: null,
    pkstatus: "",//pk结束标志
    pkyaostatus: "0",//pk使用药品标志 0默认值，1使用药品
    tempMsg: null,
    rightOne: "",//左边主将
    scoketPk: null,
    uuid: "",
    leftPlay: [],//左边玩家数组
    clickArrayLeft: [],//右边玩家数组,
    rightPlay: [],//右边玩家数组
    clickArrayRight: [],//左边玩家数组,
    selectStatus: "",
    status: '',
    timeStatus: '',//定时器
    sureClick: "",//双击人物确认攻击动作标识
    clickStatus: true,//选择敌人状态标识
    play1: '',
    play2: '',
    initType: 'init',//初始化pk界面加载人物，分两种，一种scoket初始化加载，另外一种回合结束加载！
    //被点击野怪的数据
    yeguai: {
        "level": "100,105",
        "name": "侍卫群"
    },
    jn: '',//技能
    attacked: new Array(),//攻击完成数组
    jnName: "",
    roleID: "",
    'player1':
    [
        //     {
        //         'name': '黄月英',
        //         'id': '1002',
        //         'qixue': '32123',
        //         'jingli': '21210',
        //         'sudu': '1',
        //         'jineng': [
        //             {
        //                 'skillName': '舍命一击',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '力劈华山',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '气冲斗牛',
        //                 'type': '1',
        //                 'status': 'right'
        //             }
        //         ]
        //     },
        //     {
        //         'name': '祖茂',
        //         'id': '1003',
        //         'qixue': '21210',
        //         'jingli': '20',
        //         'sudu': '2',
        //         'jineng': [
        //             {
        //                 'name': '五雷轰顶',
        //                 'type': '1',
        //                 'status': 'left'
        //             }
        //         ]
        //     },
        //     {
        //         'name': '管亥',
        //         'id': '1004',
        //         'qixue': '3130',
        //         'jingli': '0',
        //         'sudu': '3',
        //     },
        //     {
        //         'name': '诸葛瑾',
        //         'id': '1005',
        //         'qixue': '23320',
        //         'jingli': '3230',
        //         'sudu': '4',
        //     }
    ],
    'player2': [
        //     {
        //         'name': '咕叽',
        //         'id': '1000',
        //         'qixue': '12220',
        //         'jingli': '4440',
        //         'sudu': '1',
        //         'jineng': [
        //             {
        //                 'name': '万剑归宗',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '妖火燎原',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '巫蛊极毒',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '龙腾一击',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '四面楚歌',
        //                 'type': '1',
        //                 'status': 'feng'
        //             },
        //              {
        //                 'name': '画地为牢',
        //                 'type': '1',
        //                 'status': 'wei'
        //             },
        //             {
        //                 'name': '趁火打劫',
        //                 'type': '1',
        //                 'status': 'luan'
        //             },
        //             {
        //                 'name': '气冲斗牛',
        //                 'type': '1',
        //                 'status': 'qichong'
        //             },
        //              {
        //                 'name': '力劈华山',
        //                 'type': '1',
        //                 'status': 'lipi'
        //             },


        //         ]
        //     },
        //     {
        //         'name': '黄月英',
        //         'id': '10077',
        //         'qixue': '21210',
        //         'jingli': '20',
        //         'sudu': '1',
        //         'jineng': [
        //              {
        //                 'name': '万剑归宗',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '妖火燎原',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '巫蛊极毒',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '龙腾一击',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '四面楚歌',
        //                 'type': '1',
        //                 'status': 'feng'
        //             },
        //              {
        //                 'name': '画地为牢',
        //                 'type': '1',
        //                 'status': 'wei'
        //             },
        //             {
        //                 'name': '趁火打劫',
        //                 'type': '1',
        //                 'status': 'luan'
        //             },
        //             {
        //                 'name': '气冲斗牛',
        //                 'type': '1',
        //                 'status': 'qichong'
        //             },
        //              {
        //                 'name': '力劈华山',
        //                 'type': '1',
        //                 'status': 'lipi'
        //             },
        //         ]
        //     },
        //     {
        //         'name': '舞女',
        //         'id': '10078',
        //         'qixue': '0',
        //         'jingli': '0',
        //         'sudu': '1',
        //          'jineng': [  {
        //                 'name': '万剑归宗',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '妖火燎原',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '巫蛊极毒',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '龙腾一击',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '四面楚歌',
        //                 'type': '1',
        //                 'status': 'feng'
        //             },
        //              {
        //                 'name': '画地为牢',
        //                 'type': '1',
        //                 'status': 'wei'
        //             },
        //             {
        //                 'name': '趁火打劫',
        //                 'type': '1',
        //                 'status': 'luan'
        //             },
        //             {
        //                 'name': '气冲斗牛',
        //                 'type': '1',
        //                 'status': 'qichong'
        //             },
        //              {
        //                 'name': '力劈华山',
        //                 'type': '1',
        //                 'status': 'lipi'
        //             },
        //             ]
        //     },
        //     {
        //         'name': '舞女',
        //         'id': '10079',
        //         'qixue': '0',
        //         'jingli': '0',
        //         'sudu': '1',
        //          'jineng': [ 
        //               {
        //                 'name': '万剑归宗',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '妖火燎原',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //             {
        //                 'name': '巫蛊极毒',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '龙腾一击',
        //                 'type': '1',
        //                 'status': 'left'
        //             },
        //              {
        //                 'name': '四面楚歌',
        //                 'type': '1',
        //                 'status': 'feng'
        //             },
        //              {
        //                 'name': '画地为牢',
        //                 'type': '1',
        //                 'status': 'wei'
        //             },
        //             {
        //                 'name': '趁火打劫',
        //                 'type': '1',
        //                 'status': 'luan'
        //             },
        //             {
        //                 'name': '气冲斗牛',
        //                 'type': '1',
        //                 'status': 'qichong'
        //             },
        //              {
        //                 'name': '力劈华山',
        //                 'type': '1',
        //                 'status': 'lipi'
        //             },
        //             ]
        //     }
    ]


}