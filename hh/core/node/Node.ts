/**
 * Created by SmallAiTT on 2015/6/29.
 */
module hh{
    export class Node extends Emitter{
        static debug:boolean = true;

        /**
         * 矩形裁剪
         * @param ctx
         * @param engine
         * @param target
         * @constructor
         */
        static CLIP_RECT:Function = function(ctx:IRenderingContext2D, engine:Engine, target:Node){
            var width = target.w, height = target.h;
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
        };

        static CLIP_ARC:Function = function(ctx:IRenderingContext2D, engine:Engine, target:Node){
            var width = target.w, height = target.h;
            var max = Math.max(width, height);
            var min = Math.min(width, height);
            ctx.arc(width/2, height/2, max/2, 0, Math.PI*2);
        };

        _nodeOpt:NodeOpt;

        static Touch:any = Touch;
        touch:Touch;
        debug:boolean;

        //@override
        _initProp(){
            super._initProp();
            var self = this, clazz = self.__c;
            self._nodeOpt = new NodeOpt(clazz);
            self.touch = new clazz.Touch();
            self.touch.target = self;
        }
        _release(){
            super._release();
            var self = this;
            self._nodeOpt.release();
            self.touch.release();
            // 解除绑定
            self.touch = null;
        }

        /**
         * name
         */
        _setName(name:string){
            this._nodeOpt.name = name;
        }
        public set name(name:string){
            this._setName(name);
        }
        public get name():string{
            return this._nodeOpt.name;
        }

        /**
         * 宽度
         */
        _setW(width:number){
            this._nodeOpt.w = width;
        }
        public set w(width:number){
            this._setW(width);
        }
        public get w():number{
            return this._nodeOpt.w;
        }
        /**
         * 高度
         */
        _setH(h:number){
            this._nodeOpt.h = h;
        }
        public set h(h:number){
            this._setH(h);
        }
        public get h():number{
            return this._nodeOpt.h;
        }
        /**
         * x轴位置
         */
        _setX(x:number){
            this._nodeOpt.x = x;
        }
        public set x(x:number){
            this._setX(x);
        }
        public get x():number{
            return this._nodeOpt.x;
        }
        /**
         * y轴位置
         */
        _setY(y:number){
            this._nodeOpt.y = y;
        }
        public set y(y:number){
            this._setY(y);
        }
        public get y():number{
            return this._nodeOpt.y;
        }

        /**
         * X轴缩放
         */
        _setSX(sx:number){
            this._nodeOpt.sx = sx;
        }
        public set sx(sx:number){
            this._setSX(sx);
        }
        public get sx():number{
            return this._nodeOpt.sx;
        }
        /**
         * y轴缩放
         */
        _setSY(sy:number){
            this._nodeOpt.sy = sy;
        }
        public set sy(sy:number){
            this._setSY(sy);
        }
        public get sy():number{
            return this._nodeOpt.sy;
        }

        /**
         * x轴锚点
         */
        _setAX(ax:number){
            this._nodeOpt.ax = ax;
        }
        public set ax(ax:number){
            this._setAX(ax);
        }
        public get ax():number{
            return this._nodeOpt.ax;
        }
        /**
         * y轴锚点
         */
        _setAY(ay:number){
            this._nodeOpt.ay = ay;
        }
        public set ay(ay:number){
            this._setAY(ay);
        }
        public get ay():number{
            return this._nodeOpt.ay;
        }

        /**
         * 旋转
         */
        _setR(r:number){
            this._nodeOpt.r = r;
        }
        public set r(r:number){
            this._setR(r);
        }
        public get r():number{
            return this._nodeOpt.r;
        }

        /**
         * zIndex
         */
        _setZ(z:number){
            this._nodeOpt.z = z;
        }
        public set z(z:number){
            this._setZ(z);
        }
        public get z():number{
            return this._nodeOpt.z;
        }

        /**
         * 是否可见。
         */
        _setV(v:boolean){
            this._nodeOpt.v = v;
        }
        public set v(visible:boolean){
            this._setV(visible);
        }
        public get v():boolean{
            return this._nodeOpt.v;
        }

        public set resizableByRes(resizableByRes:boolean){
            this._nodeOpt.resizableByRes = resizableByRes;
        }
        public get resizableByRes():boolean{
            return this._nodeOpt.resizableByRes;
        }

        public set t(t:boolean){
            this._nodeOpt.t = t;
        }
        public get t():boolean{
            return this._nodeOpt.t;
        }

        /**
         * 添加子节点。
         * @param child
         * @returns {hh.Node}
         */
        public addChild(child:Node):Node{
            var self = this, children = self._nodeOpt.children;
            // TODO 需要根据zIndex进行排序
            if(children.indexOf(child) < 0){
                var cNodeOpt = child._nodeOpt;
                // 如果已经在别的节点上了，就先进行移除
                if(cNodeOpt.parent) cNodeOpt.parent.rmChild(child);
                children.push(child);
                cNodeOpt.parent = self;
            }
            return self;
        }
        /**
         * 移除子节点。
         * @param child
         * @returns {hh.Node}
         */
        public rmChild(child:Node):Node{
            var self = this, children = self._nodeOpt.children;
            var index = children.indexOf(child);
            if(index >= 0) {
                children.splice(index, 1);
                child._nodeOpt.parent = null;
            }
            return self;
        }

