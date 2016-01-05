/**
 * Created by SmallAiTT on 2015/7/2.
 */
module hh{
    export class TouchEvent extends Emitter{
        static BEGIN:string = 'touchBegin';
        static MOVE:string = 'touchMove';
        static END:string = 'touchEnd';
        static TAPING:string = 'touchTaping';
        static TAP:string = 'touchTap';

        x:number;
        y:number;

        stoped:boolean;
        stop(){
            this.stoped = true;
        }
    }

    export class TouchCtx extends Emitter{

        _root:Node;
        /** 点击栈 */
        _touchStack:Touch[];
        _queue:any[];
        _canReceive:boolean;
        _beginTempArr:Node[];
        _moveTempArr:Node[];
        _endTempArr:Node[];
        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._touchStack = [];
            self._queue = [];
        }

        _getLocation(touchEle, event):Point{
            var doc = document.documentElement;
            var win = window;
            var left, top, tx, ty;

            if (typeof touchEle.getBoundingClientRect === 'function') {
                var box = touchEle.getBoundingClientRect();
                left = box.left;
                top = box.top;
            } else {
                left = 0;
                top = 0;
            }

            left += win.pageXOffset - doc.clientLeft;
            top += win.pageYOffset - doc.clientTop;

            if (event.pageX != null) { //not avalable in <= IE8
                tx = event.pageX;
                ty = event.pageY;
            } else {
                left -= document.body.scrollLeft;
                top -= document.body.scrollTop;
                tx = event.clientX;
                ty = event.clientY;
            }
            var result = new Point(0, 0);
            // TODO 今后需要添加缩放
            result.x = (tx - left);
            result.y = (ty - top);
            return result;
        }

        _tempArr:any[];
        _tempArr2:any[];
        addTouchListener(engine:Engine):TouchCtx{
            var self = this, touchEle = engine._canvas;
            var transOpt = engine._transOpt;
            var queue = self._queue;
            var tempArr = self._tempArr = self._tempArr || [];
            var tempArr2 = self._tempArr2 = self._tempArr2 || [];
            var TE = TouchEvent;
            // 统一将点击事件推送到队列中，再绘制之后才执行
            // 这样可以使用转换后的矩阵，提高性能
            touchEle.addEventListener("mousedown", function (event) {
                // 鼠标开始点击的时候先清空缓存用的数组
                tempArr.length = 0;
                tempArr2.length = 0;
                // 获取到点击坐标
                var location = self._getLocation(touchEle, event);
                var x = location.x, y = location.y;

                var touchQueue = transOpt.touchQueue;
                for(var i = 0, l_i = touchQueue.length; i < l_i;){
                    // 做begin的点击处理
                    var node:Node = <Node>touchQueue[i++];
                    // 目标点击节点获取
                    if(tempArr2.indexOf(node) >= 0){
                        // 如果说已经在缓存队列中的话，就判断点击区域
                        if(node.touchTest(x, y)){
                            // 如果在点击区域内，那么就到处为止了，已经获取到了完整列表了
                            break;
                        }else{
                            // 不在点击区域内，则需要推出节点了
                            tempArr2.pop();
                        }
                    }else{
                        // 如果tempArr2里面还没有，那么就push进去
                        tempArr2.push(node);
                    }
                }

                var touchEvent:TouchEvent = new TE();
                touchEvent.x = x;
                touchEvent.y = y;
                for(var i = 0, l_i = tempArr2.length; i < l_i; ++i){
                    var node:Node = <Node>tempArr2[i];
                    tempArr.push(node);// 放到点击开始后列表中去
                    node.emit(TE.BEGIN, touchEvent);// 触发begin分发
                    if(touchEvent.stoped){
                        // 如果已经被阻止了就不继续遍历了，直接退出
                        break;
                    }
                }
            });
            touchEle.addEventListener("mousemove", function (event) {
                // 获取到点击坐标
                var location = self._getLocation(touchEle, event);
                var x = location.x, y = location.y;
                var touchEvent:TouchEvent = new TE();
                touchEvent.x = x;
                touchEvent.y = y;
                for(var i = 0, l_i = tempArr.length; i < l_i; ++i){
                    var node:Node = <Node>tempArr[i];
                    node.emit(TE.MOVE, touchEvent);// 触发begin分发
                    if(touchEvent.stoped){
                        // 如果已经被阻止了就不继续遍历了，直接退出
                        break;
                    }
                }
            });
            touchEle.addEventListener("mouseup", function (event) {
                // 获取到点击坐标
                var location = self._getLocation(touchEle, event);
                var x = location.x, y = location.y;
                var touchEvent:TouchEvent = new TE();
                touchEvent.x = x;
                touchEvent.y = y;
                for(var i = 0, l_i = tempArr.length; i < l_i; ++i){
                    var node:Node = <Node>tempArr[i];
                    node.emit(TE.END, touchEvent);// 触发begin分发
                    if(touchEvent.stoped){
                        // 如果已经被阻止了就不继续遍历了，直接退出
                        break;
                    }
                }

                // 分发tap事件
                var tapNode;
                touchEvent = new TE();
                touchEvent.x = x;
                touchEvent.y = y;
                // 在进行分发唯一的tap事件之前，需要先通过taping事件来确定最终的tap节点对象是谁
                for(var i = 0, l_i = tempArr.length; i < l_i; ++i){
                    var node:Node = <Node>tempArr[i];

                    if(node.hitTest(x, y)){
                        // 如果在点击区内
                        tapNode = node;// 那么就标记tap节点
                    }
                    // 这时候就需要看看
                    node.emit(TE.TAPING, touchEvent);// 触发begin分发
                    if(touchEvent.stoped){
                        // 如果已经被阻止了就不继续遍历了，直接退出
                        break;
                    }
                }

                if(tapNode) {// 如果存在tap目标节点，则进行tap
                    touchEvent = new TE();
                    touchEvent.x = x;
                    touchEvent.y = y;
                    tapNode.emit(TE.TAP, touchEvent);
                }
                
                // 鼠标结束点击的时候先清空缓存用的数组
                tempArr.length = 0;
                tempArr2.length = 0;
            });

            return self;
        }

