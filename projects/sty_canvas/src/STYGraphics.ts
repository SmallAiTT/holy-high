/**
 * Created by SmallAiTT on 2015/6/27.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = moduleName_graphics;
    unit.addMenuItem4Ctx('矩形', function(ctx:IRenderingContext2D){
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
    });

    unit.addMenuItem4Ctx('直线', function(ctx:IRenderingContext2D){
        ctx.moveTo(10,10);
        ctx.lineTo(150,50);
        ctx.lineTo(10,50);
        ctx.stroke();
    });

    unit.addMenuItem4Ctx('Path2D绘制三角形', function(ctx:IRenderingContext2D){
        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 50);
        path2D.lineTo(100, 75);
        path2D.lineTo(100, 25);

        ctx.fill(path2D);
    });

    unit.addMenuItem4Ctx('Path2D绘制笑脸', function(ctx:IRenderingContext2D){
        var path2D:Path2D = new Path2D();
        path2D.arc(75, 75, 50, 0, Math.PI*2);// outer circle
        path2D.moveTo(110, 75);
        path2D.arc(75, 75, 35, 0, Math.PI, false);// Mouth (clockwise)
        path2D.moveTo(65, 65);
        path2D.arc(60, 65, 5, 0, Math.PI*2, true);// Left eye
        path2D.moveTo(95, 65);
        path2D.arc(90, 65, 5, 0, Math.PI*2, false);// Right eye

        ctx.stroke(path2D);
    });

    unit.addMenuItem4Ctx('二次方贝塞尔曲线', function(ctx:IRenderingContext2D){
        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 25);
        path2D.quadraticCurveTo(25, 25, 25, 62.5);
        path2D.quadraticCurveTo(25, 100, 50, 100);
        path2D.quadraticCurveTo(50, 120, 30, 125);
        path2D.quadraticCurveTo(60, 120, 65, 100);
        path2D.quadraticCurveTo(125, 100, 125, 62.5);
        path2D.quadraticCurveTo(125, 25, 75, 25);

        ctx.stroke(path2D);
    });

    unit.addMenuItem4Ctx('贝塞尔曲线', function(ctx:IRenderingContext2D){
        var path2D:Path2D = new Path2D();
        path2D.moveTo(75, 40);
        path2D.bezierCurveTo(75, 37, 70, 25, 50, 25);
        path2D.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        path2D.bezierCurveTo(20, 80, 40, 102, 75, 120);
        path2D.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        path2D.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        path2D.bezierCurveTo(85, 25, 75, 37, 75, 40);

        ctx.stroke(path2D);
    });

    unit.addMenuItem4Ctx('线结束表现', function(ctx:IRenderingContext2D){
        var lineCap = ['butt','round','square'];
        // Draw guides
        ctx.strokeStyle = '#09f';
        ctx.beginPath();
        ctx.moveTo(10,10);
        ctx.lineTo(140,10);
        ctx.moveTo(10,140);
        ctx.lineTo(140,140);
        ctx.stroke();

        // Draw lines
        ctx.strokeStyle = 'black';
        for (var i=0;i<lineCap.length;i++) {
            ctx.lineWidth = 15;
            ctx.lineCap = lineCap[i];
            ctx.beginPath();
            ctx.moveTo(25 + i * 50, 10);
            ctx.lineTo(25 + i * 50, 140);
            ctx.stroke();
        }
    });

    unit.addMenuItem4Ctx('线衔接表现', function(ctx:IRenderingContext2D){
        var ctx = hh.engine.canvasCtx;
        var lineJoin = ['round','bevel','miter'];
        ctx.lineWidth = 10;
        for (var i=0;i<lineJoin.length;i++){
            ctx.lineJoin = lineJoin[i];
            ctx.beginPath();
            ctx.moveTo(-5,5+i*40);
            ctx.lineTo(35,45+i*40);
            ctx.lineTo(75,5+i*40);
            ctx.lineTo(115,45+i*40);
            ctx.lineTo(155,5+i*40);
            ctx.stroke();
        }
    });

    unit.addMenuItem4Ctx('setLineDash', function(ctx:IRenderingContext2D, param){
        var offset = 0;

        function draw() {
            var canvas = hh.engine._canvas;
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.setLineDash([4, 2]);
            ctx.lineDashOffset = -offset;
            ctx.strokeRect(10,10, 100, 100);
        }

        function march() {
            offset++;
            if (offset > 16) {
                offset = 0;
            }
            draw();
        }

        param.func = march;
        hh.tick(march);
    }, function(param){
        hh.unTick(param.func);
    });

    unit.addMenuItem4Ctx('线性渐变', function(ctx:IRenderingContext2D) {
        // Create gradients
        var lingrad = ctx.createLinearGradient(0,0,0,150);
        lingrad.addColorStop(0, '#00ABEB');
        lingrad.addColorStop(0.5, '#fff');
        lingrad.addColorStop(0.5, '#26C000');
        lingrad.addColorStop(1, '#fff');

        var lingrad2 = ctx.createLinearGradient(0,50,0,95);
        lingrad2.addColorStop(0.5, '#000');
        lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

        // assign gradients to fill and stroke styles
        ctx.fillStyle = lingrad;
        ctx.strokeStyle = lingrad2;

        // draw shapes
        ctx.fillRect(10,10,130,130);
        ctx.strokeRect(50,50,50,50);
    });

    unit.addMenuItem4Ctx('放射渐变', function(ctx:IRenderingContext2D) {
        // Create gradients
        // 参数为两个圆，(x1,y1,r1)-(x2,y2,r2)
        var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
        radgrad.addColorStop(0, '#A7D30C');
        radgrad.addColorStop(0.9, '#019F62');
        radgrad.addColorStop(1, 'rgba(1,159,98,0)');

        var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
        radgrad2.addColorStop(0, '#FF5F98');
        radgrad2.addColorStop(0.75, '#FF0188');
        radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

        var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
        radgrad3.addColorStop(0, '#00C9FF');
        radgrad3.addColorStop(0.8, '#00B5E2');
        radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

        var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
        radgrad4.addColorStop(0, '#F4F201');
        radgrad4.addColorStop(0.8, '#E4C700');
        radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

        // draw shapes
        ctx.fillStyle = radgrad4;
        ctx.fillRect(0,0,150,150);
        ctx.fillStyle = radgrad3;
        ctx.fillRect(0,0,150,150);
        ctx.fillStyle = radgrad2;
        ctx.fillRect(0,0,150,150);
        ctx.fillStyle = radgrad;
        ctx.fillRect(0,0,150,150);
    });

    unit.addMenuItem4Ctx('图案 createPattern', function(ctx:IRenderingContext2D) {
        // create new image object to use as pattern
        var img = new Image();
        img.src = resHelper.getS9gUrl(1);
        img.onload = function(){

            // create pattern
            var ptrn = ctx.createPattern(img,'repeat');
            ctx.fillStyle = ptrn;
            ctx.fillRect(0,0,150,150);

        }
    });

    unit.addMenuItem4Ctx('阴影 Shadows', function(ctx:IRenderingContext2D) {
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

        ctx.font = "20px Times New Roman";
        ctx.fillStyle = "Black";
        ctx.fillText("Sample String", 5, 30);

        ctx.fillRect(100, 100, 100, 100);
    });

    unit.addMenuItem4Ctx('Canvas fill rules', function(ctx:IRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, Math.PI*2);
        ctx.arc(50, 50, 15, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill("nonzero");

        ctx.beginPath();
        ctx.arc(150, 150, 30, 0, Math.PI*2);
        ctx.arc(150, 150, 15, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill("evenodd");
    });
}