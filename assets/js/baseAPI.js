$(function () {
    // 拼接url地址
    var baseURL = "http://ajax.frontend.itheima.net"
    // jq在发起ajax请求时 都会先执行过滤函数
    $.ajaxPrefilter(function (params) {
        // 拼接路径
        params.url = baseURL + params.url
        // 对需要权限的借口配置头部信息
        if (params.url.indexOf("/my/") !== -1) {
            // 路径中包含/my/字符串
            params.headers = {
                Authorization: localStorage.getItem("token") || ""
            }
        }
        // 3.防止用户在登录页面未输入账号密码就访问后台主页
        // 拦截所有响应
        params.complete = function (res) {
            // console.log(res);
            var obj = res.responseJSON
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                // 强制清空本地token值  返回登录页面
                localStorage.removeItem("token")
                location.href = "/login.html"
            }
        }
    })


})