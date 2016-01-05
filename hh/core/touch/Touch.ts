/**
 * Created by SmallAiTT on 2015/7/2.
 */
module hh{
    export class Touch extends Emitter{
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
            var w = nodeOpt.w, h = nodeOpt.h;
            return lx >= 0 && lx <= w && ly >= 0 && ly <= h;
        }
        test(wx:number, wy:number):boolean{
            var target:Node = this.target;
            var nodeOpt = target._nodeOpt;
            var matrix:Matrix = nodeOpt.matrix;
            // 计算全局坐标映射到该节点之后的坐标
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            var lx = (c*(wy - ty) - d*(wx-tx))/(b*c - a*d);
            var ly = (a*(wy - ty) - b*(wx - tx))/(a*d-b*c);
            var w = nodeOpt.w, h = nodeOpt.h;
            return lx >= 0 && lx <= w && ly >= 0 && ly <= h;
        }
        onBegan(tx:number, ty:number, phase:number){
            var self = this, clazz = self.__c;
            self.emit(clazz.BEGAN, self, tx, ty, phase);
        }
        onEnd(tx:number, ty:number, phase:number){
            var self = this, clazz = self.__c;
            self.emit(clazz.END, self, tx, ty, phase);
        }
        onMove(tx:number, ty:number){
            var self = this, clazz = self.__c;
            self.emit(clazz.MOVE, self, tx, ty);
        }

        //@override
        _release(){
            super._release();
            var self = this;
            self.target = null;
        }
    }
}
