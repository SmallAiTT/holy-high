/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;

    unit.addMenuItem('点击事件测试', function(){
        var TH = hh.TouchEvent;
        var func = function(event:hh.TouchEvent, x, y, type, target){
            console.log(type, '--->', target, x, y);
        };
        var stage:hh.Node = hh.engine.stage;

        var node1 = new hh.Node();
        node1.touchable = true;
        node1.debug = true;
        node1.name = 'node1';
        node1.width = node1.height = 200;
        node1.x = node1.y = 200;
        node1.on(TH.BEGIN, func, {touchType:'BEGAN'});
        node1.on(TH.MOVE, func, {touchType:'MOVE'});
        node1.on(TH.END, func, {touchType:'END'});
        stage.addChild(node1);

        var node2 = new hh.Node();
        node2.touchable = true;
        node2.debug = true;
        node2.name = 'node2';
        node2.width = node2.height = 200;
        node2.x = node2.y = 25;
        node2.scaleX = node2.scaleY = 0.5;
        node2.rotation = Math.PI/4;
        node2.on(TH.BEGIN, func, {touchType:'BEGAN'});
        node2.on(TH.MOVE, func, {touchType:'MOVE'});
        node2.on(TH.END, func, {touchType:'END'});
        node1.addChild(node2);


        // 裁剪的节点
        var node3 = new hh.Node();
        node3.touchable = false;
        node3.debug = true;
        node3.name = 'node3';
        node3.x = node3.y = 100;
        node3.width = node3.height = 100;
        // 设置矩形裁剪
        node3.clip = hh.Node.CLIP_RECT;
        node3.on(TH.BEGIN, func, {touchType:'BEGAN'});
        node3.on(TH.MOVE, func, {touchType:'MOVE'});
        node3.on(TH.END, func, {touchType:'END'});
        node1.addChild(node3);

        var node4 = new hh.Node();
        node4.touchable = false;
        node4.debug = true;
        node4.name = 'node4';
        node4.x = node4.y = 100;
        node4.width = node4.height = 100;
        node4._nodeOpt.debugRectColor = 'blue';
        node4.on(TH.BEGIN, func, {touchType:'BEGAN'});
        node4.on(TH.MOVE, func, {touchType:'MOVE'});
        node4.on(TH.END, func, {touchType:'END'});
        node3.addChild(node4);

    });
}
