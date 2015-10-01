/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    // 这里可以不需要继承Class
    export class Matrix{


        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @member egret.Matrix#a
         */
        public a:number;
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @member egret.Matrix#b
         */
        public b:number;
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @member egret.Matrix#c
         */
        public c:number;
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @member egret.Matrix#d
         */
        public d:number;
        /**
         * 沿 x 轴平移每个点的距离
         * @member egret.Matrix#tx
         */
        public tx:number;
        /**
         * 沿 y 轴平移每个点的距离
         * @member egret.Matrix#ty
         */
        public ty:number;

        /**
         * 创建一个 egret.Matrix 对象
         * @method egret.Matrix#constructor
         * @param a {number} 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b {number} 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c {number} 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d {number} 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx {number} 沿 x 轴平移每个点的距离。
         * @param ty {number} 沿 y 轴平移每个点的距离。
         */
        constructor() {
            this.identity();
        }
        /**
         * 前置矩阵
         * @method egret.Matrix#prepend
         * @param a {number} 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b {number} 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c {number} 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d {number} 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx {number} 沿 x 轴平移每个点的距离
         * @param ty {number} 沿 y 轴平移每个点的距离
         * @returns {egret.Matrix}
         */
        public prepend(a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix {
            var tx1 = this.tx;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                var a1 = this.a;
                var c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;
        }
        /**
         * 后置矩阵
         * @method egret.Matrix#append
         * @param a {number} 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b {number} 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c {number} 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d {number} 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx {number} 沿 x 轴平移每个点的距离
         * @param ty {number} 沿 y 轴平移每个点的距离
         * @returns {egret.Matrix}
         */
        public append(a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        }

        /**
         * 前置矩阵
         * @method egret.Matrix#prependTransform
         * @param x {number} x值
         * @param y {number} y值
         * @param scaleX {number} 水平缩放
         * @param scaleY {number} 垂直缩放
         * @param rotation {number} 旋转
         * @param skewX {number} x方向斜切
         * @param skewY {number} y方向斜切
         * @param regX {number} x值偏移
         * @param regY {number} y值偏移
         * @returns {egret.Matrix}
         */
        public prependTransform(x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX:number, regY:number):Matrix {
            if (rotation % 360) {
                var r = rotation;// * Matrix.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }

            if (regX || regY) {
                // append the registration offset:
                this.tx -= regX;
                this.ty -= regY;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single prepend operation?
//                skewX *= Matrix.DEG_TO_RAD;
//                skewY *= Matrix.DEG_TO_RAD;
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
                this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            } else {
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            return this;
        }


        /**
         * 后置矩阵
         * @method egret.Matrix#appendTransform
         * @param x {number} x值
         * @param y {number} y值
         * @param scaleX {number} 水平缩放
         * @param scaleY {number} 垂直缩放
         * @param rotation {number} 旋转
         * @param skewX {number} x方向斜切
         * @param skewY {number} y方向斜切
         * @param regX {number} x值偏移
         * @param regY {number} y值偏移
         * @returns {egret.Matrix}
         */
        public appendTransform(x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX:number, regY:number):Matrix {
            if (rotation % 360) {
                var r = rotation;// * Matrix.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }

            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
//                skewX *= Matrix.DEG_TO_RAD;
//                skewY *= Matrix.DEG_TO_RAD;
                this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            } else {
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }

            if (regX || regY) {
                // prepend the registration offset:
                this.tx -= regX * this.a + regY * this.c;
                this.ty -= regX * this.b + regY * this.d;
            }
            return this;
        }

        /**
         * 对 Matrix 对象应用旋转转换。
         * 矩阵旋转，以角度制为单位
         * @method egret.Matrix#rotate
         * @param angle {number} 角度
         * @returns {egret.Matrix}
         */
        public rotate(angle:number):Matrix {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;

            this.a = a1 * cos - this.b * sin;
            this.b = a1 * sin + this.b * cos;
            this.c = c1 * cos - this.d * sin;
            this.d = c1 * sin + this.d * cos;
            this.tx = tx1 * cos - this.ty * sin;
            this.ty = tx1 * sin + this.ty * cos;
            return this;
        }


        /**
         * 矩阵斜切，以角度值为单位
         * @method egret.Matrix#skew
         * @param skewX {number} x方向斜切
         * @param skewY {number} y方向斜切
         * @returns {egret.Matrix}
         */
        public skew(skewX:number, skewY:number):Matrix {
//            skewX = skewX * Matrix.DEG_TO_RAD;
//            skewY = skewY * Matrix.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
            return this;
        }


        /**
         * 矩阵缩放
         * @method egret.Matrix#scale
         * @param x {number} 水平缩放
         * @param y {number} 垂直缩放
         * @returns {egret.Matrix}
         */
        public scale(x:number, y:number):Matrix {
            this.a *= x;
            this.d *= y;
            this.c *= x;
            this.b *= y;
            this.tx *= x;
            this.ty *= y;
            return this;
        }


        /**
         * 沿 x 和 y 轴平移矩阵，由 x 和 y 参数指定。
         * @method egret.Matrix#translate
         * @param x {number} 沿 x 轴向右移动的量（以像素为单位）。
         * @param y {number} 沿 y 轴向下移动的量（以像素为单位）。
         * @returns {egret.Matrix}
         */
        public translate(x:number, y:number):Matrix {
            this.tx += x;
            this.ty += y;
            return this;
        }


        /**
         * 为每个矩阵属性设置一个值，该值将导致 null 转换。
         * 通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @method egret.Matrix#identity
         * @returns {egret.Matrix}
         */
        public identity():Matrix {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
        }

        /**
         * 矩阵重置为目标矩阵
         * @method egret.Matrix#identityMatrix
         * @param matrix {egret.Matrix} 重置的目标矩阵
         * @returns {egret.Matrix}
         */
        public identityMatrix(matrix:Matrix):Matrix {
            this.a = matrix.a;
            this.b = matrix.b;
            this.c = matrix.c;
            this.d = matrix.d;
            this.tx = matrix.tx;
            this.ty = matrix.ty;
            return this;
        }

        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @method egret.Matrix#invert
         * @returns {egret.Matrix}
         */
        public invert():Matrix {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;

            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
        }


        /**
         * 根据一个矩阵，返回某个点在该矩阵上的坐标
         * @method egret.Matrix.transformCoords
         * @param matrix {egret.Matrix}
         * @param x {number}
         * @param y {number}
         * @returns {numberPoint}
         * @stable C 该方法以后可能删除
         */
        public static transformCoords(matrix:Matrix, x:number, y:number):Point {
            var resultPoint:Point = new Point(0, 0);
            resultPoint.x = matrix.a * x + matrix.c * y + matrix.tx;
            resultPoint.y = matrix.d * y + matrix.b * x + matrix.ty;

//        resultPoint.x = matrix.a * x + matrix.c * y - matrix.tx;
//        resultPoint.y = matrix.d * y + matrix.b * x - matrix.ty;
            return resultPoint;
        }
    }
}
