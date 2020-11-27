$(function () {

    // 点击切换登录注册框
    $("#link_reg").on("click", function () {
        $(".login_box").hide()
        $(".reg_box").show()
    })
    $("#link_login").on("click", function () {
        $(".reg_box").hide()
        $(".login_box").show()
    })
    // 表单验证 自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 请确认密码校验规则
        repwd: function (value) {
            // 判等
            if (value !== $(".reg_box input[name=password]").val()) {
                return "两次输入的密码不一致"
            }
        }
    })
    var layer = layui.layer
    // 注册功能
    $("#form_reg").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg_box [name=username]").val(),
                password: $(".reg_box [name=password]").val()
            },
            success: function (res) {
                // console.log(res);
                // 判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功
                layer.msg("恭喜您注册成功！请登录")
                // 返回到登录页面
                $("#link_login").click()
                // 重置form表单
                $("#form_reg")[0].reset()
            }
        })
    })

    // 登录功能
    $("#form_login").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 发起请求
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                // 判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功
                layer.msg(res.message)
                // 保存token值到本地
                localStorage.setItem("token", res.token)
                // 跳转页面
                location.href = "/index.html"
            }
        })
    })
})