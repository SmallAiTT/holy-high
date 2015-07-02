/**
 * Created by SmallAiTT on 2015/7/2.
 */
///<reference path="../ref.ts" />
///<reference path="../node/Node.ts" />
module hh{
    export class TouchHandler extends Emitter{
        static __className:string = "TouchHandler";

        enabled:boolean;
        childrenEnabled:boolean;
        target:Node;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.childrenEnabled = true;
        }

        isIn(tx:number, ty:number):boolean{
            return false;
        }
        test(tx:number, ty:number, stack:TouchHandler[]):Node{
            var self = this, target:Node = this.target;
            var result:Node;
            if(target){
                // 先将节点推入栈中
                stack.push(self);
                if(self.childrenEnabled){
                    var children = target._nodeOpt.children;
                    for (var i = 0, l_i = children.length; i < l_i; i++) {
                        var child:Node = children[i];
                        if(child){//遍历子节点
                            result = child._touchHandler.test(tx, ty, stack);
                            if(result) break;
                        }
                    }
                }
                if(!result){// 如果遍历了子节点还没获取
                    if(self.enabled && self.isIn(tx, ty)){// 如果当前节点正在点击区域内，则将返回结果指向当前节点
                        result = self.target;
                    }else{// 如果当前节点没有在点击区域内，就将堆栈pop出一个
                        stack.pop();
                    }
                }
            }
            return result;
        }
        onBegan(tx:number, ty:number, phase:number){}
        onEnd(tx:number, ty:number, phase:number){}
        onMove(tx:number, ty:number){}
        onFinish(tx:number, ty:number){}

        //@override
        _dtor(){
            super._dtor();
            var self = this;
            self.target = null;
        }
    }
}