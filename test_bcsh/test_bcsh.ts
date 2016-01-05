/**
 * Created by SmallAiTT on 2015/6/30.
 */
module hh{

    export class Class{
        /** 类名 */
        static __n:string;

        static __recycler:any[] = [];
        static push(obj:any){
            this.__recycler.push(obj);
        }
        static pop(...args):any{
            var clazz = this;
            var obj = clazz.__recycler.pop();
            if(obj) return obj;
            else clazz.create.apply(clazz, args);
        }

        /** 创建 */
        static create(...args:any[]):any {
            var Class:any = this;
            var obj:any = new Class();
            if (obj.init) obj.init.apply(obj, arguments);
            return obj;
        }

        /** 获取单例 */
        static getInstance(...args:any[]) {
            var Class:any = this;
            if (!Class._instance) {
                var instance:any = Class._instance = Class.create.apply(Class, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        }

        /** 释放单例 */
        static release() {
            var Class:any = this;
            var instance:any = Class._instance;
            if (instance) {
                instance.release();
                Class._instance = null;
            }
        }

        /** 类名 */
        __n:string;
        /** 实例对应的类 */
        __c:any;
        /** 是否是单例 */
        _isInstance:boolean;
        /** 储藏室 */
        /** 是否已经释放了 */
        released:boolean;

        _initProp():void {
            var self = this;
        }

        constructor() {
            var self = this;
            self._initProp();
        }

        public init(...args:any[]) {
        }

        public release() {
            var self = this;
            if (self.released) return;
            self.released = true;
            self._release();
        }

        _release() {
        }
    }

    export class ColorMatrix extends Class{
        // constant for contrast calculations:
        static DELTA_INDEX:number[] = [
            0,    0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1,  0.11,
            0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
            0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
            0.44, 0.46, 0.48, 0.5,  0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
            0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
            1.0,  1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
            1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0,  2.12, 2.25,
            2.37, 2.50, 2.62, 2.75, 2.87, 3.0,  3.2,  3.4,  3.6,  3.8,
            4.0,  4.3,  4.7,  4.9,  5.0,  5.5,  6.0,  6.5,  6.8,  7.0,
            7.3,  7.5,  7.8,  8.0,  8.4,  8.7,  9.0,  9.4,  9.6,  9.8,
            10.0
        ];
        // identity matrix constant:
        static IDENTITY_MATRIX:number[] = [
            1,0,0,0,0,
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0,
            0,0,0,0,1
        ];

        static LENGTH:number = ColorMatrix.IDENTITY_MATRIX.length;

        length:number;
        // initialization:
        constructor(p_matrix?:any) {
            super();
            var self = this, clazz = self.__c;
            p_matrix = self.fixMatrix(p_matrix);
            self.copyMatrix(((p_matrix.length == clazz.LENGTH) ? p_matrix : clazz.IDENTITY_MATRIX));
            self.length = clazz.LENGTH;
        }

        reset():void {
            var self = this, clazz = self.__c;
            for (var i:number=0; i<clazz.LENGTH; i++) {
                this[i] = clazz.IDENTITY_MATRIX[i];
            }
        }

        adjustColor(p_brightness:number,p_contrast:number,p_saturation:number,p_hue:number):void {
            var self = this, clazz = self.__c;
            self.adjustHue(p_hue);
            self.adjustContrast(p_contrast);
            self.adjustBrightness(p_brightness);
            self.adjustSaturation(p_saturation);
        }

        adjustBrightness(p_val:number):void {
            var self = this, clazz = self.__c;
            p_val = self.cleanValue(p_val,100);
            if (p_val == 0 || isNaN(p_val)) { return; }
            self.multiplyMatrix([
                1,0,0,0,p_val,
                0,1,0,0,p_val,
                0,0,1,0,p_val,
                0,0,0,1,0,
                0,0,0,0,1
            ]);
        }

        adjustContrast(p_val:number):void {
            var self = this, clazz = self.__c;
            p_val = self.cleanValue(p_val,100);
            if (p_val == 0 || isNaN(p_val)) { return; }
            var x:number;
            if (p_val<0) {
                x = 127+p_val/100*127
            } else {
                x = p_val%1;
                if (x == 0) {
                    x = clazz.DELTA_INDEX[p_val];
                } else {
                    //x = clazz.DELTA_INDEX[(p_val<<0)]; // this is how the IDE does it.
                    x = clazz.DELTA_INDEX[(p_val<<0)]*(1-x)+clazz.DELTA_INDEX[(p_val<<0)+1]*x; // use linear interpolation for more granularity.
                }
                x = x*127+127;
            }
            self.multiplyMatrix([
                x/127,0,0,0,0.5*(127-x),
                0,x/127,0,0,0.5*(127-x),
                0,0,x/127,0,0.5*(127-x),
                0,0,0,1,0,
                0,0,0,0,1
            ]);
        }

        adjustSaturation(p_val:number):void {
            var self = this, clazz = self.__c;
            p_val = self.cleanValue(p_val,100);
            if (p_val == 0 || isNaN(p_val)) { return; }
            var x:number = 1+((p_val > 0) ? 3*p_val/100 : p_val/100);
            var lumR:number = 0.3086;
            var lumG:number = 0.6094;
            var lumB:number = 0.0820;
            self.multiplyMatrix([
                lumR*(1-x)+x,lumG*(1-x),lumB*(1-x),0,0,
                lumR*(1-x),lumG*(1-x)+x,lumB*(1-x),0,0,
                lumR*(1-x),lumG*(1-x),lumB*(1-x)+x,0,0,
                0,0,0,1,0,
                0,0,0,0,1
            ]);
        }

        adjustHue(p_val:number):void {
            var self = this, clazz = self.__c;
            p_val = self.cleanValue(p_val,180)/180*Math.PI;
            if (p_val == 0 || isNaN(p_val)) { return; }
            var cosVal:number = Math.cos(p_val);
            var sinVal:number = Math.sin(p_val);
            var lumR:number = 0.213;
            var lumG:number = 0.715;
            var lumB:number = 0.072;
            self.multiplyMatrix([
                lumR+cosVal*(1-lumR)+sinVal*(-lumR),lumG+cosVal*(-lumG)+sinVal*(-lumG),lumB+cosVal*(-lumB)+sinVal*(1-lumB),0,0,
                lumR+cosVal*(-lumR)+sinVal*(0.143),lumG+cosVal*(1-lumG)+sinVal*(0.140),lumB+cosVal*(-lumB)+sinVal*(-0.283),0,0,
                lumR+cosVal*(-lumR)+sinVal*(-(1-lumR)),lumG+cosVal*(-lumG)+sinVal*(lumG),lumB+cosVal*(1-lumB)+sinVal*(lumB),0,0,
                0,0,0,1,0,
                0,0,0,0,1
            ]);
        }

        concat(p_matrix:number[]):void {
            var self = this, clazz = self.__c;
            p_matrix = self.fixMatrix(p_matrix);
            if (p_matrix.length != clazz.LENGTH) { return; }
            self.multiplyMatrix(p_matrix);
        }

        clone():ColorMatrix {
            return new ColorMatrix(this);
        }

        toString():string {
            return "ColorMatrix [ "+Array.prototype.join.call(this, " , ")+" ]";
        }

        toArray():number[] {
            return Array.prototype.slice.call(this, 0,20);
        }

        // copy the specified matrix's values to this matrix:
        copyMatrix(p_matrix:number[]):void {
            var self = this, clazz = self.__c;
            var l:number = clazz.LENGTH;
            for (var i:number=0;i<l;i++) {
                this[i] = p_matrix[i];
            }
        }

        // multiplies one matrix against another:
        multiplyMatrix(p_matrix:number[]):void {
            var self = this, clazz = self.__c;
            var col:number[] = [];

            for (var i:number=0;i<5;i++) {
                for (var j:number=0;j<5;j++) {
                    col[j] = this[j+i*5];
                }
                for (j=0;j<5;j++) {
                    var val:number=0;
                    for (var k:number=0;k<5;k++) {
                        val += p_matrix[j+k*5]*col[k];
                    }
                    this[j+i*5] = val;
                }
            }
        }

        // make sure values are within the specified range, hue has a limit of 180,
        cleanValue(p_val:number,p_limit:number):number {
            var self = this, clazz = self.__c;
            return Math.min(p_limit,Math.max(-p_limit,p_val));
        }

        // makes sure matrixes are 5x5 (25 long):
        fixMatrix(p_matrix:number[]=null):number[] {
            var self = this, clazz = self.__c;
            if (p_matrix == null) { return clazz.IDENTITY_MATRIX; }
            if (p_matrix instanceof ColorMatrix) { p_matrix = p_matrix.slice(0); }
            if (p_matrix.length < clazz.LENGTH) {
                p_matrix = p_matrix.slice(0,p_matrix.length).concat(clazz.IDENTITY_MATRIX.slice(p_matrix.length,clazz.LENGTH));
            } else if (p_matrix.length > clazz.LENGTH) {
                p_matrix = p_matrix.slice(0,clazz.LENGTH);
            }
            return p_matrix;
        }
    }

    var ctx:any;
    var img:any;
    var _getCtx = function(){
        var canvas:any = document.getElementsByTagName('canvas')[0];
        if(!canvas) throw '请添加canvas元素！';
        canvas.width = 960;
        canvas.height = 640;
        ctx = canvas.getContext('2d');
    };
    var _draw = function(){
        img = document.createElement('img');
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        };
        var imgUrl = _urlParam.url || '11001.png';
        img.src = 'res/' + imgUrl;
    };

