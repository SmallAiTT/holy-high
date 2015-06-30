/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="node/Node.ts" />
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
    });
}