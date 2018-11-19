$(function () {
  
  // 1. 一进入页面, 请求左侧一级分类数据, 进行渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function ( info ) {
      console.log(info);
      
      var htmlStr = template("left_tpl", info);
      $('.lt_category_left ul').html( htmlStr );
      renderById( info.rows[0].id );
    }
  });

  //2. 给左侧添加点击事件, 通过事件委托实现
  $('.lt_category_left').on("click", "a", function () {
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    var id = $(this).data("id");
    renderById(id);
  });
  // 根据 一级分类的 id 渲染 二级分类
  function renderById() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function () {
        var htmlStr = template("right_tpl", info);
        $('.lt_category_right ul').html( htmlStr );
      }
    })
  };
  
})