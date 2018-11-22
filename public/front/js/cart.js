$(function () {
  
  // 一进入页面, 发送ajax请求, 获取购物车列表数据, 并渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function ( info ) {
        // (1) 当前用户未登录,  后台返回 error
        if ( info.error ) {
          // 拦截跳转到登录页
          location.href = "login.html?resetUrl=" + location.href;
          return;
        }
        // (2) 当前用户已登录,  后台返回 购物车数据, 进行渲染
        var htmlStr = template("cartTpl", { list: info });
        $('.lt_main .mui-scroll').html( htmlStr );
      }
    })
  };


  // 删除功能
  // (1) 通过事件委托给删除按钮, 添加点击事件
  $('.lt_main').on("click", ".btn_delete", function () {
    // (2) 获取需要删除的当前 id, 发送请求
    var id = $(this).data("id");

    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        // 后台要求传递的是数组 (衍生, 可以支持批量删除)
        id: [id]
      },
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          // (3) 删除成功, 页面重新渲染
          render();
        }
      }
    })
  });
  
})