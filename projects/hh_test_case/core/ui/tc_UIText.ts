/**
 * Created by SmallAiTT on 2015/7/7.
 */
module tc {
    unit.curModuleName = moduleName_ui;

    unit.addMenuItem('文本', function(){
        var uTxt = new hh.UIText();
        uTxt.text = 'Holy-High 游戏引擎 好厉害';
        uTxt.x = uTxt.y = 100;

        hh.engine.stage.addChild(uTxt);
    });
}
