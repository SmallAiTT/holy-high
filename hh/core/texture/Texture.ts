/**
 * Created by Administrator on 2015/7/4.
 */
///<reference path="../ref.ts" />
///<reference path="../base/__module.ts" />
module hh{
    export class Texture extends Emitter{
        static __className:string = 'Texture';

        url:string;
        data:any;
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

        setData(data){
            var self = this;
            self.data = data;
            self.width = data.width;
            self.height = data.height;
        }

        render(ctx:IRenderingContext2D, dstX:number, dstY:number, dstW:number, dstH:number, grid?:number[]){
            var self = this, data = self.data;
            var x = self.x, y = self.y, width = self.width, height = self.height;
            if(!grid || grid.length == 0){
                // 普通绘图模式
                ctx.drawImage(data, x, y, width, height, dstX, dstY, dstW, dstH);
                return;
            }
            var gridType = grid[0];
            if(gridType == 1){
                // 九宫格模式
            }else if(gridType == 2){
                // 增强版九宫格模式
            }else if(gridType == 3){
                // 垂直三宫格模式
                // 方向
                var v1 = grid[1], v2 = grid[2], v3 = height - v1 - v2;
                ctx.drawImage(data, x, y, width, v1, dstX, dstY, dstW, v1);
                var repeat = dstH - v1 - v3;
                ctx.drawImage(data, x, v1, width, v2, dstX, v1, dstW, repeat);
                //var yTemp = v1;
                //while(repeat > 0){
                //    var d = Math.min(repeat, v2);
                //    ctx.drawImage(data, x, v1, width, d, dstX, yTemp, dstW, d);
                //    repeat -= d;
                //    yTemp += d;
                //}
                ctx.drawImage(data, x, height - v3, width, v3, dstX, dstH - v3, dstW, v3);
            }else if(gridType == 4){
                // 垂直三宫格模式
                // 方向
                var v1 = grid[1], v2 = grid[2], v3 = height - v1 - v2;
                ctx.drawImage(data, x, y, v1, height, dstX, dstY, v1, dstH);
                var repeat = dstW - v1 - v3;
                ctx.drawImage(data, v1, y, v2, height, v1, dstY, repeat, dstH);
                //var yTemp = v1;
                //while(repeat > 0){
                //    var d = Math.min(repeat, v2);
                //    ctx.drawImage(data, x, v1, width, d, dstX, yTemp, dstW, d);
                //    repeat -= d;
                //    yTemp += d;
                //}
                ctx.drawImage(data, width - v3, y, v3, height, dstW - v3, dstY, v3, dstH);
            }
        }
    }
}