/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    var Eng = Engine;

    var handleClip = function(matrix, dist1, centerPoint:number[], children:Node[], renderQueue:any[]){
        var cpx = centerPoint[0], cpy = centerPoint[1];
        for (var i = 0, l_i = children.length; i < l_i; i++) {
            var child:Node = children[i];
            if(!child) continue;
            var cOpt = child._nodeOpt;
            var cMatrix = cOpt.matrix;
            var cfpx = cMatrix.tx, cfpy = cMatrix.ty;
            var ccx = cOpt.width/2, ccy = cOpt.height/2;
            var ccpx = cMatrix.a * ccx + cMatrix.c * ccy + cMatrix.tx;
            var ccpy = cMatrix.b * ccx + cMatrix.d * ccy + cMatrix.ty;
            var dist2 = Math.sqrt((cfpx-ccpx)*(cfpx-ccpx) + (cfpy-ccpy)*(cfpy-ccpy));
            var dist3 = Math.sqrt((cpx-ccpx)*(cpx-ccpx) + (cpy-ccpy)*(cpy-ccpy));

            if(dist1 + dist2 < dist3){
                // 不相交
                var range:number[] = cOpt.renderQueueRange;
                for(var j = range[0]; j < range[1]; ++j){
                    renderQueue[j] = null;
                }
                for(var j = range[1]; j < range[2]; ++j){
                    renderQueue[j] = null;
                }
            }

            handleClip(matrix, dist1, centerPoint, cOpt.children, renderQueue);
        }
    };
    engine.on(Eng.__CAL_CLIP, function(queue:Node[], eventType:string, engine:Engine){
        while(queue.length > 0){
            var clipNode:Node = queue.shift();// 裁剪节点
            if(!clipNode) continue;
            var nodeOpt = clipNode._nodeOpt;
            var children = nodeOpt.children;
            var matrix = nodeOpt.matrix;// 矩阵
            var fpx = matrix.tx, fpy = matrix.ty;
            var cx = nodeOpt.width/2, cy = nodeOpt.height/2;
            var cpx = matrix.a * cx + matrix.c * cy + matrix.tx;
            var cpy = matrix.b * cx + matrix.d * cy + matrix.ty;
            var dist1 = Math.sqrt((fpx-cpx)*(fpx-cpx) + (fpy-cpy)*(fpy-cpy));

            handleClip(matrix, dist1, [cpx, cpy], children, engine._renderQueue);
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
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = 'red';
        ctx.font = "30px serif";
        ctx.fillText('FPS:'+fpsInfo.fps + '|draw:' + fpsInfo.draw + '|cost:' + fpsInfo.transCost + ',' + fpsInfo.matrixCost + ',' + fpsInfo.clipCost + ',' + fpsInfo.renderCost + ',' + fpsInfo.touchCost, 10, 30);
        ctx.restore();
    });
}
