/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = moduleName_aria = "ARIA";

    unit.addMenuItem4Ctx('ARIA', function(ctx:IRenderingContext2D){
        ctx.beginPath();
        ctx.arc(70, 80, 10, 0, 2 * Math.PI, false);
        ctx.fill();
        console.log('目前好像还不支持');
        if((<any>ctx).addHitRegion) (<any>ctx).addHitRegion({id: "circle"});

        var canvas = hh.engine._canvas;
        canvas.addEventListener("mousemove", function(event){
            if(event.region) {
                alert("hit region: " + event.region);
            }
        });
    });
}