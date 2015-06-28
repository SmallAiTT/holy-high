/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = moduleName_clip;

    unit.addMenuItem4Ctx('裁剪', function(ctx:RenderingContext2D){

        // 绘制星星
        function drawStar(ctx,r){
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(r,0);
            for (var i=0;i<9;i++){
                ctx.rotate(Math.PI/5);
                if(i%2 === 0) {
                    ctx.lineTo((r/0.525731)*0.200811,0);
                } else {
                    ctx.lineTo(r,0);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // 先绘制了一个黑色的矩形区域
        ctx.fillRect(0,0,150,150);
        // 坐标转移到矩形中心位置
        ctx.translate(75,75);

        // 创建一个圆形的裁剪区，以后绘制的东西只会出现在该区域内
        // Create a circular clipping path
        ctx.beginPath();
        ctx.arc(0,0,60,0,Math.PI*2,true);
        ctx.clip();

        // 绘制内部蓝色的背景
        // draw background
        var lingrad = ctx.createLinearGradient(0,-75,0,75);
        lingrad.addColorStop(0, '#232256');
        lingrad.addColorStop(1, '#143778');

        ctx.fillStyle = lingrad;
        ctx.fillRect(-75,-75,150,150);

        // draw stars
        for (var j=1;j<50;j++){
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.translate(75-Math.floor(Math.random()*150),
                75-Math.floor(Math.random()*150));
            drawStar(ctx,Math.floor(Math.random()*4)+2);
            ctx.restore();
        }
    });
}