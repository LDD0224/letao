$(function () {
  
  // 1. 用户信息渲染(要求当前用户是登陆的)
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      // (1) 如果当前用户未登录, 后台返回 error
      if ( info.error === 400 ) {
        // 拦截跳转到登录页
        location.href = "login.html";
        return;
      }
      // (2) 如果当前用户已登录, 后台返回 当前用户信息, 进行渲染
      var htmlStr = template("infoTpl", info);
      $('#userInfo').html( htmlStr );
    }
  });


  // 2. 退出功能, 点击发送退出请求即可
  $('#logout').click(function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          // 退出成功, 跳转到登录页
          location.herf = "login.html";          
        }
      }
    })
  });

})