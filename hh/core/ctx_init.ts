/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="node/Node.ts" />
///<reference path="touch/TouchCtx.ts" />
module hh{
    var Eng = Engine;
    engine.on(Eng.__CLEAR_RECT, function(ctx:IRenderingContext2D){
        // 将矩阵还原
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // 擦除整个画布
        ctx.clearRect(0, 0, engine.design.width, engine.design.height);
    });
    // 初始化渲染上下文
    engine.once(Eng.__INIT_CTX, function(){
        // 初始化舞台
        var stage = engine.stage = new Node();
        stage.width = engine.design.width;
        stage.height = engine.design.height;
        stage.name = "stage";

        // 注册点击事件
        var touchCtx = engine["touchCtx"] = new TouchCtx();
        touchCtx.addTouchListener(engine);
    });
    // 先注册一个帧率显示以供使用
    engine.on(Eng.__DRAW_FPS, function(ctx:IRenderingContext2D, fps:number){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillText('FPS:'+fps, 10, 10);
        ctx.restore();
    });
}