/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="../ref.ts" />
///<reference path="../base/__module.ts" />
///<reference path="Layout.ts" />
module hh{
    export class NodeOpt extends Class{
        static __className:string = "NodeOpt";

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

        parent:Node;
        children:Node[];

        drawable:boolean;
        matrix:Matrix;

        layout:Layout;
        clip:Function;

        grid:number[];

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.name = self._TargetClass.__className;
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
            self.children = [];
            self.drawable = false;
            self.matrix = new Matrix();
        }
        constructor(NodeClass:any){
            this._TargetClass = NodeClass;
            super();
        }
    }
}