$(function () {
  
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];
  // 1. 一进入页面, 发送请求, 渲染页面
  render();
  
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("productTpl", info);
        $('tbody').html(htmlStr);
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


  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 20
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });


  // 3. 通过事件委托, 给所有dropdown里面的 a 添加点击事件
  $('.dropdown-menu').on("click", "a", function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");    
  });


  // 4. 进行文件上传配置
  $('#fileupload').fileupload({
    dataType: "json",
    done: function (e,data) {
     var picObj = data.result;
     var picUrl = picObj.picAddr;
     picArr.unshift(picObj);
     $('#imgBox').prepend('<img src="'+ picUrl +'" style="height: 100px>'); 
     
     if ( picArr.length === 3 ) {
       $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
     }
    }
  });


  // 5. 进行表单校验初始化
  $('#form').bootstrapValidator({
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },

      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },

      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存数量"
          },
          // 正则校验, 非零开头的数字
          // \d =>  数字 0-9
          // * 表示出现 0 个 或 多个
          // ? 表示出现 0 个 或 1个
          // + 表示出现 1 个 或 多个
          // {m,n} 从 m 个 到 n 个
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数字'
          }
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: "请输入尺码"
          },
          // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式,  xx两位数字'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },

      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      // 专门用于标记文件上传是否满 3张 的
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }    
  });
  
  
  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();

    var params = $('#form').serialize();
    params += "&picName1" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr; 
    
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: params,
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          $('#addModal').modal("hide");
          currentPage = 1;
          render();
          $('#form').data("bootstrapValidator").resetForm(true);
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  });

})