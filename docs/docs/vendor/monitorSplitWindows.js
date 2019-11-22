/**
 * name:   monitorSplitWindows.js
 * route:   /static/js/control/ui
 * author:  luozhubang
 * date:    2016-10-26
 * function: 监听窗口拖动事件，依赖于/static/js/control/ui/DynamicWindow.js,
 *
 */
function initSplit(dragFinishedFun){
    //拖拽完成事件
    var dragFinished = dragFinishedFun;

    //鼠标横向、竖向操作对象
    var thisTransverseObject,thisVerticalObject;
    //文档对象
    var doc= window;
    //横向分割栏
    var transverseLabels= $(".hj-wrap").find('.hj-transverse-split-label');
    //竖向分割栏
    var verticalLabels= $(".hj-wrap").find('.hj-vertical-split-label');

    // if($(".hj-wrap").length>0){
    //     for(var i=0;i<$(".hj-wrap").length;i++){
            // var hjDivNums = $($(".hj-wrap")[i]).children(".hj-transverse-split-div");
            // var defaultWidth =Math.floor(100/hjDivNums.length);
            // $($(".hj-wrap")[i]).children(".hj-transverse-split-div").width(defaultWidth-1+"%");
    //     }
    // }
    //定义一个对象
    function PointerObject(){
        this.el = null;//当前鼠标选择的对象
        this.clickX =0;//鼠标横向初始位置
        this.clickY =0;//鼠标竖向初始位置
        this.transverseDragging=false;//判断鼠标可否横向拖动
        this.verticalDragging=false;//判断鼠标可否竖向拖动
    }
    //横向分隔栏绑定事件
    transverseLabels.bind('mousedown',function(e){
        thisTransverseObject = new PointerObject();
        thisTransverseObject.transverseDragging  = true;//鼠标可横向拖动
        thisTransverseObject.el = this;
        thisTransverseObject.clickX = e.pageX;//记录鼠标横向初始位置

        $('#map-iframe').css("pointer-events","none");
    });

    //竖向分隔栏绑定事件
    verticalLabels.bind('mousedown',function(e){
        //console.log("mousedown");
        thisVerticalObject = new PointerObject();
        thisVerticalObject.verticalDragging  = true;//鼠标可竖向拖动
        thisVerticalObject.el = this;
        thisVerticalObject.clickY = e.pageY;//记录鼠标竖向初始位置
    });

    doc.onmousemove = function(e){
        var leftDiv = $('.hj-transverse-split-div-left');
        var splitLabel = $('#splitLabel');

        //鼠标横向拖动
        if(thisTransverseObject != null){
            if (thisTransverseObject.transverseDragging) {
                var changeDistance = 0;
                var nextWidth = $(thisTransverseObject.el).next().width();
                var prevWidth = $(thisTransverseObject.el).prev().width();
                if(thisTransverseObject.clickX>=e.pageX){
                    //鼠标向左移动
                    changeDistance = Number(thisTransverseObject.clickX)-Number(e.pageX);
                    if($(thisTransverseObject.el).prev().width()-changeDistance<20){

                    }else{
                        $(thisTransverseObject.el).prev().width($(thisTransverseObject.el).prev().width()-changeDistance);
                        $(thisTransverseObject.el).next().width($(thisTransverseObject.el).next().width()+changeDistance);
                        thisTransverseObject.clickX=e.pageX;

                        if(leftDiv.length > 0){
                            leftDiv.width($(thisTransverseObject.el).prev().width());
                        }

                        if(splitLabel.length>0){
                            splitLabel.css('left',$(thisTransverseObject.el).prev().width()-8);
                        }

                    }
                }else{

                    //鼠标向右移动
                    changeDistance = Number(e.pageX)-Number(thisTransverseObject.clickX);
                    if($(thisTransverseObject.el).next().width()-changeDistance<20){

                    }else{
                        $(thisTransverseObject.el).prev().width($(thisTransverseObject.el).prev().width()+changeDistance);
                        $(thisTransverseObject.el).next().width($(thisTransverseObject.el).next().width()-changeDistance);
                        thisTransverseObject.clickX=e.pageX;

                        if(leftDiv.length > 0){
                            leftDiv.width($(thisTransverseObject.el).prev().width());
                        }
                        if(splitLabel.length>0){
                            splitLabel.css('left',$(thisTransverseObject.el).prev().width()-8);
                        }
                    }
                }
            }
        }
        //鼠标竖向拖动
        if(thisVerticalObject != null){
            if (thisVerticalObject.verticalDragging) {
                var changeDistance = 0;
                var nextheight = $(thisVerticalObject.el).next().height();
                var prevheight = $(thisVerticalObject.el).prev().height();
                if(thisVerticalObject.clickY>=e.pageY){
                    //鼠标向上移动
                    changeDistance = Number(thisVerticalObject.clickY)-Number(e.pageY);
                    if($(thisVerticalObject.el).prev().height()-changeDistance<20){

                    }else{
                        $(thisVerticalObject.el).prev().height($(thisVerticalObject.el).prev().height()-changeDistance);
                        $(thisVerticalObject.el).next().height($(thisVerticalObject.el).next().height()+changeDistance);
                        thisVerticalObject.clickY=e.pageY;
                        $(thisVerticalObject.el).offset({top:e.pageY-4});
                    }
                }else{
                    //鼠标向下移动
                    changeDistance = Number(e.pageY)-Number(thisVerticalObject.clickY);
                    if($(thisVerticalObject.el).next().height()-changeDistance<20){

                    }else{
                        $(thisVerticalObject.el).prev().height($(thisVerticalObject.el).prev().height()+changeDistance);
                        $(thisVerticalObject.el).next().height($(thisVerticalObject.el).next().height()-changeDistance);
                        thisVerticalObject.clickY=e.pageY;
                        $(thisVerticalObject.el).offset({top:e.pageY-4});
                    }
                }
                // $(thisVerticalObject.el).height(10);
            }
        }
    };

    $(doc).mouseup(function(e) {
        if (thisTransverseObject != null) {
            $('#map-iframe').css("pointer-events","auto");
            thisTransverseObject.transverseDragging = false;
            thisTransverseObject = null;
            if(dragFinished){
                dragFinished();
            }
        }
        if (thisVerticalObject != null) {
            thisVerticalObject.verticalDragging = false;
            thisVerticalObject = null;
            if(dragFinished){
                dragFinished();
            }
        }

        e.cancelBubble = true;
    });
};