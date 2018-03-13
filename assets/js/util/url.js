//  var localhost = "http://119.29.234.184:8080/hxsg/";
//   var localhost = "http://127.0.0.1:8080/";
//var localhost = "http://14k5392a14.imwork.net/";
// var loginZhuCe = localhost + "/zhuce/applogin";
function getData(zhuceJson) {
    ajax({
        type: 'GET',
        url: loginZhuCe,
        dataType: 'jsonp',
        data: zhuceJson,
        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        success: function (msg) {
            return msg;
        }
    });
}