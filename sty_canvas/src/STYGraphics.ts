/**
 * Created by SmallAiTT on 2015/6/27.
 */
///<reference path="sty_canvas_init.ts" />
module sty_canvas{
    unit.curModuleName = moduleName_graphics;
    unit.addMenuItem('矩形', function(){
        var ctx = hh.context.canvasContext;
        // 进行颜色填充
        ctx.fillStyle='#FF0000';
        // 颜色填充还有以下几种方式
        //ctx.fillStyle = 'red';
        //ctx.fillStyle = 'rgb(255,0,0)';
        //ctx.fillStyle = 'rgba(255,0,0,0.5)';
        // 填充矩形
        ctx.fillRect(25,25,100,100);
        // 擦除矩形
        ctx.clearRect(45,45,60,60);
        // 镂空矩形
        ctx.strokeRect(50,50,50,50);
    }, unit.releaseDefault);

    unit.addMenuItem('直线', function(){
        var ctx = hh.context.canvasContext;
        ctx.moveTo(10,10);
        ctx.lineTo(150,50);
        ctx.lineTo(10,50);
        ctx.stroke();
    }, unit.releaseDefault);

    unit.addMenuItem('Path2D绘制三角形', function(){
        var ctx = hh.context.canvasContext;

        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 50);
        path2D.lineTo(100, 75);
        path2D.lineTo(100, 25);

        ctx.fill(path2D);
    }, unit.releaseDefault);

    unit.addMenuItem('Path2D绘制笑脸', function(){
        var ctx = hh.context.canvasContext;

        var path2D:Path2D = new Path2D();
        path2D.arc(75, 75, 50, 0, Math.PI*2);// outer circle
        path2D.moveTo(110, 75);
        path2D.arc(75, 75, 35, 0, Math.PI, false);// Mouth (clockwise)
        path2D.moveTo(65, 65);
        path2D.arc(60, 65, 5, 0, Math.PI*2, true);// Left eye
        path2D.moveTo(95, 65);
        path2D.arc(90, 65, 5, 0, Math.PI*2, false);// Right eye

        ctx.stroke(path2D);
    }, unit.releaseDefault);

    unit.addMenuItem('二次方贝塞尔曲线', function(){
        var ctx = hh.context.canvasContext;

        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 25);
        path2D.quadraticCurveTo(25, 25, 25, 62.5);
        path2D.quadraticCurveTo(25, 100, 50, 100);
        path2D.quadraticCurveTo(50, 120, 30, 125);
        path2D.quadraticCurveTo(60, 120, 65, 100);
        path2D.quadraticCurveTo(125, 100, 125, 62.5);
        path2D.quadraticCurveTo(125, 25, 75, 25);

        ctx.stroke(path2D);
    }, unit.releaseDefault);

    unit.addMenuItem('贝塞尔曲线', function(){
        var ctx = hh.context.canvasContext;

        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 40);
        path2D.bezierCurveTo(75, 37, 70, 25, 50, 25);
        path2D.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        path2D.bezierCurveTo(20, 80, 40, 102, 75, 120);
        path2D.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        path2D.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        path2D.bezierCurveTo(85, 25, 75, 37, 75, 40);

        ctx.stroke(path2D);
    }, unit.releaseDefault);

    unit.addMenuItem('圆形', function(){
        var ctx = hh.context.canvasContext;
        // 进行颜色填充
        ctx.fillStyle='#FF0000';
        // 绘制圆形区域
        ctx.beginPath();
        ctx.arc(70,18,15,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
    }, unit.releaseDefault);

    unit.addMenuItem('渐变', function() {
        var ctx = hh.context.canvasContext;
        var grd = ctx.createLinearGradient(0, 0, 175, 50);
        grd.addColorStop(0, '#FF0000');
        grd.addColorStop(1, '#00FF00');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 175, 50);
    }, unit.releaseDefault);
}