(function($) {
  $.fn.menumaker = function(options) {
      var cssmenu = $(this), settings = $.extend({
        title: "",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
        $(this).find("#menu-button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
             mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');

        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            }
            else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($( window ).width() > 768) {
            cssmenu.find('ul').show();
          }

          if ($(window).width() <= 768) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
	$(document).ready(function(){
		  //根据路径判断已选模块
	  	  var openPath = window.location.href;
	  	  var moduleIndex = 0;

	  	  if(openPath.indexOf("vectormap")>0){
	  	  	moduleIndex = 1;
	  	  }else if(openPath.indexOf("resourcecenter")>0 || openPath.indexOf("servicecustomization")>0 || openPath.indexOf("geocoding")>0){
	  	  	moduleIndex = 2;
	  	  }else if(openPath.indexOf("vectorservice")>0 || openPath.indexOf("poisearchservices")>0 || openPath.indexOf("codeservices")>0){
	  	  	moduleIndex = 3;
	  	  }
	  	  //存放模块关系
	  	  window.Module = [];

		 $("#cssmenu").menumaker({
			title: "",
			format: "multitoggle"
		});
		var menuStr="";
		
		function hanleData(arrNode,type){
			if(arrNode){
				if(arrNode.children && arrNode.children[0]){
					menuStr +="<li class='"+(arrNode.active?"active":"")+((arrNode.children && arrNode.children.length>0)?" has-sub":"")+"'><a href='javascript:void(0)' datajson='"+JSON.stringify(arrNode)+"'>"+arrNode.name+"</a><ul>";
					for(var i=0;i<arrNode.children.length;i++){
						hanleData(arrNode.children[i],"sub");
					}
					menuStr+="</ul></li>";
				}else{
					if(type=="sub"){
						menuStr+="<li><a href='javascript:void(0)' datajson='"+JSON.stringify(arrNode)+"'>"+arrNode.name+"</a></li>";
					}else{
						menuStr+="<li class='"+(arrNode.active?"active":"")+((arrNode.children && arrNode.children.length>0)?" has-sub":"")+"'><a href='javascript:void(0)' datajson='"+JSON.stringify(arrNode)+"'>"+arrNode.name+"</a></li>";
					}
				}
			}else{
				console.log("未检测到数据");
			}
		}
		//@zyx
		function saveData(item){
			var one = {parent:null,children:null};
			if(item.children && item.children[0]){
				$(item.children).each(function(index,obj){
					one.parent = obj;
				})
			}
			window.Module.push(item);
		}

		if(menuJson && menuJson[0]){
			$.each(menuJson,function(a,item){
				//saveData(item);
				hanleData(item);
			});
		}
		if(menuStr){
			$("#cssmenu").find("ul").html(menuStr);
		}
		$("#cssmenu").prepend("<div id='menu-line'></div>");
 
		var activeElement, 
			linePosition = 0,
			menuLine = $("#cssmenu #menu-line"),
			lineWidth, 
			defaultPosition, 
			defaultWidth;

		$("#cssmenu > ul > li").each(function() {
			var childrens = $(this).parent().children();
			if($(this)[0] == childrens[moduleIndex]){
				$(this).addClass('active');
				activeElement = $(this);
				return false;
			}			
		});

		defaultWidth = lineWidth = activeElement.width();

		defaultPosition = linePosition = activeElement.position().left;

		menuLine.css("width", lineWidth);
		menuLine.css("left", linePosition);

		$("#cssmenu > ul > li").hover(function() {
			  activeElement = $(this);
			  lineWidth = activeElement.width();
			  linePosition = activeElement.position().left;
			  menuLine.css("width", lineWidth);
			  menuLine.css("left", linePosition);
			}, 
			function() {
			  menuLine.css("left", defaultPosition);
			  menuLine.css("width", defaultWidth);
			}
		);
		$("#cssmenu").delegate("li","click",function(){
			var jNode = $(this),
				datajson = jNode.children("a").attr("datajson");
			if(window.selectItem && datajson){				
				window.selectItem(JSON.parse(datajson));
			}
			
		});
	});

	window.selectItem = function(data){
       	if(!data.hasOwnProperty("children")){
       		if(window.location.href.indexOf("start.html")>0){
       			window.location = data.toLink;
       		}else{
       			window.location = "../" + data.toLink;
       		}      
        }
    }
})(jQuery);
