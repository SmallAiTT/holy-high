/**
 * Created by SmallAiTT on 2015/7/7.
 */
module tc {
    unit.curModuleName = moduleName_txt;

    var testByNum = function(num:number){
        unit.addMenuItem('数量'+num, function(){
        hh.Txt.debug = false;
        var stage:hh.Node = hh.engine.stage;
        var w = stage.w, h = stage.h;
        for(var i = 0; i < num; ++i){
            var randX = w*(Math.random());
            var randY = h*(Math.random());
            var txt = new hh.Txt();
            txt.x = randX;
            txt.y = randY;
            txt.value = '测试文本';
            stage.addChild(txt);
        }
        });
    }
    unit.addMenuItem('文本', function(){
        var uTxt = new hh.Txt();
        uTxt.value = 'Holy-High 游戏引擎 好厉害';
        uTxt.x = 100;
        uTxt.y = 200;
        uTxt.h = 20;

        hh.engine.stage.addChild(uTxt);
    });
    testByNum(100);
    testByNum(200);
    testByNum(400);
    testByNum(600);
}
