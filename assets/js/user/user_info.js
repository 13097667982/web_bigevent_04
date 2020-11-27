$(function () {
    // 表单校验
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称为1~6个字符"
            }
        }
    })
    // 渲染表单
    initUserInfo()
    function initUserInfo() {
        // 发起ajax请求
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                // 获取成功 渲染
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 重置功能
    $("#formReset").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 修改用户信息功能
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您,修改成功！")
                // 渲染
                window.parent.getUserInfo()
            }
        })
    })
})
