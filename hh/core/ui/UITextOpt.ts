/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../node/NodeOpt.ts" />
module hh{
    export class UITextOpt extends Class{
        text:string;
        font:string;
        size:number;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.font = '';
            self.size = 18;
        }

    }
}