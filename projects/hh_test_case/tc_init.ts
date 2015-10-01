/**
 * Created by SmallAiTT on 2015/6/29.
 */
module tc{
    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    logger.initLogger(tc, 'tc');

    export var moduleName_Node:string = "Node 测试";
    export var moduleName_Res:string = "Res 测试";
    export var moduleName_ui:string = "UI 测试";
}
