/**
 * Created by SmallAiTT on 2015/6/29.
 */
///<reference path="../../tc_init.ts" />
module tc{
    unit.curModuleName = moduleName_Node;
    unit.addMenuItem('Node遍历测试', function(param){
        hh.Node.debug = true;
        var node1 = new hh.Node();
        node1.name = 'node1';
        node1.width = node1.height = 100;

        var node2 = new hh.Node();
        node2.name = 'node2';
        node2.width = node2.height = 100;
        node2.x = 110;

        var node3 = new hh.Node();
        node3.name = 'node3';
        node3.width = node3.height = 100;
        node3.x = 220;
        node3.scaleX = node3.scaleY = 0.5;

        var node4 = new hh.Node();
        node4.name = 'node4';
        node4.width = node4.height = 100;
        node4.x = node4.y = 110;
        node4.scaleX = node4.scaleY = 0.5;
        node4.anchorX = node4.anchorY = 0.5;

        var node5 = new hh.Node();
        node5.name = 'node5';
        node5.width = node5.height = 100;
        node5.x = 220;
        node5.y = 110;
        node5.scaleX = node5.scaleY = 0.5;
        node5.anchorX = node5.anchorY = 0.5;
        node5.rotation = Math.PI/4;

        var node6 = new hh.Node();
        node6.name = 'node5';
        node6.width = node6.height = 100;
        node6.x = 0;
        node6.y = 100;
        node6.scaleX = node6.scaleY = 0.5;
        node6.anchorX = node6.anchorY = 0.5;
        var distance = 300, speed = 10;
        var rate = 1;
        var mv = function(){
            if(rate == 1 && (node6.x + speed > distance)) rate = -1;
            else if(rate == -1 && (node6.x - speed < 0)) rate = 1;
            node6.x += speed*rate;
            node6.rotation += 0.1;
        };

        hh.tick(mv);
        param.mv = mv;

        hh.engine.stage
            .addChild(node1)
            .addChild(node2)
            .addChild(node3)
            .addChild(node4)
            .addChild(node5)
            .addChild(node6);
    }, function(param){
        hh.unTick(param.mv);
    });
}