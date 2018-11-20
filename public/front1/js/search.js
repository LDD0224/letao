$(function () {
  
  /*
  由于我们都是进行的本地存储操作, 约定一个键名: search_list

  在控制台执行下面三句话, 用于添加假数据
  var arr = ["耐克", "阿迪", "耐克王", "阿迪王", "老北京" ];
  var jsonStr = JSON.stringify( arr );
  localStorage.setItem( "search_list", jsonStr )
  */

  render();

  // 功能1: 根据搜索历史, 进行渲染展示
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr =JSON.parse( jsonStr );
    return arr;
  }
  // 读取本地历史, 根据数组, 进行页面渲染
  function render() {
    var arr = getHistory();
    var htmlStr = template( "search_tpl", {list: arr} );
    $('.lt_history').html( htmlStr );
  };


  // 功能2: 清空所有历史
  $('.lt_history').on("click", ".btn_empty", function () {
    mui.confirm("你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function () {
      if ( e.index === 1 ) {
        localStorage.removeItem("search_list");
        render();
      }      
    })
  });


  // 功能3: 删除单个历史记录
  $('.lt_history').on("click", ".btn_delete", function () {
    var index = $(this).data("index");
    arr.splice( index, 1 );
    localStorage.setItem( "search_list", JSON.stringify(arr) );
    render();
  });


  // 功能4: 添加单个历史记录功能
  $('.search_btn').click(function () {
    var key = $('.search_input').val().trim();
    
    if ( key === "" ) {
      mui.toast("请输入搜索关键字");
      return;
    }
    var arr = getHistory();

    // 1. 如果有重复项, 需要先将重复项删除, 后面再添加到最前面
    var index = arr.indexOf(key);
    if ( index != -1 ) {
      arr.splice( index, 1 );
    }    
    // 2. 如果长度超过了 10个, 删除最后一个 pop()
    if ( arr.length >= 10 ) {
      arr.pop();
    }    

    // (3) 添加到数组的最前面  unshift
    arr.unshift( key );
    localStorage.setItem( "search_list", JSON.stringify(arr) );
    render();
    $('.search_input').val("");
    location.href = "searchList.html?key=" + key;
  });

})