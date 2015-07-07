/**
 * Created by SmallAiTT on 2015/6/26.
 */

///<reference path="ref.ts" />
module unit{
    export var htmlMenuEnabled:boolean = true;
    var _curMenuInfo:any[];
    var _curMenuParam:any;
    var _moduleMenuMap = {};
    export var curModuleName:string = 'default';

    export function onMenu4Ctx(moduleName:string, itemName:string){
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
                var ctx = hh.engine.canvasCtx;
                releaseDefault4Ctx({});
                ctx.save();
                func(ctx, _curMenuParam);
            }
        }
    }

    export function addMenuItem4Ctx(itemName, func:Function, releaseFunc?:Function){
        var menuInfoMap = _moduleMenuMap[unit.curModuleName];
        if(!menuInfoMap) menuInfoMap = _moduleMenuMap[unit.curModuleName] = {};
        menuInfoMap[itemName] = [func, releaseFunc, 'onMenu4Ctx'];
    }

    export function releaseDefault4Ctx(param){
        var canvas = hh.engine._canvas;
        var ctx = hh.engine.canvasCtx;
        ctx.restore();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


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
                var ctx = hh.engine.canvasCtx;
                releaseDefault({});
                ctx.save();
                func(_curMenuParam);
            }
        }
    }

    export function addMenuItem(itemName, func:Function, releaseFunc?:Function){
        var menuInfoMap = _moduleMenuMap[unit.curModuleName];
        if(!menuInfoMap) menuInfoMap = _moduleMenuMap[unit.curModuleName] = {};
        menuInfoMap[itemName] = [func, releaseFunc, 'onMenu'];
    }

    export function releaseDefault(param){
        var canvas = hh.engine._canvas;
        hh.engine.stage.rmChildren();
        var ctx = hh.engine.canvasCtx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }



    var _menuStr = '';
    var _menuNameTemp = '<tr><td><div>${moduleName}</div></td></tr>';
    var _menuItemTemp = '<tr><td><a href="#" onclick="unit.${onMenu}(\'${moduleName}\', \'${name}\')" >${name}</a></td></tr>';

    hh.engine.once(hh.Engine.AFTER_BOOT, function(){
        if(!unit.htmlMenuEnabled) return;
        _menuStr += '<table>';
        for (var moduleName in _moduleMenuMap) {
            _menuStr += hh.STR.placeholder(_menuNameTemp, {moduleName:moduleName});
            var moduleInfo = _moduleMenuMap[moduleName];
            for (var name in moduleInfo) {
                _menuStr += hh.STR.placeholder(_menuItemTemp, {moduleName:moduleName, name:name, onMenu:[moduleInfo[name][2]]});
            }
        }
        _menuStr += '</table>';
        document.getElementById('div_menuRoot').innerHTML = _menuStr;
    });

}