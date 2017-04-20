$(function(){
    'use strict';
    function initHtml(datas){
        var html_ = '<tr title="'+ datas.id +'">'+
                        '<td>' +
							'<input type="checkbox" name="select" class="select">' +
							'<span class="number">'+ datas.id +'</span>' +
						'</td>' +
                        '<td>' +
						   '<input class="inp" type="text" value="'+ datas.classify +'" disabled>' +
						'</td>' +
						'<td>' +
						   '<input class="inp" type="text" value="'+ datas.title +'" disabled>' +
						'</td>' +
						'<td>' +
							'<input class="inp" type="text" value="'+ datas.grade +'" disabled>' +
						'</td>' +
						'<td>' +
							'<input class="inp" type="text" value="'+ datas.status +'" disabled>' +
						'</td>' +
						'<td>' +
							'<input class="inp" type="text" value="'+ datas.settime +'" disabled>' +
						'</td>' +
                        '<td>' +
                            '<input class="inp" type="text" value="'+ datas.creator +'" disabled>' +
						'</td>' +
                        '<td>' +
                            '<input class="inp" type="text" value="'+ datas.area +'" disabled>' +
						'</td>' +
						'<td>' +
							'<input type="button" value="删除" class="del" title="'+ datas.id +'">' +
						'</td>' +
					'</tr>';
		return html_;
    }
    function initPage(data){
		$("tbody").html("");
		$.each(data, function(key, val){
			$("tbody").append(initHtml(val));
		})		
	}
     initPage(data);//调用页面渲染接口/方法
    
    //按钮删除指定行
 	$("body").on("click", ".del", function(){
		var id = parseInt($(this).attr("title"));
		var ind = $(this).parent("td").parent("tr").index();
		for(var i = 0; i < data.length; i ++){
			if(id == data[i].id){
				data.splice(i, 1); // 删除第key个值  删除1个
			    $("tbody tr").eq(ind).remove();
			}			
		}
	})
    
    
    var id_ = null;
	
	$.each(data, function(key, val){
		if(id_ < val.id){
			id_ = val.id;
		}
	})

    function reHtml(data, class_) {
        data.unshift({
            id: id_,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            status: $(class_.status).val(),
            settime: $(class_.settime).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val()
        })
        $(".add input[type='text']").val("");
        initPage(data);
    }
        $(".addBtn").on("click", function () {
                  id_ = id_ + 1;
                var classNames = {
                    classify: '.classify',
                    title: '.title',
                    grade: '.grade',
                    status: '.status',
                    settime: '.settime',
                    creator: '.creator',
                    area: '.area'
                };
                reHtml(data,classNames);  
    })
    
    
    function dealList(data, status, fun){
		
		if(status){
			// 从小到大排序
			var emp = null;
			for(var i = 0; i < data.length; i ++){
				for(var j = i + 1; j < data.length; j ++){
					if(data[i].id > data[j].id){
						emp = data[i];
						data[i] = data[j];
						data[j] = emp;
					}
				}
			}			
		} else {
	    // 从大到小排序
		
			for(var i = 0; i < data.length; i ++){
				for(var j = i + 1; j < data.length; j ++){
					if(data[i].id < data[j].id){
						emp = data[i];
						data[i] = data[j];
						data[j] = emp;
					}
				}
			}			
		}

		fun();
		
	}
	
	
	$(".up").on("click", function(){
		if($(this).hasClass("h")){ // 反向
			dealList(data, true, function(){
				initPage(data);
			})			
			$(this).removeClass("h");
		} else {
			// 正向
			dealList(data, false, function(){
				initPage(data);
			})
			$(this).addClass("h");		
		}
	})
    
     var status = 0;  
    $("body").on("click",".checkbox",function(){ 
            if ($(".checkbox").is(':checked')) {  
                $(".select").attr('checked','checked');
                $(".box").val($(".checkbox").val());
                status = 0;  
            } else {  
                $(".select").removeAttr('checked');
                status = 1;  
            }  
    });
    
   $("body").on("change",".select",function(){
         var arr = [];
        $('input[name="select"]:checked').each(function() {
            arr.push($(this).siblings(".number").html());
        });
        $(".box").val(arr);
        if(status=1){
             $(".checkbox").removeAttr('checked');
        }
        
    })

	$("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
	
	
	var index = $("tr.bg").index();
	$(window).keydown(function(e){
		var key = e.keyCode;
		switch(key){
		    case 38:
				index = $("tr.bg").index();
				if(index > 0){
					index --;
				}
				$("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
			break;
			case 40:
				index = $("tr.bg").index();
				if(index < $('tbody tr').length - 1){
					index ++;
				}
				$("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");				
			break;
			case 8:
				var id = parseInt($("tbody tr.bg").attr("title"));
                var ind = $(this).parent("td").parent("tr").index();
                for(var i = 0; i < data.length; i ++){
                    if(id == data[i].id){
                        data.splice(i, 1); // 删除第key个值  删除1个
                        $("tbody tr").eq(ind).remove();
                    }			
                }
			break;
		}
	})
	
	
	$("body").on("click", "td", function(){
		$(this).children("input").removeAttr("disabled");
	})
	
	$("body").on("blur", "td", function(){
		$(this).children("input").attr("disabled", true);
	})	
})