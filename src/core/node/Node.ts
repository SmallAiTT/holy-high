/// <reference path="../event/EventDispatcher.ts" />

module hh{
    export class Node extends Class{
        static __className:string = "Node";
        static debug:boolean;

        public debug:boolean;

        _name:string;
        _setName(name:string){
            this._name = name;
        }
        public set name(name:string){
            this._setName(name);
        }
        public get name():string{
            return this._name;
        }

        _visible:boolean;
        _setVisible(visible:boolean){
            this._visible = visible;
        }
        public set visible(visible:boolean){
            this._setVisible(visible);
        }
        public get visible():boolean{
            return this._visible;
        }

        _setValueOrPercent(value:any, valueFunc, percentFunc):boolean{
            var type:string = typeof value;
            var self = this;
            if(type == "number"){
                valueFunc.call(self, value);
            }else if(type == "string"){
                if(type.match(/^((\d+)|(\d+.\d*))%$/)){
                    percentFunc.call(self, parseFloat(type.substring(0, type.length - 1))/100);
                    return true;
                }else if(type.match(/^((\d+)|(\d+.\d*))$/)){
                    valueFunc.call(self, parseFloat(type)/100);
                }
            }else{
                error(logCode.e_2);
            }
            return false;
        }

        /**
         * x坐标
         */
        _x:number;
        _xDirty:boolean;
        _xPercent:number;//x坐标百分比。
        _xPercentDirty:boolean;
        _xPercentEnabled:boolean;
        _setXPercent(xPercent:number){
            var self = this;
            if(self._xPercent != xPercent) self._xPercentDirty = true;
            self._xPercent = xPercent;
        }
        _setX(x:number){
            var self = this;
            if(self._x != x) self._xDirty = true;
            self._x = x;
        }
        _onXPercentDirty():void{}
        _onXDirty():void{}
        public set x(x:number){
            var self = this;
            var flag = self._xPercentEnabled;
            self._xPercentEnabled = self._setValueOrPercent(x, self._setX, self._setXPercent);
            if(self._xPercentEnabled && !flag){
                self._xPercentDirty = true;
            }else if(!self._xPercentDirty){
                self._xPercentDirty = false;
            }
        }
        public get x():number{
            return this._x;
        }

        /**
         * y坐标
         */
        _y:number;
        _yDirty:boolean;
        _yPercent:number;//y坐标百分比
        _yPercentDirty:boolean;//y坐标百分比dirty
        _yPercentEnabled:boolean;
        _setYPercent(yPercent:number){
            var self = this;
            if(self._yPercent != yPercent) self._yPercentDirty = true;
            self._yPercent = yPercent;
        }
        _setY(y:number){
            var self = this;
            if(self._y != y) self._yDirty = true;
            self._y = y;
        }
        _onYPercentDirty():void{}
        _onYDirty():void{}
        public set y(y:number){
            var self = this;
            var flag = self._yPercentEnabled;
            self._yPercentEnabled = self._setValueOrPercent(y, self._setY, self._setYPercent);
            if(self._yPercentEnabled && !flag){
                self._yPercentDirty = true;
            }else if(!self._yPercentEnabled){
                self._yPercentDirty = false;
            }
        }
        public get y():number{
            return this._y;
        }

        /**
         * 宽度
         */
        _width:number;
        _widthDirty:boolean;
        _widthPercent:number;//宽度百分比
        _widthPercentDirty:boolean;//宽度百分比dirty
        _widthPercentEnabled:boolean;
        _setWidthPercent(widthPercent:number){
            var self = this;
            if(self._widthPercent != widthPercent) self._widthPercentDirty = true;
            self._widthPercent = widthPercent;
        }
        _setWidth(width:number){
            var self = this;
            if(self._width != width) self._widthDirty = true;
            self._width = width;
        }
        _onWidthPercentDirty():void{}
        _onWidthDirty():void{}
        public set width(width:any){
            var self = this;
            var flag = self._widthPercentEnabled;
            self._widthPercentEnabled = self._setValueOrPercent(width, self._setWidth, self._setWidthPercent);
            if(self._widthPercentEnabled && !flag){
                self._widthPercentDirty = true;
            }else if(!self._widthPercentEnabled){
                self._widthPercentDirty = false;
            }
        }
        public get width():any{
            return this._width;
        }

