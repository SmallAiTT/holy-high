///<reference path="../../src/boot.ts" />
///<reference path="../../src/core/reference-core.ts" />
hh.boot(function(){
    var canvas:any = document.getElementById("canvas");
    var renderCtx:CanvasRenderingContext2D = canvas.getContext("2d");

    var node:hh.Node = new hh.Node();
    node.width = 100;
    node.height = 100;
    node.x = 10;
    node.y = 10;

    var node2:hh.Node = new hh.Node();
    node2.x = 20;
    node2.y = 20;
    node2.width = 100;
    node2.height = 100;
    node.addChild(node2);


    node.visit(renderCtx);
});