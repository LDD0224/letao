$(function () {
  
  // 登录功能
  $('#loginBtn').click(function () {
    
    // 获取用户名 和 密码, 发送ajax
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    if ( username === "" ) {
      mui.toast("请输入用户名");
      return;
    }
    if ( password === "" ) {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function (info) {
        // 登录成功, 跳转到用户中心
        if ( info.success ) {

          // (1) 地址栏传递了 retUrl, 获取, 并且跳回去
          if ( location.search.indexOf("retUrl") != -1 ) {
            // 有传递 retUrl            
            var retUrl = location.search.replace("?resetUrl=", "");
            // 跳转到指定地址
            location.href = resetUrl;  
          } else {
            // (2) 地址栏没有 retUrl, 正常跳转到 user.html
            location.href = "user.html";            
          }          
        }
      if ( info.error ) {
        mui.toast("用户名或者密码错误");        
      }
      }
    })
  });
  
})