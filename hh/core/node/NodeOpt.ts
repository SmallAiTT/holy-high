/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="../ref.ts" />
///<reference path="../base/Matrix.ts" />
module hh{
    export class NodeOpt extends Class{
        static __className:string = "NodeOpt";

        _NodeClass:any;

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

        parent:Node;
        children:Node[];

        drawable:boolean;
        matrix:Matrix;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.name = self._NodeClass.__className;
            self.width = 0;
            self.height = 0;
            self.x = 0;
            self.y = 0;
            self.scaleX = 0;
            self.scaleY = 0;
            self.anchorX = 0;
            self.anchorY = 0;
            self.rotation = 0;
            self.skewX = 0;
            self.skewY = 0;
            self.alpha = 0;
            self.worldAlpha = 0;
            self.visible = true;
            self.children = [];
            self.drawable = false;
        }
        constructor(NodeClass:any){
            this._NodeClass = NodeClass;
            super();
        }
    }
}