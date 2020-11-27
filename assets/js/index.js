$(function () {
    // 获取用户信息
    getUserInfo()
    // 退出功能
    $("#btnLogout").on("click", function () {
        // layui内置提示方法
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地
            localStorage.removeItem("token")
            // 跳转页面
            location.href="/login.html"
            // 关闭询问框
            layer.close(index);
        });
    })
})

// 函数封装在外面 后面要使用
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return "获取用户信息失败！"
            }
            // 请求成功 渲染头像区域
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 用户名 有昵称有限使用昵称
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)

    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show()
        $(".text-avatar").hide()
    } else {
        // 没有头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".text-avatar").show().html(text)
    }
}