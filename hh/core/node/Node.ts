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
            var width = target.width, height = target.height;
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
        };

        static CLIP_ARC:Function = function(ctx:IRenderingContext2D, engine:Engine, target:Node){
            var width = target.width, height = target.height;
            var max = Math.max(width, height);
            var min = Math.min(width, height);
            ctx.arc(width/2, height/2, max/2, 0, Math.PI*2);
        };

        _nodeOpt:NodeOpt;

        static Touch:any = Touch;
        touch:Touch;

        //@override
        _initProp(){
            super._initProp();
            var self = this, clazz = self.__c;
            self._nodeOpt = new NodeOpt(clazz);
            self.touch = new clazz.Touch();
            self.touch.target = self;
        }
        _dtor(){
            super._dtor();
            var self = this;
            self._nodeOpt.dtor();
            self.touch.dtor();
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
        _setWidth(width:number){
            this._nodeOpt.width = width;
        }
        public set width(width:number){
            this._setWidth(width);
        }
        public get width():number{
            return this._nodeOpt.width;
        }
        /**
         * 高度
         */
        _setHeight(height:number){
            this._nodeOpt.height = height;
        }
        public set height(height:number){
            this._setHeight(height);
        }
        public get height():number{
            return this._nodeOpt.height;
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
        _setScaleX(scaleX:number){
            this._nodeOpt.scaleX = scaleX;
        }
        public set scaleX(scaleX:number){
            this._setScaleX(scaleX);
        }
        public get scaleX():number{
            return this._nodeOpt.scaleX;
        }
        /**
         * y轴缩放
         */
        _setScaleY(scaleY:number){
            this._nodeOpt.scaleY = scaleY;
        }
        public set scaleY(scaleY:number){
            this._setScaleY(scaleY);
        }
        public get scaleY():number{
            return this._nodeOpt.scaleY;
        }

        /**
         * x轴锚点
         */
        _setAnchorX(anchorX:number){
            this._nodeOpt.anchorX = anchorX;
        }
        public set anchorX(anchorX:number){
            this._setAnchorX(anchorX);
        }
        public get anchorX():number{
            return this._nodeOpt.anchorX;
        }
        /**
         * y轴锚点
         */
        _setAnchorY(anchorY:number){
            this._nodeOpt.anchorY = anchorY;
        }
        public set anchorY(anchorY:number){
            this._setAnchorY(anchorY);
        }
        public get anchorY():number{
            return this._nodeOpt.anchorY;
        }

        /**
         * 旋转
         */
        _setRotation(rotation:number){
            this._nodeOpt.rotation = rotation;
        }
        public set rotation(rotation:number){
            this._setRotation(rotation);
        }
        public get rotation():number{
            return this._nodeOpt.rotation;
        }

        /**
         * zIndex
         */
        _setZIndex(zIndex:number){
            this._nodeOpt.zIndex = zIndex;
        }
        public set zIndex(zIndex:number){
            this._setZIndex(zIndex);
        }
        public get zIndex():number{
            return this._nodeOpt.zIndex;
        }

        /**
         * 是否可见。
         */
        _setVisible(visible:boolean){
            this._nodeOpt.visible = visible;
        }
        public set visible(visible:boolean){
            this._setVisible(visible);
        }
        public get visible():boolean{
            return this._nodeOpt.visible;
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

        /**
         * 转换节点。
         */
        _trans(engine:Engine){
            var self = this, clazz = self.__c, nodeOpt = self._nodeOpt;
            var children = nodeOpt.children;
            var renderQueue = engine._renderQueue;
            nodeOpt.renderQueueRange[0] = renderQueue.length;
            // 如果该节点是可绘制的就放到绘制队列中
            if(nodeOpt.drawable) renderQueue.push(self._draw, self);
            // 如果是测试模式则将测试的绘制代码也放到绘制列表中
            if(clazz.debug) renderQueue.push(self._drawDebug, self);
            if(nodeOpt.clip) {
                // 如果当前节点可裁剪，则推送到裁剪计算队列中
                engine._clipQueue.push(self);
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
            engine._matrixQueue.push(self._calMatrix, self);

            //遍历子节点
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child = children[i];
                // 可见才可以继续进行转化
                if(child._nodeOpt.visible) child._trans(engine);
            }

            if(layout){
                layout.onAfter(self);
            }

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
            var self = this, nodeOpt = self._nodeOpt;
            // 设置转化
            var matrix = nodeOpt.matrix;
            ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            // 开始渲染节点
            self._render(ctx, engine);
        }
        /**
         * 渲染节点。
         * @param ctx
         * @private
         */
        _render(ctx:IRenderingContext2D, engine:Engine){
            // 子类在此实现真正的绘制
        }

        _drawDebug(ctx:IRenderingContext2D, engine:Engine){
            // 进行debug模式绘制
            var self = this, nodeOpt = self._nodeOpt;

            // 设置转化
            var matrix = nodeOpt.matrix;
            ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);

            var width = nodeOpt.width, height = nodeOpt.height;
            ctx.save();
            if(nodeOpt.debugRectColor) {
                ctx.fillStyle = nodeOpt.debugRectColor;
                ctx.fillRect(0, 0, width, height);
            }
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.strokeRect(0, 0, width, height);
            var ps = 10;
            ctx.fillRect(width*nodeOpt.anchorX - ps/2, height*nodeOpt.anchorY - ps/2, ps, ps);
            ctx.restore();
        }

        /**
         * 计算世界转化
         * @private
         */
        _calMatrix(){
            var self = this;
            var nodeOpt = self._nodeOpt, parent = nodeOpt.parent;
            var matrix = nodeOpt.matrix;
            if(parent) {
                var pNodeOpt = parent._nodeOpt;
                var pm = pNodeOpt.matrix;
                matrix.identityMatrix(pm);
                nodeOpt.worldAlpha = pNodeOpt.worldAlpha * nodeOpt.alpha;
            }

            var offsetX = nodeOpt.width*nodeOpt.anchorX;
            var offsetY = nodeOpt.height*nodeOpt.anchorY;

            var hackMatrix = (<any>self).__hack_local_matrix;// TODO
            if (hackMatrix) {
                matrix.append(hackMatrix.a, hackMatrix.b, hackMatrix.c, hackMatrix.d, hackMatrix.tx, hackMatrix.ty);
                matrix.append(1, 0, 0, 1, -offsetX, -offsetY);
            }
            else {
                matrix.appendTransform(nodeOpt.x, nodeOpt.y, nodeOpt.scaleX, nodeOpt.scaleY, nodeOpt.rotation,
                    nodeOpt.skewX, nodeOpt.skewY, offsetX, offsetY);
            }
            //var scrollRect = do_props._scrollRect;
            //if (scrollRect) {
            //    worldTransform.append(1, 0, 0, 1, -scrollRect.x, -scrollRect.y);
            //}

//            if (this._texture_to_render){
//                var bounds:egret.Rectangle = DisplayObject.getTransformBounds(o._getSize(Rectangle.identity), o._worldTransform);
//                o._worldBounds.initialize(bounds.x, bounds.y, bounds.width, bounds.height);
//            }
        }
    }
}
