/**
 * Created by SmallAiTT on 2015/6/29.
 */
module tc{
    unit.curModuleName = moduleName_Node;
    unit.addMenuItem('Node遍历测试', function(param){
        hh.Node.debug = true;
        var node1 = new hh.Node();
        node1.name = 'node1';
        node1.w = node1.h = 100;

        var node2 = new hh.Node();
        node2.name = 'node2';
        node2.w = node2.h = 100;
        node2.x = 110;

        var node3 = new hh.Node();
        node3.name = 'node3';
        node3.w = node3.h = 100;
        node3.x = 220;
        node3.sx = node3.sy = 0.5;

        var node4 = new hh.Node();
        node4.name = 'node4';
        node4.w = node4.h = 100;
        node4.x = node4.y = 110;
        node4.sx = node4.sy = 0.5;
        node4.ax = node4.ay = 0.5;

        var node5 = new hh.Node();
        node5.name = 'node5';
        node5.w = node5.h = 100;
        node5.x = 220;
        node5.y = 110;
        node5.sx = node5.sy = 0.5;
        node5.ax = node5.ay = 0.5;
        node5.r = Math.PI/4;

        var node6 = new hh.Node();
        node6.name = 'node5';
        node6.w = node6.h = 100;
        node6.x = 0;
        node6.y = 100;
        node6.sx = node6.sy = 0.5;
        node6.ax = node6.ay = 0.5;
        var distance = 300, speed = 10;
        var rate = 1;
        var mv = function(){
            if(rate == 1 && (node6.x + speed > distance)) rate = -1;
            else if(rate == -1 && (node6.x - speed < 0)) rate = 1;
            node6.x += speed*rate;
            node6.r += 0.1;
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

    unit.addMenuItem('Node 数量测试200', function(){
        hh.Node.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 200; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.Node();
                img.x = randX;
                img.y = randY;
                img.h = 200;
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('Node 数量测试400', function(){
        hh.Node.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 400; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.Node();
                img.x = randX;
                img.y = randY;
                img.h = 200;
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('Node 数量测试600', function(){
        hh.Node.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.w, h = stage.h;
            for(var i = 0; i < 600; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.Node();
                img.x = randX;
                img.y = randY;
                img.h = 200;
                stage.addChild(img);
            }
        });

    });
}
