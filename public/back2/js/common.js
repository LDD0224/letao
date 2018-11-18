$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();    
  }, 500);
});


$(function () {
  
  // 功能1: 导航点击切换功能
  $('.lt_aside .category').click(function () {
    $(this).next().stop().slideToggle();
  });

  // 功能2: 左侧菜单列表切换功能
  $('.lt_topbar .icon_left').click(function () {
    
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");    
  });

  // 功能3: 退出功能
  $('.lt_topbar .icon_right').click(function () {
    $('#logoutModal').modal("show");
  });

  // 模态框的按钮点击事件
  $('#logoutBtn').click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function ( info ) {
        if ( info.success ) {
          location.href = "login.html";
        }
      }
    })
  });
  
})