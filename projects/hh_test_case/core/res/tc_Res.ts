/**
 * Created by SmallAiTT on 2015/7/1.
 */
module tc{
    unit.curModuleName = moduleName_Res;

    unit.addMenuItem('加载图片', function(){
        var url = res_helper.getItemUrl(11001);
        hh.R.load(url, function(){
            var img = hh.R.get(url);
            console.log(img);
        });
    });
}
