///<reference path="../node/Node.ts" />

module hh{
    export class UIImage extends hh.Node{

        /**
         * 纹理
         */
        _texture:any;
        _setTexture(texture:any){
            this._texture = texture;
        }
        public set texture(texture:any){
            this._setTexture(texture);
        }
        public get texture():any{
            return this._texture;
        }

        //@override
        _draw(renderCtx:CanvasRenderingContext2D):void{
            var self = this;
            var texture = self._texture;
            if(texture){
                renderCtx.drawImage(texture, 0, 0);
            }
        }
    }
}