/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="../ref.ts" />
module sty.resHelper{
    export function getItemUrl(resId:number):string{
        return 'res/item/11001.png';// TODO
    }

    export function getS9gUrl(resId:number):string{
        return 'res/s9g/00001.png';// TODO
    }

    export function loadImage(url:string, cb:Function, ctx?:any){
        var img = new Image();   // Create new img element
        img.addEventListener("load", function() {
            cb.call(ctx, null, img);
        }, false);
        img.src = url; // Set source path
    }
    export function loadImages(urls:string[], cb:Function, ctx?:any){
        var asyncPool = new hh.AsyncPool(urls, 0, function(url, index, cb1){
            loadImage(url, cb1);
        }, cb, ctx);
        asyncPool.flow();
    }
}