/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    export class NodeOpt extends Class{

        _TargetClass:any;

        debug:boolean;
        debugRectColor:any;

        name:string;
        w:number;
        h:number;
        x:number;
        y:number;
        sx:number;
        sy:number;
        ax:number;
        ay:number;
        r:number;
        skewX:number;
        skewY:number;
        a:number;
        wa:number;
        z:number;
        v:boolean;
        resizableByRes:boolean;// 是否根据资源自动调整大小，默认设置为true

        parent:Node;
        children:Node[];

        drawable:boolean;
        t:boolean;// 是否可点击，默认设置成不可点击，这样可以提升性能
        matrix:Matrix;
        // 这个是用来绘制用的矩阵
        matrix4Render:Matrix;
        // 是否是一个cache节点
        cachable:boolean;

        layout:Layout;
        clip:Function;

        renderQueueRange:number[];

        drawInfo:number[];

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.name = self._TargetClass.__n;
            self.w = 0;
            self.h = 0;
            self.x = 0;
            self.y = 0;
            self.sx = 1;
            self.sy = 1;
            self.ax = 0.5;
            self.ay = 0.5;
            self.r = 0;
            self.skewX = 0;
            self.skewY = 0;
            self.a = 0;
            self.wa = 1;
            self.v = true;
            self.resizableByRes = true;
            self.children = [];
            self.drawable = false;
            self.matrix = new Matrix();
            self.matrix4Render = new Matrix();
            self.renderQueueRange = [];
            self.drawInfo = [];
        }
        constructor(NodeClass:any){
            this._TargetClass = NodeClass;
            super();
        }
    }
}
