/**
 * Created by SmallAiTT on 2015/7/3.
 */
///<reference path="../../tc_init.ts" />
module tc{
    unit.curModuleName = moduleName_Node;

    unit.addMenuItem('点击事件测试', function(){
        var node1 = new hh.Node();
        node1.name = 'node1';
        node1.width = node1.height = 200;
        node1.x = node1.y = 100;

        var node2 = new hh.Node();
        node2.name = 'node2';
        node2.width = node2.height = 200;
        node2.x = node2.y = 25;
        node2.scaleX = node2.scaleY = 0.5;
        node2.rotation = Math.PI/4;

        var stage:hh.Node = hh.engine.stage;
        stage.addChild(node1);
        node1.addChild(node2);

        var handler1 = node1.touchHandler, handler2 = node2.touchHandler;
        var TH = hh.TouchHandler;
        var func = function(handler, x, y, phase){
            console.log(this.touchType, '--->', handler.target.name, x, y, phase);
        };
        handler1.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler1.on(TH.MOVE, func, {touchType:'MOVE'});
        handler1.on(TH.END, func, {touchType:'END'});

        handler2.on(TH.BEGAN, func, {touchType:'BEGAN'});
        handler2.on(TH.MOVE, func, {touchType:'MOVE'});
        handler2.on(TH.END, func, {touchType:'END'});
    });
}