        /**
         * 高度
         */
        _height:number;
        _heightDirty:boolean;
        _heightPercent:number;//高度百分比
        _heightPercentDirty:boolean;//高度百分比dirty
        _heightPercentEnabled:boolean;
        _setHeightPercent(heightPercent:number){
            var self = this;
            if(self._heightPercent != heightPercent) self._heightPercentDirty = true;
            self._heightPercent = heightPercent;
        }
        _setHeight(height:number){
            var self = this;
            if(self._height != height) self._heightDirty = true;
            self._height = height;
        }
        _onHeightPercentDirty():void{}
        _onHeightDirty():void{}
        public set height(height:number){
            var self = this;
            var flag = self._heightPercentEnabled;
            self._heightPercentEnabled = self._setValueOrPercent(height, self._setHeight, self._setHeightPercent);
            if(self._heightPercentEnabled && !flag){
                self._heightPercentDirty = true;
            }else if(!self._heightPercentEnabled){
                self._heightPercentDirty = false;
            }
        }
        public get height():number{
            return this._height;
        }


        /**
         * z轴堆叠顺序，按照html命名
         */
        _zIndex:number;
        _setZIndex(zIndex:number){
            var self = this;
            if(self._parent && self._zIndex != zIndex) {//这时候设置父亲需要重排子节点列表
                self._parent._childrenDirty = true;
            }
            self._zIndex = zIndex;
        }
        public set zIndex(zIndex:number){
            this._setZIndex(zIndex);
        }
        public get zIndex():number{
            return this._zIndex;
        }

        /**
         * x轴缩放
         */
        _scaleX:number;
        _setScaleX(scaleX:number){
            this._scaleX = scaleX;
        }
        public set scaleX(scaleX:number){
            this._setScaleX(scaleX);
        }
        public get scaleX():number{
            return this._scaleX;
        }

        /**
         * y轴缩放
         */
        _scaleY:number;
        _setScaleY(scaleY:number){
            this._scaleY = scaleY;
        }
        public set scaleY(scaleY:number){
            this._setScaleY(scaleY);
        }
        public get scaleY():number{
            return this._scaleY;
        }


        /**
         * 缩放
         */
        _setScale(scale:number){
            this._setScaleX(scale);
            this._setScaleY(scale);
        }
        public set scale(scale:number){
            this._setScale(scale);
        }


        /**
         * 旋转
         */
        _rotation:number;
        _setRotation(rotation:number){
            this._rotation = rotation;
        }
        public set rotation(rotation:number){
            this._setRotation(rotation);
        }
        public get rotation():number{
            return this._rotation;
        }


        /**
         * 父亲节点
         */
        _parent:Node;
        _setParent(parent:Node){
            this._parent = parent;
        }
        public set parent(parent:Node){
            this._setParent(parent);
        }
        public get parent():Node{
            return this._parent;
        }

        /**
         * 布局类型
         */
        _layoutType:number;
        _layoutTypeDirty:boolean;
        _setLayoutType(layoutType:number){
            var self = this;
            if(self._layoutType != layoutType) self._layoutTypeDirty = true;
            self._layoutType = layoutType;
        }
        public set layoutType(layoutType:number){
            this._setLayoutType(layoutType);
        }
        public get layoutType():number{
            return this._layoutType;
        }

        /**
         * 是否开启布局功能。
         */
        _layoutEnabled:boolean;
        _setLayoutEnabled(layoutEnabled:boolean){
            this._layoutEnabled = layoutEnabled;
        }
        public set layoutEnabled(layoutEnabled:boolean){
            this._setLayoutEnabled(layoutEnabled);
        }
        public get layoutEnabled():boolean{
            return this._layoutEnabled;
        }

        /**
         * 上内边距。
         */
        _paddingTop:number;
        _paddingTopDirty:boolean;
        _setPaddingTop(paddingTop:number){
            var self = this;
            if(self._paddingTop != paddingTop) self._paddingTopDirty = true;
            self._paddingTop = paddingTop;
        }
        public set paddingTop(paddingTop:number){
            this._setPaddingTop(paddingTop);
        }
        public get paddingTop():number{
            return this._paddingTop;
        }
        _onPaddingTopDirty():void{}

        /**
         * 右内边距。
         */
        _paddingRight:number;
        _paddingRightDirty:boolean;
        _setPaddingRight(paddingRight:number){
            var self = this;
            if(self._paddingRight != paddingRight) self._paddingRightDirty = true;
            self._paddingRight = paddingRight;
        }
        public set paddingRight(paddingRight:number){
            this._setPaddingRight(paddingRight);
        }
        public get paddingRight():number{
            return this._paddingRight;
        }
        _onPaddingRightDirty():void{}

