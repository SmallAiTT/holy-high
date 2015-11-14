/**
 * Created by Administrator on 2015/7/4.
 */
module hh{
    export class Texture extends Emitter{

        url:string;
        data:any;
        x:number;
        y:number;
        width:number;
        height:number;
        canvas:any;
        grid:number[];

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self.x = 0;
            self.y = 0;
            var canvas = self.canvas = document.createElement('canvas');
            canvas.width = canvas.height = 0;
        }

        setData(img, x:number, y:number, width:number, height:number, grid?:number[]){
            var self = this;
            var canvas = self.canvas;
            self.x = x;
            self.y = y;
            self.width = width;
            self.height = height;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
            self.grid = grid;
        }
        setByGrid(texture:Texture, grid:number[], dstW:number, dstH:number){
            var self = this, canvas = self.canvas;
            self.width = canvas.width = dstW;
            self.height = canvas.height = dstH;
            var ctx = self.canvas.getContext('2d');
            var data = texture.canvas, width = texture.width, height = texture.height;
            var gridType = grid[0];
            if(gridType == 1){
                // 九宫格模式
                var vx = grid[1], vy = grid[2], vw = grid[3], vh = grid[4];
                var arrX = [0, vx, vx+vw, width];
                var arrY = [0, vy, vy+vh, height];
                var arrX1 = [0, vx, dstW-(width-vx-vw), dstW];
                var arrY1 = [0, vy, dstH-(height-vy-vh), dstH];
                for(var i = 0; i < 3; ++i){
                    var sx = arrX[i], sw = arrX[i+1] - sx;
                    var dx = arrX1[i], dw = arrX1[i+1] - dx;
                    for(var j = 0; j < 3; ++j){
                        var sy = arrY[j], sh = arrY[j+1] - sy;
                        var dy = arrY1[j], dh = arrY1[j+1] - dy;
                        ctx.drawImage(data, sx, sy, sw, sh, dx, dy, dw, dh);
                    }
                }
                engine.__fpsInfo.drawCount += 9;
            }else if(gridType == 3){
                // 垂直三宫格模式
                // 方向
                var v1 = grid[1], v2 = grid[2], v3 = height - v1 - v2;
                ctx.drawImage(data, 0, 0, width, v1, 0, 0, dstW, v1);
                var repeat = dstH - v1 - v3;
                ctx.drawImage(data, 0, v1, width, v2, 0, v1, dstW, repeat);
                //var yTemp = v1;
                //while(repeat > 0){
                //    var d = Math.min(repeat, v2);
                //    ctx.drawImage(data, x, v1, width, d, dstX, yTemp, dstW, d);
                //    repeat -= d;
                //    yTemp += d;
                //}
                ctx.drawImage(data, 0, height - v3, width, v3, 0, dstH - v3, dstW, v3);
                engine.__fpsInfo.drawCount += 3;
            }else if(gridType == 4){
                // 垂直三宫格模式
                // 方向
                var v1 = grid[1], v2 = grid[2], v3 = height - v1 - v2;
                ctx.drawImage(data, 0, 0, v1, height, 0, 0, v1, dstH);
                var repeat = dstW - v1 - v3;
                ctx.drawImage(data, v1, 0, v2, height, v1, 0, repeat, dstH);
                //var yTemp = v1;
                //while(repeat > 0){
                //    var d = Math.min(repeat, v2);
                //    ctx.drawImage(data, x, v1, width, d, dstX, yTemp, dstW, d);
                //    repeat -= d;
                //    yTemp += d;
                //}
                ctx.drawImage(data, width - v3, 0, v3, height, dstW - v3, 0, v3, dstH);
                engine.__fpsInfo.drawCount += 3;
            }
        }
    }
}
