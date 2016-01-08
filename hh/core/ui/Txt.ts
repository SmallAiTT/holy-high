/**
 * Created by SmallAiTT on 2015/7/7.
 */
module hh{
    export class Txt extends Node{

        _textOpt:TxtOpt;

        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._nodeOpt.drawable = true;
            self._textOpt = new TxtOpt();
        }

        /**
         * 文本内容
         */
        _setValue(value:any){
            this._textOpt.value = value;
            var size = hh.engine.canvasCtx.measureText(value);
            console.log(size.width);
        }
        public set value(value:any){
            this._setValue(value);
        }
        public get value():any{
            return this._textOpt.value;
        }


        // @override
        _render(ctx:IRenderingContext2D, engine:Engine){
            ctx.fillStyle = 'red';
            ctx.font = "30px serif";
            ctx.fillText(this._textOpt.value, 0, 0);
        }

    }
}
