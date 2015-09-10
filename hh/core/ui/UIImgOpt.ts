/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../texture/Texture.ts" />
///<reference path="../res/Res.ts" />
module hh{
    export class UIImgOpt extends Class{
        texture:Texture;
        bcsh:number[];
        grid:number[];

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