        public rmChildren():Node{
            var self = this, children = self._nodeOpt.children;
            var l = children.length;
            while(l > 0){
                var child = children.pop();
                // 解除父亲绑定
                child._nodeOpt.parent = null;
                l--;
            }
            return self;
        }

        /**
         * 移除自身。
         * @returns {hh.Node}
         */
        public rm():Node{
            var self = this, parent = self._nodeOpt.parent;
            if(parent) parent.rmChild(self);
            return self;
        }

        /**
         * 获取所有子节点。获取到的是另一个children数组，避免外部使用导致污染。
         * @returns {Node[]}
         */
        public get children():Node[]{
            var arr:Node[] = [], children = this._nodeOpt.children;
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                arr.push(children[i]);
            }
            return arr;
        }

        /**
         * 布局处理器。
         */
        _setLayout(layout:Layout){
            this._nodeOpt.layout = layout;
        }
        public set layout(layout:Layout){
            this._setLayout(layout);
        }
        public get layout():Layout{
            return this._nodeOpt.layout;
        }

        /**
         * 裁剪器
         * @param clip
         * @private
         */
        _setClip(clip:Function){
            this._nodeOpt.clip = clip;
        }
        public set clip(clip:Function){
            this._setClip(clip);
        }
        public get clip():Function{
            return this._nodeOpt.clip;
        }

        _doClip(ctx:IRenderingContext2D, engine:Engine){
            ctx.save();
            ctx.beginPath();
            this._nodeOpt.clip(ctx, engine, this);
            ctx.clip();
        }
        _restoreClip(ctx:IRenderingContext2D, engine:Engine){
            ctx.restore();
        }

        _testCQ(node, queue, index){
            index = index || 0;

        }
        /**
         * 转换节点。
         */
        _trans(transOpt:TransOpt){
            var self = this, clazz = self.__c, nodeOpt = self._nodeOpt;
            var children = nodeOpt.children;

            // 获取到各种队列
            // 点击队列
            var touchQueue = transOpt.touchQueue;
            // 矩阵队列
            var matrixQueue = transOpt.matrixQueue;
            // 裁剪队列
            var clipQueue = transOpt.clipQueue;
            // 渲染队列
            var renderQueue = transOpt.renderQueue;

            var touchable = nodeOpt.t;
            // 保存好父亲节点当前在可点击队列中的具体位置
            var touchQueueIndex = transOpt.indexToSplice4TouchQueue;// TODO


            // 记录该节点所在的起始点渲染下标
            nodeOpt.renderQueueRange[0] = renderQueue.length;
            // 如果该节点是可绘制的或者是出于debug模式的就放到绘制队列中
            if(nodeOpt.drawable || clazz.debug || self.debug) {
                renderQueue.push(self._draw, self);
            }
            if(nodeOpt.clip) {4
                // 如果当前节点可裁剪，则推送到裁剪计算队列中
                transOpt.clipQueue.push(self);
                renderQueue.push(self._doClip, self);
            }
            nodeOpt.renderQueueRange[1] = renderQueue.length;


            // 如果有设置布局，则进行布局处理
            var layout = nodeOpt.layout;
            if(layout) {
                // 清空
                layout.onBefore(self);
                layout.handle(self);
            }
            // 进行世界转化，需要推送到渲染队列中，延迟到绘制前进行计算
            // 今后还会做dirty的判断，这样就可以更好的提高性能
            matrixQueue.push(self._calMatrix, self);

            if(touchable) touchQueue.splice(touchQueueIndex, 0, self);
            transOpt.indexToSplice4TouchQueue++;// 位置+1
            //遍历子节点
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child = children[i];
                // 可见才可以继续进行转化
                if(child._nodeOpt.v) child._trans(transOpt);
            }
            transOpt.indexToSplice4TouchQueue = touchQueueIndex;// 还原位置
            if(touchable) touchQueue.push(self);

            // 后置的布局计算
            if(layout){
                layout.onAfter(self);
            }

