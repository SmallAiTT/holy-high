/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="ref.ts" />
module hh{
    export class Texture extends Class{
        static __className:string = "Texture";

        url:string;
        img:any;
        x:number;
        y:number;
        width:number;
        height:number;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.x = 0;
            self.y = 0;
        }

        setImg(img){
            var self = this;
            self.img = img;
            self.width = img.width;
            self.height = img.height;
        }
    }
}