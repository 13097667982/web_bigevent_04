$(function () {
    // 拼接url地址
    var baseURL = "http://ajax.frontend.itheima.net"
    // jq在发起ajax请求时 都会先执行过滤函数
    $.ajaxPrefilter(function (params) {
        params.url = baseURL + params.url
    })
})