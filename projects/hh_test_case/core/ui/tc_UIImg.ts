/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../../tc_init.ts" />
module tc{
    unit.curModuleName = moduleName_ui;

    unit.addMenuItem('UIImg#load', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getItemUrl(11001);
        var img = new hh.UIImg();
        img.x = img.y = 150;
        img.load(url);

        hh.engine.stage.addChild(img);
    });

    unit.addMenuItem('UIImg#bcsh', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getItemUrl(11001);
        var img = new hh.UIImg();
        img.x = img.y = 150;
        img.load(url);

        img.setBCSH(5, 5, 5, 5);

        hh.engine.stage.addChild(img);
    });

    unit.addMenuItem('UIImg 数量测试', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.res.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 600; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.grid = [3, 39, 2];
                img.height = 200;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg 数量测试 clip1', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.res.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 2000; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.grid = [3, 39, 2];
                img.height = 200;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg 数量测试 clip2', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.res.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var node:hh.Node = new hh.Node();
            node.width = node.height = 100;
            node.x = node.y = 200;
            node.clip = hh.Node.CLIP_RECT;
            stage.addChild(node);
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 2000; ++i){
                var randX = w*(Math.random()) - w/2;
                var randY = h*(Math.random()) - h/2;
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.grid = [3, 39, 2];
                img.height = 200;
                img.load(url);
                node.addChild(img);
            }
        });

    });

    unit.addMenuItem('UIImg#grid 三宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(1);
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.grid = [3, 39, 2];
        img1.height = 200;
        img1.load(url);

        hh.engine.stage.addChild(img1);


        var url = res_helper.getS9gUrl(1);
        var img2 = new hh.UIImg();
        img2.x = 300;
        img2.y = 150;
        img2.grid = [4, 39, 2];
        img2.width = 200;
        img2.load(url);

        hh.engine.stage.addChild(img2);
    });
}