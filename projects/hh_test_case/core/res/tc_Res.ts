/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../../tc_init.ts" />
module tc{
    unit.curModuleName = moduleName_Res;

    unit.addMenuItem('加载图片', function(){
        var url = res_helper.getItemUrl(11001);
        hh.res.load(url, function(){
            var img = hh.res.get(url);
            console.log(img);
        });
    });
}