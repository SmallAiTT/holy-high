///<reference path="../../src/boot.ts" />
///<reference path="../../src/core/reference-core.ts" />
hh.boot(function(){
    var canvas:any = document.getElementById("canvas");
    var renderCtx:CanvasRenderingContext2D = canvas.getContext("2d");

    //hh.Node.debug = true;
    var node:hh.ColorNode = new hh.ColorNode();
    node.width = 100;
    node.height = 100;
    node.x = 10;
    node.y = 10;

    var node2:hh.ColorNode = new hh.ColorNode();
    node2.x = 20;
    node2.y = 20;
    node2.width = 100;
    node2.height = 100;
    node2.color = "blue";
    node.addChild(node2);

//    var tempCanvas1:any = document.createElement("canvas");
//    tempCanvas1.width = 100;
//    tempCanvas1.height = 100;
//    var renderCtx1:CanvasRenderingContext2D = tempCanvas1.getContext("2d");
//    node.visit(renderCtx1);

    hh.root.addChild(node);

});