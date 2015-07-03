/**
 * Created by SmallAiTT on 2015/7/2.
 */
///<reference path="../ref.ts" />
///<reference path="../node/Node.ts" />
module hh{
    export class TouchHandler extends Emitter{
        static __className:string = "TouchHandler";

        static BEGAN:string = 'began';
        static MOVE:string = 'move';
        static END:string = 'end';
        static FINISH:string = 'finish';

        enabled:boolean;
        childrenEnabled:boolean;
        target:Node;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.childrenEnabled = true;
            self.enabled = true;
        }

        isIn(wx:number, wy:number):boolean{
            var target:Node = this.target;
            var nodeOpt = target._nodeOpt;
            var matrix:Matrix = nodeOpt.matrix;
            // 计算全局坐标映射到该节点之后的坐标
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            var lx = (c*(wy - ty) - d*(wx-tx))/(b*c - a*d);
            var ly = (a*(wy - ty) - b*(wx - tx))/(a*d-b*c);
            var w = nodeOpt.width, h = nodeOpt.height;
            return lx >= 0 && lx <= w && ly >= 0 && ly <= h;
        }
        test(wx:number, wy:number, stack:TouchHandler[]):Node{
            var self = this, target:Node = this.target;
            var result:Node;
            if(target && target._nodeOpt.visible){
                // 先将节点推入栈中
                stack.push(self);
                if(self.childrenEnabled){
                    var children = target._nodeOpt.children;
                    for (var i = 0, l_i = children.length; i < l_i; i++) {
                        var child:Node = children[i];
                        if(child){//遍历子节点
                            result = child.touchHandler.test(wx, wy, stack);
                            if(result) break;
                        }
                    }
                }
                if(!result){// 如果遍历了子节点还没获取
                    if(self.enabled && self.isIn(wx, wy)){// 如果当前节点正在点击区域内，则将返回结果指向当前节点
                        result = self.target;
                    }else{// 如果当前节点没有在点击区域内，就将堆栈pop出一个
                        stack.pop();
                    }
                }
            }
            return result;
        }
        onBegan(tx:number, ty:number, phase:number){
            var self = this, clazz = self.__class;
            self.emit(clazz.BEGAN, self, tx, ty, phase);
        }
        onEnd(tx:number, ty:number, phase:number){
            var self = this, clazz = self.__class;
            self.emit(clazz.END, self, tx, ty, phase);
        }
        onMove(tx:number, ty:number){
            var self = this, clazz = self.__class;
            self.emit(clazz.MOVE, self, tx, ty);
        }
        onFinish(tx:number, ty:number){
            var self = this, clazz = self.__class;
            self.emit(clazz.FINISH, self, tx, ty);
        }

        //@override
        _dtor(){
            super._dtor();
            var self = this;
            self.target = null;
        }
    }
}