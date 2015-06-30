/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = sty.moduleName_transformations;

    unit.addMenuItem4Ctx('save-restore', function(ctx:IRenderingContext2D){
        ctx.fillRect(0,0,150,150);   // Draw a rectangle with default settings
        ctx.save();                  // Save the default state

        ctx.fillStyle = '#09F';      // Make changes to the settings
        ctx.fillRect(15,15,120,120); // Draw a rectangle with new settings

        ctx.save();                  // Save the current state
        ctx.fillStyle = '#FFFFFF';      // Make changes to the settings
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30,30,90,90);   // Draw a rectangle with new settings

        ctx.restore();               // Restore previous state
        ctx.fillRect(45,45,60,60);   // Draw a rectangle with restored settings

        ctx.restore();               // Restore original state
        ctx.fillRect(60,60,30,30);   // Draw a rectangle with restored settings
    });

    unit.addMenuItem4Ctx('translate', function(ctx:IRenderingContext2D){
        for (var i=0;i<3;i++) {
            for (var j = 0; j < 3; j++) {
                ctx.save();
                ctx.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ',255)';
                ctx.translate(10 + j * 50, 10 + i * 50);
                ctx.fillRect(0, 0, 25, 25);
                ctx.restore();
            }
        }
    });

    unit.addMenuItem4Ctx('rotate', function(ctx:IRenderingContext2D){
        // left rectangles, rotate from canvas origin
        ctx.save();
        // blue rect
        ctx.fillStyle = "#0095DD";
        ctx.fillRect(30,30, 100, 100);

        // 先进行旋转，这样接下来绘制的就自动旋转了。
        // 也就是说，旋转其实是对ctx进行旋转。
        ctx.rotate((Math.PI/180)*25);
        // grey rect
        ctx.fillStyle = "#4D4E53";
        ctx.fillRect(30,30, 100, 100);
        ctx.restore();

        // right rectangles, rotate from rectangle center
        // draw blue rect
        ctx.fillStyle = "#0095DD";
        ctx.fillRect(150, 30, 100, 100);

        ctx.translate(200, 80); // translate to rectangle center
                                // x = x + 0.5 * width
                                // y = y + 0.5 * height
        ctx.rotate((Math.PI/180)*25); // rotate
        ctx.translate(-200, -80); // translate back

        // draw grey rect
        ctx.fillStyle = "#4D4E53";
        ctx.fillRect(150, 30, 100, 100);
    });

    unit.addMenuItem4Ctx('scale', function(ctx:IRenderingContext2D){
        // draw a simple rectangle, but scale it.
        ctx.save();
        ctx.scale(10, 3);
        ctx.fillRect(1,10,10,10);
        ctx.restore();

        // mirror horizontally
        ctx.scale(-1, 1);
        ctx.font = "48px serif";
        ctx.fillText("MDN", -135, 120);
    });

    unit.addMenuItem4Ctx('transform', function(ctx:IRenderingContext2D){
        var sin = Math.sin(Math.PI/6);
        var cos = Math.cos(Math.PI/6);
        /*
         translate(e, f)
         transform(a, b, c, d, e, f)
         setTransform(a, b, c, d, e, f)
         resetTransform()

         a (m11) Horizontal scaling.
         b (m12) Horizontal skewing.
         c (m21) Vertical skewing.
         d (m22) Vertical scaling.
         e (dx) Horizontal moving.
         f (dy) Vertical moving.
         setTransform(a, b, c, d, e, f)
         */
        ctx.translate(100, 100);
        var c = 0;
        for (var i=0; i <= 12; i++) {
            c = Math.floor(255 / 12 * i);
            ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
            ctx.fillRect(0, 0, 100, 10);
            ctx.transform(cos, sin, -sin, cos, 0, 0);
        }

        ctx.setTransform(-1, 0, 0, 1, 100, 100);
        ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
        ctx.fillRect(0, 0, 100, 100);
    });

    unit.addMenuItem4Ctx('transform1', function(ctx:IRenderingContext2D){
        var sin = Math.sin(Math.PI/6);
        var cos = Math.cos(Math.PI/6);
        /*
         translate(e, f)
         transform(a, b, c, d, e, f)
         setTransform(a, b, c, d, e, f)
         resetTransform()

         a (m11) Horizontal scaling.
         b (m12) Horizontal skewing.
         c (m21) Vertical skewing.
         d (m22) Vertical scaling.
         e (dx) Horizontal moving.
         f (dy) Vertical moving.
         setTransform(a, b, c, d, e, f)
         */
        ctx.translate(100, 100);

        ctx.beginPath();
        ctx.moveTo(0, -100);
        ctx.lineTo(0, 500);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-100, 0);
        ctx.lineTo(500, 0);
        ctx.closePath();
        ctx.stroke();

        var x = 100, y = 100;
        var width= 100, height = 100;
        var anchorX = 0, anchorY = 1;
        var anchorOffsetX = width*anchorX, anchorOffsetY = height*anchorY;
        var pw = 10;

        ctx.translate(x, y);
        ctx.scale(2, 2);
        ctx.rotate(Math.PI/8);
        ctx.translate(-anchorOffsetX, -anchorOffsetY);

        ctx.strokeStyle = "red";
        ctx.strokeRect(0, 0, width, height);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(anchorOffsetX-pw/2, anchorOffsetY-pw/2, pw, pw);
    });
}