        /**
         * 下内边距。
         */
        _paddingBottom:number;
        _paddingBottomDirty:boolean;
        _setPaddingBottom(paddingBottom:number){
            var self = this;
            if(self._paddingBottom != paddingBottom) self._paddingBottomDirty = true;
            self._paddingBottom = paddingBottom;
        }
        public set paddingBottom(paddingBottom:number){
            this._setPaddingBottom(paddingBottom);
        }
        public get paddingBottom():number{
            return this._paddingBottom;
        }
        _onPaddingBottomDirty():void{}

        /**
         * 左内边距。
         */
        _paddingLeft:number;
        _paddingLeftDirty:boolean;
        _setPaddingLeft(paddingLeft:number){
            var self = this;
            if(self._paddingLeft != paddingLeft) self._paddingLeftDirty = true;
            self._paddingLeft = paddingLeft;
        }
        public set paddingLeft(paddingLeft:number){
            this._setPaddingLeft(paddingLeft);
        }
        public get paddingLeft():number{
            return this._paddingLeft;
        }
        _onPaddingLeftDirty():void{}

        /**
         * 设置内边距，【上右下左】
         * @param padding
         */
        public set padding(padding){
            var self = this;
            if(padding instanceof Array){
                self._setPaddingTop(padding[0]);
                self._setPaddingRight(padding[1]);
                self._setPaddingBottom(padding[2]);
                self._setPaddingLeft(padding[3]);
            }
        }

        /**
         * 上外边距。
         */
        _marginTop:number;
        _marginTopDirty:boolean;
        _setMarginTop(marginTop:number){
            var self = this;
            if(self._marginTop != marginTop) self._marginTopDirty = true;
            self._marginTop = marginTop;
        }
        public set marginTop(marginTop:number){
            this._setMarginTop(marginTop);
        }
        public get marginTop():number{
            return this._marginTop;
        }
        _onMarginTopDirty():void{}

        /**
         * 右外边距。
         */
        _marginRight:number;
        _marginRightDirty:boolean;
        _setMarginRight(marginRight:number){
            var self = this;
            if(self._marginRight != marginRight) self._marginRightDirty = true;
            self._marginRight = marginRight;
        }
        public set marginRight(marginRight:number){
            this._setMarginRight(marginRight);
        }
        public get marginRight():number{
            return this._marginRight;
        }
        _onMarginRightDirty():void{}

        /**
         * 下外边距。
         */
        _marginBottom:number;
        _marginBottomDirty:boolean;
        _setMarginBottom(marginBottom:number){
            var self = this;
            if(self._marginBottom != marginBottom) self._marginBottomDirty = true;
            self._marginBottom = marginBottom;
        }
        public set marginBottom(marginBottom:number){
            this._setMarginBottom(marginBottom);
        }
        public get marginBottom():number{
            return this._marginBottom;
        }
        _onMarginBottomDirty():void{}

        /**
         * 左外边距。
         */
        _marginLeft:number;
        _marginLeftDirty:boolean;
        _setMarginLeft(marginLeft:number){
            var self = this;
            if(self._marginLeft != marginLeft) self._marginLeftDirty = true;
            self._marginLeft = marginLeft;
        }
        public set marginLeft(marginLeft:number){
            this._setMarginLeft(marginLeft);
        }
        public get marginLeft():number{
            return this._marginLeft;
        }
        _onMarginLeftDirty():void{}

        /**
         * 设置外边距，【上右下左】
         * @param margin
         */
        public set margin(margin){
            var self = this;
            if(margin instanceof Array){
                self._setMarginTop(margin[0]);
                self._setMarginRight(margin[1]);
                self._setMarginBottom(margin[2]);
                self._setMarginLeft(margin[3]);
            }
        }

        /**
         * 垂直排列类型。
         */
        _verticalAlign:number;
        _verticalAlignDirty:boolean;
        _setVerticalAlign(verticalAlign:number){
            var self = this;
            if(self._verticalAlign != verticalAlign) self._verticalAlignDirty = true;
            self._verticalAlign = verticalAlign;
        }
        public set verticalAlign(verticalAlign:number){
            this._setVerticalAlign(verticalAlign);
        }
        public get verticalAlign():number{
            return this._verticalAlign;
        }
        _onVerticalAlignDirty():void{}

