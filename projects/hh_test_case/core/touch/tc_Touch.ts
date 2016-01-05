/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;

    var func = function(event:hh.TouchEvent, type, target:hh.Node){
        console.log(target.name, '--->', type, event.x, event.y);
    };
    var _addListeners = function(node:hh.Node){
        var TH = hh.TouchEvent;
        node.on(TH.BEGIN, func);
        node.on(TH.MOVE, func);
        node.on(TH.END, func);
        node.on(TH.TAP, func);
    };

    var _addTouchNode = function(parent:hh.Node, name:string, size:number, pos:number, touchable:boolean){
        var node = new hh.Node();
        node.name = name;
        node.debug = true;
        node.width = node.height = size;
        node.x = node.y = pos;
        node.touchable = touchable;
        _addListeners(node);
        parent.addChild(node);
        return node;
    }

    unit.addMenuItem('点击事件测试', function(){
        var stage:hh.Node = hh.engine.stage;

        var node1 = _addTouchNode(stage, 'node1', 200, 200, true);
        var node2 = _addTouchNode(node1, 'node2', 100, 100, true);
        var node3 = _addTouchNode(node2, 'node3', 200, 200, true);
        node3.scaleX = node2.scaleY = 0.5;
        node3.rotation = Math.PI/4;
    });
}
