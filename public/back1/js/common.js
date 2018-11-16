$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();    
  }, 500);
});

$(function () {
  
  $('.lt_aside .category').click(function () {
    $(this).next().stop().slideToggle();
  });

  $('.lt_topbar .icon_left').click(function () {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");    
  });

  $('.lt_topbar .icon_right').click(function () {
    $('#logoutModal').modal("show");
  });

  $('#logoutBtn').click(function () {
    
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          location.href = "login.html";
        }
      }
    })
  });

})