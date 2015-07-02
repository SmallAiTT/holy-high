/**
 * Created by SmallAiTT on 2015/7/2.
 */
///<reference path="TouchHandler.ts" />
///<reference path="../node/Node.ts" />
module hh{
    export class TouchCtx extends Emitter{
        static __className:string = "TouchCtx";

        _root:Node;
        /** 点击栈 */
        _touchStack:TouchHandler[];
        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._touchStack = [];
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
            touchEle.addEventListener("mousedown", function (event) {
                var location = self._getLocation(touchEle, event);
                self.onBegan(location.x, location.y);
            });
            touchEle.addEventListener("mousemove", function (event) {
                var location = self._getLocation(touchEle, event);
                self.onMove(location.x, location.y);
            });
            touchEle.addEventListener("mouseup", function (event) {
                var location = self._getLocation(touchEle, event);
                self.onEnd(location.x, location.y);
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
            if(root._touchHandler.test(tx, ty, stack)){// 如果有节点在区域内
                // 从最顶层往下触发事件
                for (var i = stack.length - 1; i >= 0; i--) {
                    var handler:TouchHandler = stack[i];
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
            return self;
        }

        onEnd(tx:number, ty:number):TouchCtx{
            var self = this, stack = self._touchStack, root = self._root;
            // 如果还未设置根节点则直接返回
            if(!root) return self;

            var phase:number = 1;// 目标阶段
            var length = stack.length;
            // 从最顶层往下触发事件，进行pop
            while(length > 0){
                var handler:TouchHandler = stack.pop();
                length--;
                handler.onEnd(tx, ty, phase);
                phase = 2;// 沿路阶段
            }
            return self;
        }
    }
}