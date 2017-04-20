$(function(){
    'use strict';

	// 初始化渲染页面
	selFun(data, appendHtml, "tbody");
	
	
	
    // 点击录入内容
	var classNames = { // 所有输入框class名
		classify: '.classify', 
		title: '.title', 
		grade: '.grade', 
		status: '.status',
        settime: '.settime', 
		creator: '.creator', 
		area: '.area'
	}; 
		
	$(".addBtn").on("click", function(){
		var val;
		if(empTest(classNames, ".error")){
			val = empTest(classNames, ".error");
			val['id'] = getId(data) + 1;
            data.push(val);
			selFun([val], appendHtml, "tbody");
			empInp(classNames);
		};
	})	

  $("body").on("click", ".del",function(){
        $(this).parent().parent().remove();
  })
  
  
  
  var status = false;  
    $("body").on("click","#select_all",function(){ 
            if (status) {  
                $("input[type='checkbox']").each(function() {  
                    this.checked = false;  
                });  
                status = false;  
            } else {  
                $("input[type='checkbox']").each(function() {  
                    this.checked = true;  
                });  
                status = true;  
            }  
    });
    
    $(".delet").on("click",function(){
      $('#select:checked').parent().parent().remove();
    });
    
    $("body").on("change",function(){
         var arr = [];
        $('input[name="select"]:checked').each(function() {
            arr.push($(this).siblings(".number").html());
        });
       $(".box").val(arr);
        
    })
   
})