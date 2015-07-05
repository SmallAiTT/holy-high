/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="node/Node.ts" />
///<reference path="touch/TouchCtx.ts" />
module hh{
    var Eng = Engine;
    engine.on(Eng.__CAL_CLIP, function(queue:Node[], eventType:string, engine:Engine){
        while(queue.length > 0){
            var clipNode:Node = queue.shift();// 裁剪节点
            if(!clipNode) continue;
            var nodeOpt = clipNode._nodeOpt;
            var children = nodeOpt.children;
            var matrix = nodeOpt.matrix;// 矩阵
            var renderQueue = engine._renderQueue;
            var rql = renderQueue.length;
            var index = 1;
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child:Node = children[i];
                if(!child) continue;
                var cOpt = child._nodeOpt;
                // TODO 这里缺少矩形相交判断逻辑实现

                var range:number[] = cOpt.renderQueueRange;
                for(var j = range[0]; j < range[1]; ++j){
                    renderQueue[j] = null;
                }
            }
        }
    });
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
        stage.anchorX = stage.anchorY = 0;
        stage.name = "stage";

        // 注册点击事件
        var touchCtx = engine["touchCtx"] = new TouchCtx();
        touchCtx.setRoot(stage).addTouchListener(engine);
        engine.on(Eng.__HANDLE_TOUCH, touchCtx._handle, touchCtx);
    });
    // 先注册一个帧率显示以供使用
    engine.on(Eng.__DRAW_FPS, function(ctx:IRenderingContext2D, fpsInfo:any){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillText('FPS:'+fpsInfo.fps + '|draw:' + fpsInfo.draw + '|cost:' + fpsInfo.transCost + ',' + fpsInfo.matrixCost + ',' + fpsInfo.clipCost + ',' + fpsInfo.renderCost + ',' + fpsInfo.touchCost, 10, 10);
        ctx.restore();
    });
}