        // addTouchListener(engine:Engine):TouchCtx{
        //     var self = this, touchEle = engine._canvas;
        //     var queue = self._queue;
        //     // 统一将点击事件推送到队列中，再绘制之后才执行
        //     // 这样可以使用转换后的矩阵，提高性能
        //     touchEle.addEventListener("mousedown", function (event) {
        //         // 清空
        //         queue.length = 0;
        //         // 设置成可接收
        //         self._canReceive = true;
        //         var location = self._getLocation(touchEle, event);
        //         queue.push(self.onBegan, location);
        //     });
        //     touchEle.addEventListener("mousemove", function (event) {
        //         if(!self._canReceive) return;
        //         var location = self._getLocation(touchEle, event);
        //         queue.push(self.onMove, location);
        //     });
        //     touchEle.addEventListener("mouseup", function (event) {
        //         if(!self._canReceive) return;
        //         var location = self._getLocation(touchEle, event);
        //         queue.push(self.onEnd, location);
        //         self._canReceive = false;
        //     });
        //
        //     return self;
        // }

        setRoot(root:Node):TouchCtx{
            var self = this;
            self._root = root;
            return self;
        }

        // onBegan(tx:number, ty:number):TouchCtx{
        //     var self = this, stack = self._touchStack, root = self._root;
        //     // 如果还未设置根节点则直接返回
        //     if(!root) return self;
        //     // 如果堆栈里面还有，则不执行，避免重复触发事件
        //     if(stack.length > 0) return self;
        //     var phase:number = 1;// 目标阶段
        //     if(root.touch.test(tx, ty, stack)){// 如果有节点在区域内
        //         // 从最顶层往下触发事件
        //         for (var i = stack.length - 1; i >= 0; i--) {
        //             var handler:Touch = stack[i];
        //             handler.onBegan(tx, ty, phase);
        //             phase = 2;// 沿路阶段
        //         }
        //     }
        // }
        //
        // onMove(tx:number, ty:number):TouchCtx{
        //     var self = this, stack = self._touchStack, root = self._root;
        //     // 如果还未设置根节点则直接返回
        //     if(!root) return self;
        //     // 注意了，move的时候，事件从底部往上传
        //     for (var i = 0, l_i = stack.length; i < l_i; i++) {
        //         var handler:Touch = stack[i];
        //         handler.onMove(tx, ty);
        //     }
        //     return self;
        // }
        //
        // onEnd(tx:number, ty:number):TouchCtx{
        //     var self = this, stack = self._touchStack, root = self._root;
        //     // 如果还未设置根节点则直接返回
        //     if(!root) return self;
        //
        //     var phase:number = 1;// 目标阶段
        //     var length = stack.length;
        //     // 现进行一次便利，处理出clip区域设定
        //     for(var i = 0; i < length - 1; ++i){
        //         var handler:Touch = stack[i];
        //         var target:Node = handler.target;
        //         if(target._nodeOpt.clip){
        //             if(!handler.isIn(tx, ty)){
        //                 phase = 0;// 设置成出了区域状态
        //                 break;
        //             }
        //         }
        //     }
        //     // 从最顶层往下触发事件，进行pop
        //     while(length > 0){
        //         var handler:Touch = stack.pop();
        //         length--;
        //         handler.onEnd(tx, ty, phase);
        //         phase = 2;// 沿路阶段
        //     }
        //     return self;
        // }

        _handle(){
            var self = this;
            var queue = self._queue;
            while(queue.length > 0){
                var func = queue.shift();
                var point = queue.shift();
                func.call(self, point.x, point.y);
            }
        }
    }
}
