///<reference path="../../src/boot.ts" />
///<reference path="../../src/core/reference-core.ts" />
hh.boot(function(){
    //hh.ColorNode.debug = true;
    var node1:hh.ColorNode = new hh.ColorNode();
    node1.name = "node1";
    node1.width = 100;
    node1.height = 100;
    node1.x = 10;
    node1.y = 10;
    hh.root.addChild(node1);

    var node2:hh.ColorNode = new hh.ColorNode();
    node2.name = "node2";
    node2.x = 20;
    node2.y = 20;
    node2.width = 100;
    node2.height = 100;
    node2.color = "blue";
    node2.rotation = 50;
    hh.root.addChild(node2);

    var node3:hh.ColorNode = new hh.ColorNode();
    node3.x = 40;
    node3.y = 40;
    node3.width = 100;
    node3.height = 100;
    node3.color = "#444444";
    node1.addChild(node3);

    hh.loadImage("res/item_00001.png", function(err, texture){
        var image = new hh.UIImage();
        image.texture = texture;
        hh.root.addChild(image);
    });

});