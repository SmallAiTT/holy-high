/**
 * Created by SmallAiTT on 2015/6/26.
 */

///<reference path="ref.ts" />
module unit{
    var _curMenuInfo4Ctx:any[];
    var _curMenuParam4Ctx:any;
    export function onMenu4Ctx(moduleName:string, itemName:string){
        if(_curMenuInfo4Ctx){
            var releaseFunc = _curMenuInfo4Ctx[1];
            if(releaseFunc) releaseFunc(_curMenuParam4Ctx);
            _curMenuInfo4Ctx = null;
        }
        var menuInfoMap = _moduleMenuMap[moduleName];
        if(menuInfoMap){
            var menuInfo = menuInfoMap[itemName];
            var func = menuInfo[0];
            if(func) {
                _curMenuInfo4Ctx = menuInfo;
                _curMenuParam4Ctx = {};
                var ctx = hh.context.canvasContext;
                releaseDefault4Ctx({});
                ctx.save();
                func(ctx, _curMenuParam4Ctx);
            }
        }
    }

    var _moduleMenuMap = {};
    export var curModuleName:string = "default";
    export function addMenuItem4Ctx(itemName, func:Function, releaseFunc?:Function){
        var menuInfoMap = _moduleMenuMap[unit.curModuleName];
        if(!menuInfoMap) menuInfoMap = _moduleMenuMap[unit.curModuleName] = {};
        menuInfoMap[itemName] = [func, releaseFunc];
    }

    export function releaseDefault4Ctx(param){
        var canvas = hh.context._canvas;
        var ctx = hh.context.canvasContext;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }



    var _menuStr = '';
    var _menuNameTemp = '<tr><td><div>${moduleName}</div></td></tr>';
    var _menuItemTemp = '<tr><td><a href="#" onclick="unit.onMenu4Ctx(\'${moduleName}\', \'${name}\')" >${name}</a></td></tr>';

    hh.context.once(hh.Context.AFTER_BOOT, function(){
        _menuStr += '<table>';
        for (var moduleName in _moduleMenuMap) {
            _menuStr += hh.formatPlaceholder(_menuNameTemp, {moduleName:moduleName});
            var moduleInfo = _moduleMenuMap[moduleName];
            for (var name in moduleInfo) {
                _menuStr += hh.formatPlaceholder(_menuItemTemp, {moduleName:moduleName, name:name});
            }
        }
        _menuStr += '</table>';
        document.getElementById('div_menuRoot').innerHTML = _menuStr;
    });

}