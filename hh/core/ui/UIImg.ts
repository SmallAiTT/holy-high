/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../base/ColorMatrix.ts" />
///<reference path="../node/Node.ts" />
///<reference path="UIImgOpt.ts" />
module hh{
    export class UIImg extends Node{
        static __className:string = 'UIImg';
        static NodeOpt:any = UIImgOpt;

        _nodeOpt:UIImgOpt;

        //@override
        _initProp(){
            super._initProp();
            var self = this, nodeOpt = self._nodeOpt;
            nodeOpt.anchorX = nodeOpt.anchorY = 0.5;
        }
        constructor(urlOrTexture?:any){
            super();
        }

        load(urlOrTexture, cb?:Function, ctx?:any){
            if(!urlOrTexture) return;
            var self = this, nodeOpt = self._nodeOpt;
            if(typeof urlOrTexture == 'string'){
                // 是url
                var texture = res.get(urlOrTexture);
                if(!self._loadTexture(texture)){
                    // 如果还没加载则进行动态加载
                    res.load(urlOrTexture, function(){
                        self._loadTexture(res.get(urlOrTexture));
                        if(cb) cb.call(ctx, self);
                    });
                }else{
                    if(cb) cb.call(ctx, self);
                }
            }else{
                self._loadTexture(urlOrTexture);
                if(cb) cb.call(ctx, self);
            }
        }

        _loadTexture(texture):boolean{
            if(texture){
                var self = this, nodeOpt = self._nodeOpt;
                // 如果已经加载了
                nodeOpt.texture = texture;
                // 设置成可以绘制
                nodeOpt.drawable = true;
                var grid = nodeOpt.grid;
                if(!grid || grid.length == 0){
                    self._setWidth(texture.width);
                    self._setHeight(texture.height);
                }else{
                    var type = grid[0];
                    if(type == 1 || type == 2){
                        // 九宫格，改变设定的size，而是外部定义size。
                    }else if(type == 3){
                        // 三宫格，只改变一个方向的
                        // 垂直的时候改变width
                        self._setWidth(texture.width);
                    }else if(type == 4){
                        // 三宫格，只改变一个方向的
                        // 水平的时候改变height
                        self._setHeight(texture.height);
                    }
                }
                return true;
            }
            return false;
        }

        // @override
        _render(ctx:IRenderingContext2D, engine:Engine){
            var self = this, nodeOpt = self._nodeOpt, texture = nodeOpt.texture;
            texture.render(ctx, 0, 0, nodeOpt.width, nodeOpt.height, nodeOpt.grid);

            if(nodeOpt.isBCSH()){
                var bcsh = nodeOpt.bcsh;
                var colorMatrix:ColorMatrix = new ColorMatrix();
                colorMatrix.adjustColor(bcsh[0], bcsh[1], bcsh[2], bcsh[3])

                var imageData = ctx.getImageData(0,0,engine.design.width, engine.design.height);
                var data = imageData.data;

                for (var i = 0; i < data.length; i += 4) {
                    var srcR = data[i], srcG = data[i+1], srcB = data[i+2], srcA = data[i+3];
                    data[i]   = (colorMatrix[0] * srcR) + (colorMatrix[1] * srcG) + (colorMatrix[2] * srcB) + (colorMatrix[3] * srcA) + colorMatrix[4];
                    data[i+1] = (colorMatrix[5] * srcR) + (colorMatrix[6] * srcG) + (colorMatrix[7] * srcB) + (colorMatrix[8] * srcA) + colorMatrix[9];
                    data[i+2] = (colorMatrix[10] * srcR) + (colorMatrix[11] * srcG) + (colorMatrix[12] * srcB) + (colorMatrix[13] * srcA) + colorMatrix[14];
                    data[i+3] = (colorMatrix[15] * srcR) + (colorMatrix[16] * srcG) + (colorMatrix[17] * srcB) + (colorMatrix[18] * srcA) + colorMatrix[19];
                }
                ctx.putImageData(imageData, 0, 0);
            }
        }

        setBCSH(brightness:number, contrast:number, saturation:number, hub:number){
            var self = this, bcsh = self._nodeOpt.bcsh;
            bcsh[0] = brightness;
            bcsh[1] = contrast;
            bcsh[2] = saturation;
            bcsh[3] = hub;
            return self;
        }
    }
}