/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = sty.moduleName_text;

    unit.addMenuItem4Ctx('普通文本', function(ctx:RenderingContext2D){
        ctx.font = "48px serif";
        // text, x, y [, maxWidth]
        ctx.fillText("Hello world", 10, 50);
        ctx.fillText("Hello world", 10, 100, 100);
    });

    unit.addMenuItem4Ctx('文本边框——strokeText', function(ctx:RenderingContext2D){
        // A DOMString parsed as CSS font value. The default font is 10px sans-serif.
        ctx.font = "48px serif";
        // text, x, y [, maxWidth]
        ctx.strokeText("Hello world", 10, 50);
        ctx.strokeText("Hello world", 10, 100, 100);
    });

    unit.addMenuItem4Ctx('文本边框——textAlign', function(ctx:RenderingContext2D){
        // A DOMString parsed as CSS font value. The default font is 10px sans-serif.
        ctx.font = "48px serif";
        ctx.fillStyle = "red";

        var arr = ["默认", "start", "end", "left", "right", "center"];
        for (var i = 0, l_i = arr.length; i < l_i; i++) {
            var y = 50*(i+1);
            var obj = arr[i];
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1000, y);
            ctx.closePath();
            ctx.stroke();
            if(i != 0){
                ctx.textAlign = obj;
            }
            ctx.fillText(obj, 300, y);
        }
    });

    unit.addMenuItem4Ctx('文本边框——textBaseline', function(ctx:RenderingContext2D){
        // A DOMString parsed as CSS font value. The default font is 10px sans-serif.
        ctx.font = "48px serif";
        ctx.fillStyle = "red";

        var arr = ["默认", "top", "hanging", "middle", "alphabetic", "ideographic", "bottom"];
        for (var i = 0, l_i = arr.length; i < l_i; i++) {
            var y = 50*(i+1);
            var obj = arr[i];
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1000, y);
            ctx.closePath();
            ctx.stroke();
            if(i != 0){
                ctx.textAlign = obj;
            }

            var obj = arr[i];
            ctx.textBaseline = obj;
            ctx.fillText(obj, 300, y);
        }
    });

    unit.addMenuItem4Ctx('文本边框——direction（未全面支持）', function(ctx:RenderingContext2D){
        // A DOMString parsed as CSS font value. The default font is 10px sans-serif.
        ctx.font = "48px serif";
        ctx.fillStyle = "red";

        var arr = ["默认", "ltr", "rtl", "inherit"];
        for (var i = 0, l_i = arr.length; i < l_i; i++) {
            var y = 50*(i+1);
            var obj = arr[i];
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1000, y);
            ctx.closePath();
            ctx.stroke();
            if(i != 0){
                ctx.direction = obj;
            }
            ctx.fillText(obj, 300, y);
        }
    });

    unit.addMenuItem4Ctx('文本尺寸——measureText', function(ctx:RenderingContext2D){
        // A DOMString parsed as CSS font value. The default font is 10px sans-serif.
        ctx.font = "48px serif";
        ctx.fillStyle = "red";

        ctx.fillText("文本尺寸", 300, 50);
        var text = ctx.measureText("文本尺寸"); // TextMetrics object
        ctx.font = "20px serif";
        ctx.fillText(JSON.stringify(text), 0, 100);
    });

}