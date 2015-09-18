/**
 * Created by SmallAiTT on 2015/7/7.
 */
///<reference path="../node/Node.ts" />
///<reference path="UITextOpt.ts" />
module hh{
    export class UIText extends Node{

        _textOpt:UITextOpt;

        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._nodeOpt.drawable = true;
            self._textOpt = new UITextOpt();
        }

        /**
         * 文本内容
         */
        _setText(text:any){
            this._textOpt.text = text;
            var size = hh.engine.canvasCtx.measureText(text);
            console.log(size.width);
        }
        public set text(text:any){
            this._setText(text);
        }
        public get text():any{
            return this._textOpt.text;
        }


        // @override
        _render(ctx:IRenderingContext2D, engine:Engine){
            ctx.fillStyle = 'red';
            ctx.font = "30px serif";
            ctx.fillText(this._textOpt.text, 0, 0);
        }

    }
}