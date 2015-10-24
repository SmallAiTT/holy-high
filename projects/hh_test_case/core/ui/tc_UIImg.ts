/**
 * Created by SmallAiTT on 2015/7/1.
 */
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

    unit.addMenuItem('UIImg 数量测试100', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 100; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.addChild(img);
            }
        });

    });

    unit.addMenuItem('UIImg 数量测试200', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 200; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg 数量测试400', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 400; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg 数量测试600', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 600; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg clip 区域测试', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var node:hh.Node = new hh.Node();
            node.width = node.height = 100;
            node.x = node.y = 200;
            node.rotation = Math.PI/4;
            node.clip = hh.Node.CLIP_RECT;
            stage.addChild(node);

            var img = new hh.UIImg();
            img.x = img.y = 0;
            img.load(url);
            node.addChild(img);

            var img = new hh.UIImg();
            img.rotation = Math.PI/4;
            img.scaleX = 0.5;
            img.x = img.y = 200;
            img.load(url);
            node.addChild(img);
        });

    });
    unit.addMenuItem('UIImg 数量测试 clip1', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 2000; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.load(url);
                stage.addChild(img);
            }
        });

    });
    unit.addMenuItem('UIImg 数量测试 clip2', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
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
                img.load(url);
                node.addChild(img);
            }
        });

    });

    unit.addMenuItem('UIImg#grid 九宫格', function(){
        hh.UIImg.debug = true;
        var url = res_helper.getS9gUrl(1);
        var img1 = new hh.UIImg();
        img1.x = img1.y = 150;
        img1.grid = [1, 39, 39, 2, 2];
        img1.width = img1.height = 200;
        img1.load(url);

        hh.engine.stage.addChild(img1);
    });

    unit.addMenuItem('UIImg九宫格数量100', function(){
        hh.UIImg.debug = false;
        var url = res_helper.getS9gUrl(1);
        hh.RES.load(url, function(){
            var stage:hh.Node = hh.engine.stage;
            var w = stage.width, h = stage.height;
            for(var i = 0; i < 100; ++i){
                var randX = w*(Math.random());
                var randY = h*(Math.random());
                var img = new hh.UIImg();
                img.x = randX;
                img.y = randY;
                img.grid = [1, 39, 39, 2, 2];
                img.width = img.height = 100;
                img.load(url);
                stage.addChild(img);
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
