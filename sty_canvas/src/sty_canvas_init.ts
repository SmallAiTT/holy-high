/**
 * Created by SmallAiTT on 2015/6/26.
 */
///<reference path="ref.ts" />
module sty_canvas{
    export var moduleName = "sty_canvas";
    unit.curModuleName = moduleName;
    unit.addMenuItem("test", function(param:any){
        console.log("test");
        param.name = "name";
    }, function(param){
        console.log("release--->", param);
    });
}