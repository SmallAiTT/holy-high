/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../node/NodeOpt.ts" />
///<reference path="../res/Texture.ts" />
///<reference path="../res/Res.ts" />
module hh{
    export class UIImgOpt extends NodeOpt{
        texture:Texture;
        bcsh:number[];

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.bcsh = [0, 0, 0, 0];
        }

        isBCSH(){
            var bcsh = this.bcsh;
            return bcsh[0] || bcsh[1] || bcsh[2] || bcsh[3];
        }
    }
}