            // 记录该节点所在的结束点渲染下标
            nodeOpt.renderQueueRange[2] = renderQueue.length;
            if(nodeOpt.clip) renderQueue.push(self._restoreClip, self);
            nodeOpt.renderQueueRange[3] = renderQueue.length;

        }

        /**
         * 绘制节点
         * @param ctx
         * @private
         */
        _draw(ctx:IRenderingContext2D, engine:Engine){
            var self = this, nodeOpt = self._nodeOpt, clazz = self.__c;
            var matrix = nodeOpt.matrix4Render;// 使用的是渲染矩阵
            var drawInfo = nodeOpt.drawInfo;
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            var x = 0, y = 0, width = nodeOpt.w, height = nodeOpt.h;
            if(drawInfo[0] == 0) return;// 相当于不画
            else if (drawInfo[0] == 1) {// 使用转换
                ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                engine.transformed = true;
            }else if(engine.transformed){// 如果不使用转换，但是之前有使用过，需要先进行复位
                ctx.setTransform(1,0,0,1,0,0);
                engine.transformed = false;
            }
            // 开始渲染节点
            if(nodeOpt.drawable) self._render(ctx, engine, drawInfo[1], drawInfo[2], drawInfo[3], drawInfo[4]);
            if(clazz.debug || self.debug) self._renderDebug(ctx, engine, drawInfo[1], drawInfo[2], drawInfo[3], drawInfo[4]);
        }
        /**
         * 渲染节点。
         * @param ctx
         * @private
         */
        _render(ctx:IRenderingContext2D, engine:Engine, x:number, y:number, w:number, h:number){
            // 子类在此实现真正的绘制
        }
        _renderDebug(ctx:IRenderingContext2D, engine:Engine, x:number, y:number, w:number, h:number){
            var self = this, nodeOpt = self._nodeOpt;
            if(nodeOpt.debugRectColor) {
                ctx.fillStyle = nodeOpt.debugRectColor;
                ctx.fillRect(x, y, w, h);
            }
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.strokeRect(x, y, w, h);
            // 绘制锚点
            var ps = 10;
            ctx.fillRect(x + w*nodeOpt.ax - ps/2, y + h*nodeOpt.ay - ps/2, ps, ps);
        }

        /**
         * 计算世界转化
         * @private
         */
        _calMatrix(transOpt){
            var self = this;
            var nodeOpt = self._nodeOpt, parent = nodeOpt.parent;
            // 这个表明当前节点是不是自身需要做cache
            var cachable:boolean = nodeOpt.cachable;
            // 需要有一个标示来表明当前是否处于cache计算
            var chaching:boolean = transOpt.caching;

            var x = nodeOpt.x, y = nodeOpt.y, w = nodeOpt.w, h = nodeOpt.h;
            var scaleX = nodeOpt.sx, scaleY = nodeOpt.sy;
            var rotation = nodeOpt.r;
            var skewX = nodeOpt.skewX, skewY = nodeOpt.skewY;
            var offsetX = w*nodeOpt.ax;
            var offsetY = h*nodeOpt.ay;

            var matrix = nodeOpt.matrix;
            var matrix4Render = nodeOpt.matrix4Render;

            if(parent) {
                var pNodeOpt = parent._nodeOpt;
                var pm = pNodeOpt.matrix;
                matrix.identityMatrix(pm);
                nodeOpt.wa = pNodeOpt.wa * nodeOpt.a;

                // 获取到parent的渲染矩阵
                // 这个获取比较特殊，如果父节点就是一个cache节点，
                // 那么该矩阵就应该是一个初始化矩阵
                // 否则就取其的渲染矩阵
                var pMatrix4Render = pNodeOpt.cachable ? new Matrix() : pNodeOpt.matrix4Render;
                matrix4Render.identityMatrix(pMatrix4Render);// 先按照父亲的初始化
            }else{// 如果没有父亲，那么就先初始化为默认矩阵
                matrix.identity();
                matrix4Render.identity();
            }
            // 进行矩阵转换
            matrix.appendTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, offsetX, offsetY);
            matrix4Render.appendTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, offsetX, offsetY);

            // 为了提高性能，对绘制时候时候的转换参数进行区别对待
            // 如果只有正数缩放并且没有旋转的话，就不采取setTransform的方式，因为setTransform很好性能
            var a = matrix4Render.a, b = matrix4Render.b, c = matrix4Render.c, d = matrix4Render.d, tx = matrix4Render.tx, ty = matrix4Render.ty;
            var drawInfo:number[] = nodeOpt.drawInfo;
            x = 0;
            y = 0;
            drawInfo.length = 0;
            if(a == 0 && b == 0 && c == 0 && d == 0) {
                drawInfo.push(0);
                return;// 相当于不画
            }
            else if (b == 0 && c == 0 && a > 0 && d > 0) {
                x = tx;
                y = ty;
                w *= a;
                h *= d;
                drawInfo.push(2);
            }
            else {
                drawInfo.push(1);
            }
            drawInfo.push(x, y, w, h);
        }

        touchTest(wx:number, wy:number):boolean{
            return this.hitTest(wx, wy);
        }
        hitTest(wx:number, wy:number):boolean{
            var self:Node = this;
            var nodeOpt = self._nodeOpt;
            var matrix:Matrix = nodeOpt.matrix;
            // 计算全局坐标映射到该节点之后的坐标
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            var lx = (c*(wy - ty) - d*(wx-tx))/(b*c - a*d);
            var ly = (a*(wy - ty) - b*(wx - tx))/(a*d-b*c);
            var w = nodeOpt.w, h = nodeOpt.h;
            return lx >= 0 && lx <= w && ly >= 0 && ly <= h;
        }
    }
}
