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


    var count = 0;
    var flag = 1;
    var a = 1;
    setInterval(function(){
        if(count >= 200){
            flag = -1;
        }else if(count <=0){
            flag = 1;
        }
        count += a*flag;
        node.x = count;
    }, 10);

    hh.mainLoop(function(){
        renderCtx.clearRect(0, 0, canvas.width, canvas.height);
        node.visit(renderCtx);
    })
});