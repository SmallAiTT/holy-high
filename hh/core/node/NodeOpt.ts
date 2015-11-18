/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    export class NodeOpt extends Class{

        _TargetClass:any;

        debug:boolean;
        debugRectColor:any;

        name:string;
        width:number;
        height:number;
        x:number;
        y:number;
        scaleX:number;
        scaleY:number;
        anchorX:number;
        anchorY:number;
        rotation:number;
        skewX:number;
        skewY:number;
        alpha:number;
        worldAlpha:number;
        zIndex:number;
        visible:boolean;
        resizableByRes:boolean;// 是否根据资源自动调整大小，默认设置为true

        parent:Node;
        children:Node[];

        drawable:boolean;
        touchable:boolean;// 是否可点击，默认设置成不可点击，这样可以提升性能
        matrix:Matrix;

        layout:Layout;
        clip:Function;

        renderQueueRange:number[];

        drawInfo:number[];

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.name = self._TargetClass.__n;
            self.width = 0;
            self.height = 0;
            self.x = 0;
            self.y = 0;
            self.scaleX = 1;
            self.scaleY = 1;
            self.anchorX = 0.5;
            self.anchorY = 0.5;
            self.rotation = 0;
            self.skewX = 0;
            self.skewY = 0;
            self.alpha = 0;
            self.worldAlpha = 1;
            self.visible = true;
            self.resizableByRes = true;
            self.children = [];
            self.drawable = false;
            self.matrix = new Matrix();
            self.renderQueueRange = [];
            self.drawInfo = [];
        }
        constructor(NodeClass:any){
            this._TargetClass = NodeClass;
            super();
        }
    }
}
