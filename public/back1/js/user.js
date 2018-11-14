$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function ( info ) {
        // console.log(info);
        
        var htmlStr = template("tpl", info);
        $('.lt_content tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({

          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function ( a, b, c, page ) {
            currentPage = page;
            render();
          }          
        });
      }
    });
  }


  // 2. 通过事件委托给 按钮注册点击事件
  $('.lt_content tbody').on("click", ".btn", function () {
    
    $('#userModal').modal("show");

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    $('#subnitBtn').off("click").on("click", function () {
      
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (info) {
          if (info.success) {
            $('#userModal').modal("hide");
            render();
          }
        }
      })
    })
  });
  
})