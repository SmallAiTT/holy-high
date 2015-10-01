/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;

    unit.addMenuItem('点击事件测试', function(){
        var TH = hh.Touch;
        var func = function(handler, x, y, phase){
            console.log(this.touchType, '--->', handler.target.name, x, y, phase);
        };
        var stage:hh.Node = hh.engine.stage;

        var node1 = new hh.Node();
        node1.name = 'node1';
        node1.width = node1.height = 200;
        node1.x = node1.y = 200;
        var handler1 = node1.touch;
        handler1.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler1.on(TH.MOVE, func, {touchType:'MOVE'});
        handler1.on(TH.END, func, {touchType:'END'});
        stage.addChild(node1);

        var node2 = new hh.Node();
        node2.name = 'node2';
        node2.width = node2.height = 200;
        node2.x = node2.y = 25;
        node2.scaleX = node2.scaleY = 0.5;
        node2.rotation = Math.PI/4;
        var handler2 = node2.touch;
        handler2.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler2.on(TH.MOVE, func, {touchType:'MOVE'});
        handler2.on(TH.END, func, {touchType:'END'});
        node1.addChild(node2);


        // 裁剪的节点
        var node3 = new hh.Node();
        node3.name = 'node3';
        node3.x = node3.y = 100;
        node3.width = node3.height = 100;
        // 设置矩形裁剪
        node3.clip = hh.Node.CLIP_RECT;
        var handler3 = node3.touch;
        handler3.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler3.on(TH.MOVE, func, {touchType:'MOVE'});
        handler3.on(TH.END, func, {touchType:'END'});
        node1.addChild(node3);

        var node4 = new hh.Node();
        node4.name = 'node4';
        node4.x = node4.y = 100;
        node4.width = node4.height = 100;
        node4._nodeOpt.debugRectColor = 'blue';
        var handler4 = node4.touch;
        handler4.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler4.on(TH.MOVE, func, {touchType:'MOVE'});
        handler4.on(TH.END, func, {touchType:'END'});
        node3.addChild(node4);

    });
}
