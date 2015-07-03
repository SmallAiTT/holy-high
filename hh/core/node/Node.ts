/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="NodeOpt.ts" />
///<reference path="../touch/TouchHandler.ts" />
module hh{
    export class Node extends Emitter{
        static __className:string = "Node";
        static debug:boolean = true;

        static NodeOpt:any = NodeOpt;
        _nodeOpt:NodeOpt;

        static TouchHandler:any = TouchHandler;
        touchHandler:TouchHandler;

        //@override
        _initProp(){
            super._initProp();
            var self = this, clazz = self.__class;
            self._nodeOpt = new clazz.NodeOpt(clazz);
            self.touchHandler = new clazz.TouchHandler();
            self.touchHandler.target = self;
        }
        _dtor(){
            super._dtor();
            var self = this;
            self._nodeOpt.dtor();
            self.touchHandler.dtor();
            // 解除绑定
            self.touchHandler = null;
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
         * 转换节点。
         */
        _trans(engine:Engine){
            var self = this, clazz = self.__class, nodeOpt = self._nodeOpt;
            var children = nodeOpt.children;
            // 进行世界转化，可能需要推送到渲染队列中也不一定，根据今后改造决定
            self._calMatrix();
            if(nodeOpt.drawable) engine._renderQueue.push(self._draw, self);
            if(clazz.debug) engine._renderQueue.push(self._drawDebug, self);
            //遍历子节点
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child = children[i];
                // 可见才可以继续进行转化
                if(child._nodeOpt.visible) child._trans(engine);
            }
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