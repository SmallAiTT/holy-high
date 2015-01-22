/// <reference path="../utils/utils.ts" />
/// <reference path="Node.ts" />
module hh{
    export class ColorNode extends Node{
        static __className:string = "ColorNode";

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._color = "red";//设置默认颜色为红色
        }

        /**
         * 颜色
         */
        _color:string;
        _colorDirty:boolean;
        _setColor(color:any){
            var self = this;
            var c = hh.color(color);
            if(c != self._color) self._colorDirty = true;
            this._color = color;
        }
        public set color(color:any){
            this._setColor(color);
        }
        public get color():any{
            return this._color;
        }

        //@override
        _draw(renderCtx:CanvasRenderingContext2D):void{
            super._draw(renderCtx);
            var self = this, clazz = self.__class;
            var transX = self._transX, transY = self._transY;
            var transWidth = self._transWidth, transHeight = self._transHeight;


            renderCtx.beginPath();
            var arcX = transX + transWidth/2, arcY = transY + transHeight/2;
            renderCtx.arc(arcX, arcY, transWidth/2, 0, 2*Math.PI);
            renderCtx.fillStyle = "green";
            renderCtx.fill();

            renderCtx.globalCompositeOperation = "source-in";

            renderCtx.fillStyle = self._color;
            renderCtx.fillRect(transX, transY, transX + transWidth, transY + transHeight);
        }

    }
}