/**
 * Created by SmallAiTT on 2015/7/1.
 */
module tc{
    unit.curModuleName = moduleName_Res;

    unit.addMenuItem('加载图片', function(){
        var url = res_helper.getItemUrl(11001);
        hh.RES.load(url, function(){
            var img = hh.RES.get(url);
            console.log(img);
        });
    });
}