        /**
         * 水平排列类型。
         */
        _horizontalAlign:number;
        _horizontalAlignDirty:boolean;
        _setHorizontalAlign(horizontalAlign:number){
            var self = this;
            if(self._horizontalAlign != horizontalAlign) self._horizontalAlignDirty = true;
            self._horizontalAlign = horizontalAlign;
        }
        public set horizontalAlign(horizontalAlign:number){
            this._setHorizontalAlign(horizontalAlign);
        }
        public get horizontalAlign():number{
            return this._horizontalAlign;
        }
        _onHorizontalAlignDirty():void{}

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._visible = true;
            self._x = 0;
            self._y = 0;
            self._width = 0;
            self._height = 0;
            self._zIndex = 0;
            self._xPercent = 0;
            self._yPercent = 0;
            self._widthPercent = 0;
            self._heightPercent = 0;
            self._children = [];
        }

        _children:Node[];
        _childrenDirty:boolean;

        /**
         * 添加子节点。
         * 如果改节点已经被添加在其他的节点上，则会先进行移除操作。
         * 如果子节点已经添加了，则返回false。
         * @param child
         * @returns {boolean}
         */
        public addChild(child:Node):boolean{
            var self = this;
            if(child._parent && self != child._parent){//如果改节点已经被添加在其他的节点上
                child._parent.removeChild(child);
            }
            var children = self._children;
            var indexToInsert = 0;
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var cNode = children[i];
                if(child == cNode) {//已经添加了
                    return false;
                }else if(child._zIndex < cNode._zIndex){//算出需要插入的位置
                    indexToInsert = i;
                    break;
                }else{
                    indexToInsert = i+1;
                }
            }
            children.splice(indexToInsert, 0, child);
            child.parent = self;
            return true;
        }

        /**
         * 移除子节点。
         * 如果child确实是该节点的子节点，则返回true，否则返回false
         * @param child
         * @returns {boolean}
         */
        public removeChild(child:Node):boolean{
            var self = this;
            var children = self._children;
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var cNode = children[i];
                if(child == cNode) {
                    children.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
         * 将自身从父亲节点移除。
         * 如果不存在父亲，则返回false，否则返回true
         */
        public removeFromParent():boolean{
            var self = this;
            if(!self._parent) return false;
            return self._parent.removeChild(self);
        }

        /**
         * 对子节点进行排序（按照zIndex进行排序，zIndex越大则排在越后面）。
         */
        public sortChildren():void{
            this._children.sort(function(a:Node, b:Node){
                if(a._zIndex > b._zIndex) return 1;
                if(a._zIndex < b._zIndex) return -1;
                return 0;
            });
        }

        /**
         * 设置在父节点中的布局情况
         * @param preVisibleSibling
         * @param nextSibling
         * @private
         */
        _doLayoutInParent(preVisibleSibling:Node, nextSibling:Node):void{
            var self = this, parent = self._parent;
            if(!parent) return;//没有父亲则直接返回
            if(!parent._layoutEnabled) return;//父节点未开启布局功能
            var pLayoutType = parent._layoutType, pLayoutTypeDirty = parent._layoutTypeDirty;
            if(pLayoutType == LAYOUT_ABSOLUTE){//绝对布局则不做处理
                //do nothing
            }else if(pLayoutType == LAYOUT_RELATIVE){//相对布局
                if(pLayoutTypeDirty || self._widthDirty){//TODO 或者相对布局参数dirty

                }
                if(pLayoutTypeDirty || self._heightDirty){//TODO 或者相对布局参数dirty

                }
            }else if(pLayoutType == LAYOUT_LINEAR_H){//线性水平布局
                if(pLayoutTypeDirty || self._widthDirty || preVisibleSibling._xDirty || preVisibleSibling._widthDirty){//TODO 或者线性水平布局参数dirty

                }
            }else if(pLayoutType == LAYOUT_LINEAR_V){//线性垂直布局
                if(pLayoutTypeDirty || self._heightDirty || preVisibleSibling._yDirty || preVisibleSibling._heightDirty){//TODO 或者线性垂直布局参数dirty

                }
            }
        }


        public visit(renderCtx, preVisibleSibling?:Node, nextSibling?:Node):void{
            var self = this, clazz = self.__class;

            if(!self._visible) return;
            var parent = self._parent;

            if(self._childrenDirty) self.sortChildren();//需要重新对子节点排序
            if(parent){
                //百分比设置需要父节点存在
                if(self._widthPercentDirty) self._onWidthPercentDirty();
                if(self._heightPercentDirty) self._onHeightPercentDirty();
                if(self._xPercentDirty) self._onXPercentDirty();
                if(self._yPercentDirty) self._onYPercentDirty();
            }
            if(self._xDirty) self._onXDirty();
            if(self._yDirty) self._onYDirty();
            if(self._widthDirty) self._onWidthDirty();
            if(self._heightDirty) self._onHeightDirty();

            self._onBeforeVisit(preVisibleSibling, nextSibling);

            if(parent && parent._layoutEnabled)//当存在父节点并且父节点开启布局管理的时候才进行
                self._doLayoutInParent(preVisibleSibling, nextSibling);//在父节点内部进行布局

            self._onVisit(preVisibleSibling, nextSibling);
            self._onUpdateView();
            var children:Node[] = self._children, index:number = 0, length:number = children.length;
            //先遍历zIndex<0的部分
            var preVisibleSiblingTemp:Node = null;//上一个可见的兄弟节点
            for (; index < length; index++) {
                var child = children[index];
                if(child._zIndex >= 0) break;
                if(child._visible){
                    child.visit(renderCtx, preVisibleSiblingTemp, children[index+1]);
                    preVisibleSiblingTemp = child;
                }
            }

            self._transform(renderCtx);//转化
            renderCtx.save();
            renderCtx.translate(self._transX, self._transY);
            renderCtx.rotate(self._rotation);
            renderCtx.scale(self._scaleX, self._scaleY);
            self._draw(renderCtx);//进行自身视图的绘制
            if(clazz.debug || self.debug) self._drawDebug(renderCtx);
            renderCtx.restore();

            //再遍历zIndex>=0的部分
            for (; index < length; index++) {
                var child = children[index];
                if(child._visible){
                    child.visit(renderCtx, preVisibleSiblingTemp, children[index+1]);
                    preVisibleSiblingTemp = child;
                }
            }
            self._onAfterVisit(preVisibleSibling, nextSibling);
            renderCtx["enterFromRoot"] = false;
        }
        _onBeforeVisit(preVisibleSibling:Node, nextSibling:Node):void{}
        _onVisit(preVisibleSibling:Node, nextSibling:Node):void{}
        _onAfterVisit(preVisibleSibling:Node, nextSibling:Node):void{
            var self = this, parent = self._parent;
            self._xDirty = false;
            self._yDirty = false;
            self._widthDirty = false;
            self._heightDirty = false;
            self._childrenDirty = false;
            if(parent){
                //只有当父节点存在是，才将百分比dirty重置
                self._xPercentDirty = false;
                self._yPercentDirty = false;
                self._widthPercentDirty = false;
                self._heightPercentDirty = false;
            }
            if(self._layoutEnabled) {//只有当开启布局管理时，才需要将布局类型dirty重置
                self._layoutTypeDirty = false;
            }
        }
        _onUpdateView():void{}

        _transX:number;
        _transY:number;
        _transWidth:number;
        _transHeight:number;
        _transform(renderCtx:CanvasRenderingContext2D){
            var self = this, parent = self._parent;
            var transX = 0, transY = 0;
            if(parent){
                transX += parent._transX || 0;
                transY += parent._transY || 0;
            }
            if(renderCtx["enterFromRoot"]){
                self._transX = transX + self._x;
                self._transY = transY + self._y;
            }else{
                self._transX = 0;
                self._transY = 0;
                renderCtx["enterFromRoot"] = true;
            }
            self._transWidth = self._width;
            self._transHeight = self._height;
        }
        _draw(renderCtx:CanvasRenderingContext2D):void{
        }
        _drawDebug(renderCtx:CanvasRenderingContext2D):void{
            var self = this;
            var transWidth = self._transWidth, transHeight = self._transHeight;

            renderCtx.beginPath();
            renderCtx.moveTo(0, 0); // 设置路径起点，坐标为(20,20)
            renderCtx.lineTo(transWidth, 0); // 绘制一条到(200,20)的直线
            renderCtx.lineTo(transWidth, transHeight); // 绘制一条到(200,20)的直线
            renderCtx.lineTo(0, transHeight); // 绘制一条到(200,20)的直线
            renderCtx.closePath();
            renderCtx.lineWidth = 1.0; // 设置线宽
            renderCtx.strokeStyle = "#ff0000"; // 设置线的颜色
            renderCtx.stroke(); // 进行线的着色，这时整条线才变得可见
        }
    }
}