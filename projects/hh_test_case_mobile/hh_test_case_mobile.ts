/**
 * Created by SmallAiTT on 2015/7/6.
 */
unit.htmlMenuEnabled = false;
module tc{

    //解析http参数
    export function parseParam():any{
        var data = {};
        var src = window.location.href;
        var index = src.indexOf('?');
        if(index > 0){
            var str = src.substring(index + 1);
            var arr = str.split('&');
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var paramStr = arr[i];
                var param = paramStr.split('=');
                var pKey = param[0], pValue:any = param[1];
                if(pValue.match(/(^\d+$)/)){
                    pValue = parseInt(pValue);
                }else if(pValue.match(/(^\d+.\d+$)/)){
                    pValue = parseFloat(pValue);
                }
                data[pKey] = window['unescape'](window['decodeURI'](pValue));
            }
        }
        return data;
    }

    hh.engine.once(hh.Engine.AFTER_BOOT, function(){
        var param = parseParam();
        console.log(param);
        unit.onMenu(param.moduleName, param.itemName);
    });
}
