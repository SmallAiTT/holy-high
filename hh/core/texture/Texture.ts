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
            self.grid = grid;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        }
        _handleGrid_3(texture:Texture, grid:number[], dstW:number, dstH:number, data:any, ctx:any, width:number, height:number){
            // 方向
            var v1 = grid[1], v2 = grid[2], direction = grid[3];
            var wh0 = direction ? height : width;
            var wh1 = direction ? dstH : dstW;
            var vArr1:number[] = [0, v1, v1+v2, wh0];
            var vArr2:number[] = [0, v1, wh1-wh0+v1+v2, wh1];
            for(var i = 0; i < 3; ++i){
                var v1_0 = vArr1[i], v1_1 = vArr1[i+1] - v1_0;
                var v2_0 = vArr2[i], v2_1 = vArr2[i+1] - v2_0;
                if(!direction){
                    // 水平模式
                    ctx.drawImage(data, v1_0, 0, v1_1, height, v2_0, 0, v2_1, dstH);
                }else{
                    // 垂直模式
                    ctx.drawImage(data, 0, v1_0, width, v1_1, 0, v2_0, dstW, v2_1);
                }
            }
            engine.__fpsInfo.drawCount += 3;
        }
        _handleGrid_9(texture:Texture, grid:number[], dstW:number, dstH:number, data:any, ctx:any, width:number, height:number){
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
        }
        _handleGrid_12(texture:Texture, grid:number[], dstW:number, dstH:number, data:any, ctx:any, width:number, height:number){
            // 为了减少绘制次数，先用一个临时的canvas绘制一个角
            var tempCanvas = document.createElement('canvas');
            // 十二宫格模式
            var v1 = grid[1], v2 = grid[2], v3 = grid[3], direction = grid[3];
            var trX:number, trY:number;
            var factor = 1;
            if(!direction){
                // 水平模式
                var xValues1 = [0, v1, v1+v3, width];
                var xValues2 = [0, v1, dstW-width+v1+v3, dstW];
                var yValues1 = [0, v2, height];
                var yValues2 = [0, v2, dstH];
                var dstW2 = dstW;
                var dstH2 = dstH/2;
                trX = 0;
                trY = dstH;
            }else{
                // 垂直模式
                xValues1 = [0, v1, width];
                xValues2 = [0, v1, dstW];
                yValues1 = [0, v2, v2+v3, height];
                yValues2 = [0, v2, dstH-height+v2+v3, dstH];
                dstW2 = dstW/2;
                dstH2 = dstH;
                trX = dstW;
                trY = 0;
                factor = -1;
            }
            tempCanvas.width = dstW2;
            tempCanvas.height = dstH2;
            var tempCtx = tempCanvas.getContext('2d');
            for(var i = 0, l_i = xValues1.length; i < l_i; ++i){
                var x1 = xValues1[i], w1 = xValues1[i+1] - x1;
                var x2 = xValues2[i], w2 = xValues2[i+1] - x2;
                for(var j = 0, l_j = yValues1.length; j < l_j; ++j){
                    var y1 = yValues1[j], h1 = yValues1[j+1] - y1;
                    var y2 = yValues2[j], h2 = yValues2[j+1] - y2;
                    if(w2 > 0 && h2 > 0){
                        tempCtx.drawImage(data, x1, y1, w1, h1, x2, y2, w2, h2);
                    }
                }
            }
            // 然后直接用临时的canvas进行绘制
            ctx.drawImage(tempCanvas, 0, 0, dstW2, dstH2, 0, 0, dstW2, dstH2);
            ctx.translate(trX, trY);
            ctx.scale(factor, -factor);
            ctx.drawImage(tempCanvas, 0, 0, dstW2, dstH2, 0, 0, dstW2, dstH2);
            engine.__fpsInfo.drawCount += 8;
        }
        _handleGrid_16(texture:Texture, grid:number[], dstW:number, dstH:number, data:any, ctx:any, width:number, height:number){
            // 十六宫格模式
            var vx = grid[1];
            var vy = grid[2];
            var vw = width - vx;
            var vh = height - vy;
            var arr1 = [null, [dstW,0,-1,1], [0,dstH,1,-1], [dstW,0,-1,1]];

            // 为了减少绘制次数，先用一个临时的canvas绘制一个角
            var tempCanvas = document.createElement('canvas');
            var dstW2 = dstW/2;
            var dstH2 = dstH/2;
            tempCanvas.width = dstW2;
            tempCanvas.height = dstH2;
            var tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(data, 0, 0, vx, vy, 0, 0, vx, vy);
            tempCtx.drawImage(data, vx, 0, vw, vy, vx, 0, dstW2-vx, vy);
            tempCtx.drawImage(data, 0, vy, vx, vh, 0, vy, vx, dstH2-vy);
            tempCtx.drawImage(data, vx, vy, vw, vh, vx, vy, dstW2-vx, dstH2-vy);

            // 然后直接用临时的canvas进行绘制
            for(var i = 0; i < arr1.length; i++){
                var arr2 = arr1[i];
                if(arr2){
                    ctx.translate(arr2[0], arr2[1]);
                    ctx.scale(arr2[2], arr2[3]);
                }
                ctx.drawImage(tempCanvas, 0, 0, dstW2, dstH2, 0, 0, dstW2, dstH2);
            }
            engine.__fpsInfo.drawCount += 8;
        }
        setByGrid(texture:Texture, grid:number[], dstW:number, dstH:number){
            var self = this, canvas = self.canvas;
            self.width = canvas.width = dstW;
            self.height = canvas.height = dstH;
            var ctx = self.canvas.getContext('2d');
            var data = texture.canvas, width = texture.width, height = texture.height;
            var gridType = grid[0];
            var xValues1:number[], xValues2:number[], yValues1:number[], yValues2:number[];
            var dstW2:number, dstH2:number;
            var tempCanvas:any, tempCtx:any;
            var func = self['_handleGrid_'+gridType];
            if(!func){
                console.error('Cnt find grid handler for gridType:'+gridType);
            }else{
                func.call(self, texture, grid, dstW, dstH, data, ctx, width, height);
            }
        }
    }
}
