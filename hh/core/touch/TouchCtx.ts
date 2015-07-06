/**
 * Created by SmallAiTT on 2015/7/2.
 */
///<reference path="Touch.ts" />
///<reference path="../node/Node.ts" />
module hh{
    export class TouchCtx extends Emitter{
        static __className:string = "TouchCtx";

        _root:Node;
        /** 点击栈 */
        _touchStack:Touch[];
        _queue:any[];
        _canReceive:boolean;
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

        addTouchListener(engine:Engine):TouchCtx{
            var self = this, touchEle = engine._canvas;
            var queue = self._queue;
            // 统一将点击事件推送到队列中，再绘制之后才执行
            // 这样可以使用转换后的矩阵，提高性能
            touchEle.addEventListener("mousedown", function (event) {
                // 清空
                queue.length = 0;
                // 设置成可接收
                self._canReceive = true;
                var location = self._getLocation(touchEle, event);
                queue.push(self.onBegan, location);
            });
            touchEle.addEventListener("mousemove", function (event) {
                if(!self._canReceive) return;
                var location = self._getLocation(touchEle, event);
                queue.push(self.onMove, location);
            });
            touchEle.addEventListener("mouseup", function (event) {
                if(!self._canReceive) return;
                var location = self._getLocation(touchEle, event);
                queue.push(self.onEnd, location);
                self._canReceive = false;
            });

            return self;
        }

        setRoot(root:Node):TouchCtx{
            var self = this;
            self._root = root;
            return self;
        }

        onBegan(tx:number, ty:number):TouchCtx{
            var self = this, stack = self._touchStack, root = self._root;
            // 如果还未设置根节点则直接返回
            if(!root) return self;
            // 如果堆栈里面还有，则不执行，避免重复触发事件
            if(stack.length > 0) return self;
            var phase:number = 1;// 目标阶段
            if(root.touch.test(tx, ty, stack)){// 如果有节点在区域内
                // 从最顶层往下触发事件
                for (var i = stack.length - 1; i >= 0; i--) {
                    var handler:Touch = stack[i];
                    handler.onBegan(tx, ty, phase);
                    phase = 2;// 沿路阶段
                }
            }
        }

        onMove(tx:number, ty:number):TouchCtx{
            var self = this, stack = self._touchStack, root = self._root;
            // 如果还未设置根节点则直接返回
            if(!root) return self;
            // 注意了，move的时候，事件从底部往上传
            for (var i = 0, l_i = stack.length; i < l_i; i++) {
                var handler:Touch = stack[i];
                handler.onMove(tx, ty);
            }
            return self;
        }

        onEnd(tx:number, ty:number):TouchCtx{
            var self = this, stack = self._touchStack, root = self._root;
            // 如果还未设置根节点则直接返回
            if(!root) return self;

            var phase:number = 1;// 目标阶段
            var length = stack.length;
            // 现进行一次便利，处理出clip区域设定
            for(var i = 0; i < length - 1; ++i){
                var handler:Touch = stack[i];
                var target:Node = handler.target;
                if(target._nodeOpt.clip){
                    if(!handler.isIn(tx, ty)){
                        phase = 0;// 设置成出了区域状态
                        break;
                    }
                }
            }
            // 从最顶层往下触发事件，进行pop
            while(length > 0){
                var handler:Touch = stack.pop();
                length--;
                handler.onEnd(tx, ty, phase);
                phase = 2;// 沿路阶段
            }
            return self;
        }

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