///<reference path="../base/mainLoop" />
///<reference path="Node.ts" />

module hh{
    export class Root extends Node{

    }

    export var root:Root, renderCtx:CanvasRenderingContext2D;

    export function initRoot(){
        var canvas:any = document.getElementById("canvas");
        renderCtx = canvas.getContext("2d");
        root = new Root();
        root.width = canvas.width;
        root.height = canvas.height;
        mainLoop(function(){
            renderCtx.clearRect(0, 0, canvas.width, canvas.height);
            root.visit(renderCtx);
        });
    }

}