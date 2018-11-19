$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;

  // 1.一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function ( info ) {
        var htmlStr = template("tmp", info);
        $('tbody').html( htmlStr );
        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  };

  
  // 给启用禁用按钮, 添加点击事件 (通过事件委托)
  $('.lt_content tbody').on("click", ".btn", function () {
    $('#userModal').modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  $('#confirmBtn').click(function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          $('#userModal').modal("hide");
          render();
        }
      }
    })
  })

})