    var _urlParam:any = {};
    var _parseParam = function(){
        var src = window.location.href;
        var index = src.indexOf('?');
        if(index > 0){
            var str = src.substring(index + 1);
            var arr = str.split('&');
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var paramStr = arr[i];
                var param = paramStr.split('=');
                var pKey = param[0], pValue:any = param[1];
                if(pValue.match(/(^\d+$)/)){
                    pValue = parseInt(pValue);
                }else if(pValue.match(/(^\d+.\d+$)/)){
                    pValue = parseFloat(pValue);
                }
                _urlParam[pKey] = pValue;
            }
        }
    };

    export function refresh(){
        console.log('refresh');
        var bcsh = [];
        var idArr = ['brightness', 'contrast', 'saturation', 'hub'];
        for (var i = 0, l_i = idArr.length; i < l_i; i++) {
            var id = idArr[i];
            var input = <any>document.getElementById(id);
            bcsh.push(parseInt(input.value));
        }

        if(img){
            ctx.clearRect(0, 0, 960, 640);
            ctx.drawImage(img, 0, 0);

            var colorMatrix:ColorMatrix = new ColorMatrix();
            colorMatrix.adjustColor(bcsh[0], bcsh[1], bcsh[2], bcsh[3]);
            document.getElementById('result').innerHTML = '[' + colorMatrix.toArray().join(',') + ']';

            var imageData = ctx.getImageData(0,0,960, 640);
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

    _parseParam();
    _getCtx();
    _draw();
}
