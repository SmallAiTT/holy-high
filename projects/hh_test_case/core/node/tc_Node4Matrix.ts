/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;
    class Node4Matrix1 extends hh.Node{

        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._setWidth(100);
            self._setHeight(100);
            self._setAnchorX(0);
            self._setAnchorY(0);
        }

        //@override
        _calMatrix(transOpt){
            super._calMatrix(transOpt);
            var matrix:hh.Matrix = this._nodeOpt.matrix;
            var w = this.width;
            var h = this.height;
            var arr = [[0, 0], [0, h], [w, 0], [w, h], [w/2, h/2]];
            var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var arr2 = arr[i];
                var x = arr2[0], y = arr2[1];
                var x1 = a*x + c*y + tx;
                var y1 = b*x + d*y + ty;
                log(i, x1, y1);
            }
        }
    }

    unit.addMenuItem('Node4Matrix 测试1', function(){
        var node = new Node4Matrix1();
        node.x = 100;
        node.y = 100;
        hh.engine.stage.addChild(node);
    });

    unit.addMenuItem('Node4Matrix 测试2', function(){
        var node = new Node4Matrix1();
        node.x = 100;
        node.y = 100;
        node.anchorX = node.anchorY = 0.5;
        hh.engine.stage.addChild(node);
    });

    unit.addMenuItem('Node4Matrix 测试3', function(){
        var node = new Node4Matrix1();
        node.x = 100;
        node.y = 100;
        node.anchorX = node.anchorY = 0.5;
        node.scaleX = node.scaleY = 0.5;
        hh.engine.stage.addChild(node);
    });

    unit.addMenuItem('Node4Matrix 测试4', function(){
        var node = new Node4Matrix1();
        node.x = 100;
        node.y = 100;
        node.anchorX = node.anchorY = 0.5;
        node.scaleX = node.scaleY = 0.5;
        node.rotation = Math.PI/4;
        hh.engine.stage.addChild(node);
    });
}
