/**
 * Created by SmallAiTT on 2015/7/1.
 */
module hh{
    export class TxtOpt extends Class{
        value:string;
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
