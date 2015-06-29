/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="node/Node.ts" />
module hh{
    var Eng = Engine;
    // 初始化渲染上下文
    engine.once(Eng.__INIT_CTX, function(){
        // 初始化舞台
        var stage = engine.stage = new Node();
        stage.width = engine.design.width;
        stage.height = engine.design.height;
        stage.name = "stage";

    });
}