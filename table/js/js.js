$(function() {
    'use strict';

    function appendHtml(datas) {
        var html_ = '<tr title="' + datas.id + '">' +
            '<td>' +
            '<input type="checkbox" name="ng" class="select" title="' + datas.id + '">' +
            '<span class="number">' + datas.id + '</span>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.classify + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.title + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.grade + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.status + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.settime + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.creator + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.area + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="button" value="删除" class="del" title="' + datas.id + '">' +
            '</td>' +
            '</tr>';
        return html_;
    }

    function rePage(data) {
        $("tbody").html("");
        $.each(data, function(key, val) {
            $("tbody").append(appendHtml(val));
        })
    }
    rePage(data); //调用页面渲染接口/方法

    //按钮删除指定行
    $("body").on("click", ".del", function() {
        var id = parseInt($(this).attr("title"));
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, 1); // 删除第key个值  删除1个
                $(this).parent("td").parent("tr").remove();
            }
        }
        $(".box").val("");
    })


   function getId(data){
		var id_ = null;
		$.each(data, function(key, val){
			if(id_ < val.id){
				id_ = val.id;
			}
		})
		
		return id_;
	}
    
    //录入以及录入以后清空输入框
    function reHtml(data, class_) {
        data.unshift({
            id: getId(data)+1,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            status: $(class_.status).val(),
            settime: $(class_.settime).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val()
        })
        $(".add input[type='text']").val("");
        rePage(data);
    }
    
    //判断录入模块是否为空
    
    $(".addBtn").on("click", function() {
        if ($(".classify").val() == "" || $(".title").val() == "" || $(".grade").val() == "" || $(".status").val() == "" || $(".settimetime").val() == "" || $(".creator").val() == "" || $(".area").val() == "") {
            $(".error").show();
        } else { //录入
            var classNames = {
                classify: '.classify',
                title: '.title',
                grade: '.grade',
                status: '.status',
                settime: '.settime',
                creator: '.creator',
                area: '.area'
            };
            reHtml(data, classNames);
            $(".checkbox").removeAttr("checked");
        }
    })


    function rank(data, status, fun) {

        if (status) {
            // 从小到大排序
            var empty = null;
            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id > data[j].id) {
                        empty = data[i];
                        data[i] = data[j];
                        data[j] = empty;
                    }
                }
            }
        } else {
            // 从大到小排序

            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id < data[j].id) {
                        empty = data[i];
                        data[i] = data[j];
                        data[j] = empty;
                    }
                }
            }
        }

        fun();

    }

    //点击排序
    
    $(".up").on("click", function() {
        if ($(this).hasClass("h")) { // 反向
            rank(data, true, function() {
                rePage(data);
            })
            $(this).removeClass("h");
        } else {
            // 正向
            rank(data, false, function() {
                rePage(data);
            })
            $(this).addClass("h");
        }
    })

    var status = 0;
    //全选/全不选

    $("body").on("click", ".checkbox", function() {
        if ($(".checkbox").is(':checked')) {
            $(".select").attr('checked', 'checked');
            $(".box").val($(".checkbox").val());
            status = 0;
        } else {
            $(".select").removeAttr('checked');
            status = 1;
        }
    });

    //获取被选中后的CheckBox同级的span的值

    $("body").on("change", ".select", function() {
        var arr = [];
        $('input[name="ng"]:checked').each(function() {
            arr.push($(this).siblings(".number").html());
        });
        $(".box").val(arr);
        if (status = 1) {
            $(".checkbox").removeAttr('checked');
        }

    })

    //全部删除
    $("body").on("click",".delete",function() {
        var id = parseInt($(".select").attr("title"));
        var len = $(".select:checked").length;
        $(".select:checked").parent("td").parent("tr").remove();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, len);
            }
        }
        $(".box").val("");
    })

    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");

    //键盘上下键，背景移动，delete键删除整行

    var ind = $("tr.bg").index();
    $(window).keydown(function(e) {
        var key = e.keyCode;
        switch (key) {
            case 38:
                ind = $("tr.bg").index();
                if (ind > 0) {
                    ind--;
                }
                $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 40:
                ind = $("tr.bg").index();
                if (ind < $('tbody tr').length - 1) {
                    ind++;
                }
                $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 46:
                var id = parseInt($("tbody tr.bg").attr("title"));
                if ($("tbody tr").hasClass("bg")) {
                    $("tbody tr").eq(ind).remove();
                }
                for (var i = 0; i < data.length; i++) {
                    if (id == data[i].id) {
                        data.splice(i, 1);
                    }
                }
                break;
        }
    })

    //单击修改
    $("body").on("click", "td", function() {
        $(".inp").removeAttr("disabled");
    })

    $("body").on("blur", "td", function() {
        $(".inp").attr("disabled", "disabled");
    })
})