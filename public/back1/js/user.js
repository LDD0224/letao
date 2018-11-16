$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;

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
        $('#paginator').bootstarpPaginator({
          bootstarpMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size );
        })        
      }
    })
  };

})