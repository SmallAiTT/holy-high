/**
 * Created by SmallAiTT on 2015/6/26.
 */

///<reference path="ref.ts" />
module unit{
    var _curMenuInfo:any[];
    var _curMenuParam:any;
    export function onMenu(moduleName:string, itemName:string){
        if(_curMenuInfo){
            var releaseFunc = _curMenuInfo[1];
            if(releaseFunc) releaseFunc(_curMenuParam);
            _curMenuInfo = null;
        }
        var menuInfoMap = _moduleMenuMap[moduleName];
        if(menuInfoMap){
            var menuInfo = menuInfoMap[itemName];
            var func = menuInfo[0];
            if(func) {
                _curMenuInfo = menuInfo;
                _curMenuParam = {};
                func(_curMenuParam);
            }
        }
    }

    var _moduleMenuMap = {};
    export var curModuleName:string = "default";
    export function addMenuItem(itemName, func:Function, releaseFunc?:Function){
        var menuInfoMap = _moduleMenuMap[unit.curModuleName];
        if(!menuInfoMap) menuInfoMap = _moduleMenuMap[unit.curModuleName] = {};
        menuInfoMap[itemName] = [func, releaseFunc];
    }

    export function releaseDefault(param){

    }



    var _menuStr = '';
    var _menuNameTemp = '<tr><td><div>${moduleName}</div></td></tr>';
    var _menuItemTemp = '<tr><td><a href="#" onclick="unit.onMenu(\'${moduleName}\', \'${name}\')" >${name}</a></td></tr>';

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