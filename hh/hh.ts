/**
 * Created by SmallAiTT on 2015/6/26.
 */
///<reference path="canvas.d.ts" />
var _thisGlobal:any = this;
_thisGlobal.__extends = _thisGlobal.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }

    __.prototype = b.prototype;
    d.prototype = new __();
};

module logger{
    var _map = {};

    /**
     * 初始化模块日志
     * @param m
     * @param mName
     */
    export function initLogger(m:any, mName){
        _map[mName] = m;
        m.log = console.log.bind(console);
        m.debug = console.debug.bind(console);
        m.info = console.info.bind(console);
        m.warn = console.warn.bind(console);
        m.error = console.error.bind(console);
    }

    /**
     * 设置日志等级
     * @param mName
     * @param lvl
     */
    export function setLvl(mName, lvl){
        if(mName == 'default'){
            for (var key in _map) {
                if(key == 'default') continue;
                var m = _map[key];
                if(!m) continue;
                initLogger(m, key);
                if(lvl > 1){
                    m.log = function(){};
                    m.debug = function(){};
                }
                if(lvl > 2) m.info = function(){};
                if(lvl > 3) m.warn = function(){};
                if(lvl > 4) m.error = function(){};
            }
        }else{
            var m = _map[mName];
            if(!m) return;//该日志还没初始化过，没法设置等级
            initLogger(m, mName);
            if(lvl > 1){
                m.log = function(){};
                m.debug = function(){};
            }
            if(lvl > 2) m.info = function(){};
            if(lvl > 3) m.warn = function(){};
            if(lvl > 4) m.error = function(){};
        }
    }

    /**
     * 根据配置文件信息初始化日志。
     * @param config
     */
    export function initByConfig(config){
        var logLvl = config.logLvl;
        if(typeof logLvl == 'number'){
            logger.setLvl('default', logLvl);
        }else{
            var logLvlDefault = logLvl['default'];
            if(logLvlDefault != null) logger.setLvl('default', logLvlDefault);
            for (var mName in logLvl) {
                if(mName == 'all') continue;
                logger.setLvl(mName, logLvl[mName]);
            }
        }
    }

    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    initLogger(logger, 'logger');
}


module hh.net {
    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    logger.initLogger(hh.net, 'net');

    export function getXHR(){
        return window['XMLHttpRequest'] ? new window['XMLHttpRequest']() : new ActiveXObject('MSXML2.XMLHTTP');
    }

    export function loadTxt(url:string, cb:Function){
        var xhr = hh.net.getXHR(),
            errInfo = 'load ' + url + ' failed!';
        xhr.open('GET', url, true);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader('Accept-Charset', 'utf-8');
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        } else {
            if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
            xhr.onload = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        }
        xhr.send(null);
    }

    export function loadJson(url:string, cb:Function){
        hh.net.loadTxt(url, function (err, txt) {
            if (err) {
                cb(err);
            }
            else {
                try {
                    cb(null, JSON.parse(txt));
                }
                catch (e) {
                    err = 'parse json [' + url + '] failed : ' + e;
                    error(err);
                    cb(err);
                }
            }
        });
    }

    var _getArgs4Js = function (args) {
        var a0 = args[0], a1 = args[1], a2 = args[2], results = ['', null, null];

        if (args.length === 1) {
            results[1] = a0 instanceof Array ? a0 : [a0];
        } else if (args.length === 2) {
            if (typeof a1 === 'function') {
                results[1] = a0 instanceof Array ? a0 : [a0];
                results[2] = a1;
            } else {
                results[0] = a0 || '';
                results[1] = a1 instanceof Array ? a1 : [a1];
            }
        } else if (args.length === 3) {
            results[0] = a0 || '';
            results[1] = a1 instanceof Array ? a1 : [a1];
            results[2] = a2;
        } else throw 'arguments error to load js!';
        if(results[0] != '' && results[0].substring(results[0].length - 1) != '/') results[0] += '/';
        return results;
    };
    var _jsCache = {};
    var _loadScript4H5 = function(jsPath, cb){
        var d = document, s = d.createElement('script');
        s.async = false;
        s.src = jsPath;
        _jsCache[jsPath] = true;
        var _onLoad = function(){
            this.removeEventListener('load', _onLoad, false);
            this.removeEventListener('error', _onError, false);
            cb();
        };
        var _onError = function(){
            this.removeEventListener('load', _onLoad, false);
            this.removeEventListener('error', _onError, false);
            cb('Load ' + jsPath + ' failed!');
        };

        s.addEventListener('load', _onLoad,false);
        s.addEventListener('error', _onError,false);
        d.body.appendChild(s);
    };
    export function loadJs(baseDir?:any, jsList?:any, cb?:any) {
        var args = _getArgs4Js(arguments);
        var preDir = args[0], list = args[1], callback:any = args[2];
        if(!(<any>hh).isNative){
            var asyncPool = new AsyncPool(list, 0, function(item, index, cb1){
                var jsPath = preDir + item;
                if(_jsCache[jsPath]) return cb1();
                _loadScript4H5(jsPath, cb1);
            }, callback);
            asyncPool.flow();
        }else{
            for (var i = 0, l_i = list.length; i < l_i; i++) {
                var jsPath = preDir + list[i];
                if(_jsCache[jsPath]) continue;
                _jsCache[jsPath] = true;
                _thisGlobal.require(jsPath);
            }
            callback();
        }

    }
}

module hh.project {
    var _handlerArr = [];

    /**
     * 注册project值处理函数。
     * @param handler
     */
    export function registerValueHandler(handler){
        _handlerArr.push(handler);
    }

    /**
     * 设置project值。
     * @param data
     * @param key
     * @param isBool
     */
    export function setValue(data, key, isBool?){
        var defaultValue = project[key];
        var dv = data[key];
        if(dv == null) project[key] = defaultValue;
        else{
            dv = isBool ? !!dv : dv;
            project[key] = dv;
        }
    }

    /**
     * 解析project内容
     * @param data
     */
    export function parse(data){
        for (var i = 0, l_i = _handlerArr.length; i < l_i; i++) {
            var handler = _handlerArr[i];
            handler(data);
        }
    }

    //解析http参数
    export function parseParam(){
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
                data[pKey] = pValue;
            }
        }
        project.parse(data);
    }

    //加载project配置
    export function load(cb){
        //加载配置文件
        hh.net.loadJson('project.json', function(err, data){
            if(err){
                logger.error('缺失project.json文件，请检查！');
            }else{
                project.parse(data);
            }
            if((<any>hh).isNative){//不是h5就没有myProject.json和浏览器参数模式
                return cb();
            }
            hh.net.loadJson('myProject.json', function(err, data){
                if(err){
                    project.parseParam();
                    cb();
                }else{
                    project.parse(data);
                    project.parseParam();
                    cb();
                }
            });
        });
    }


    /** 版本号 */
    export var version:string = '0.0.1';
    /** 程序包名，实际上会再加上projName作为真正的包名 */
    export var pkg:string = 'net.holyhigh';
    /** 项目名称 */
    export var projName:string = 'hh';
    /** app名称 */
    export var appName:string = 'HolyHigh精品游戏';
    /** 日志等级 */
    export var logLvl:any = {};
    /** 渲染模式，1为webgl，否则为canvas */
    export var renderMode:number = 1;
    export var canvas:string;
    /** 是否显示FPS */
    export var showFPS:boolean = false;
    /** 帧率 */
    export var frameRate:number = 60;

    /** 设计分辨率 */
    export var design:any = {width:960, height:640};//size
    /** 适配，目前没用 */
    export var resolution:any = {width:0, height:0};//size

    /** 自由选项 */
    export var option:any = {};

    export var scaleMode:string;

    registerValueHandler(function(data){
        setValue(data, 'version');
        setValue(data, 'pkg');
        setValue(data, 'projName');
        setValue(data, 'appName');
        setValue(data, 'logLvl');
        setValue(data, 'renderMode');
        setValue(data, 'showFPS', true);
        setValue(data, 'frameRate');
        setValue(data, 'design');
        setValue(data, 'resolution');
        setValue(data, 'option');
        setValue(data, 'scaleMode');
        setValue(data, 'canvas');
    });
}
module hh.STR{
    /**
     * 格式化参数成String。
     * 参数和h5的console.log保持一致。
     * @returns {*}
     */
    export function format(...args:any[]):string{
        var l = args.length;
        if(l < 1){
            return '';
        }
        var str = args[0];
        var needToFormat = true;
        if(typeof str == 'object'){
            str = JSON.stringify(str);
            needToFormat = false;
        }
        if(str == null) str = 'null';
        str += '';
        var count = 1;
        if(needToFormat){
            var content = str.replace(/(%d)|(%i)|(%s)|(%f)|(%o)/g, function(world){
                if(args.length <= count) return world;
                var value = args[count++];
                if(world == '%d' || world == '%i'){
                    return parseInt(value);
                }else{
                    return value;
                }
            });
            for (var l_i = args.length; count < l_i; count++) {
                content += '    ' + args[count];
            }
            return content;
        }else{
            for(var i = 1; i < l; ++i){
                var arg = args[i];
                arg = typeof arg == 'object' ? JSON.stringify(arg) : arg;
                str += '    ' + arg;
            }
            return str;
        }
    }

    var _tempStrRegExp = /\$\{[^\s\{\}]*\}/g;

    /**
     * 占位符模式替换。
     * @param tempStr
     * @param map
     * @returns {string}
     */
    export function placeholder(tempStr:string, map:any):string{
        function change(word){
            var key = word.substring(2, word.length - 1)
            var value = map[key];
            if(value == null) {
                console.error("formatTempStr时，map中缺少变量【%s】的设置，请检查！", key);
                return word;
            }
            return value;
        }
        return tempStr.replace(_tempStrRegExp, change);
    }
}
module hh {

    export class Class{
        /** 类名 */
        static __className:string = 'Class';

        static __recycler:any[] = [];
        static push(obj:any){
            this.__recycler.push(obj);
        }
        static pop(...args):any{
            var clazz = this;
            var obj = clazz.__recycler.pop();
            if(obj) return obj;
            else clazz.create.apply(clazz, args);
        }

        /** 创建 */
        static create(...args:any[]):any {
            var Class:any = this;
            var obj:any = new Class();
            if (obj.init) obj.init.apply(obj, arguments);
            return obj;
        }

        /** 获取单例 */
        static getInstance(...args:any[]) {
            var Class:any = this;
            if (!Class._instance) {
                var instance:any = Class._instance = Class.create.apply(Class, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        }

        /** 释放单例 */
        static release() {
            var Class:any = this;
            var instance:any = Class._instance;
            if (instance) {
                if (instance.doDtor) instance.doDtor();
                Class._instance = null;
            }
        }

        /** 类名 */
        __className:string;
        /** 实例对应的类 */
        __class:any;
        /** 是否是单例 */
        _isInstance:boolean;
        /** 储藏室 */
        _store:Store;
        /** 是否已经释放了 */
        _hasDtored:boolean;

        _initProp():void {
            var self = this;
            self._store = new Store();
        }

        constructor() {
            var self = this;
            var clazz:any = self.__class = this['constructor'];
            self.__className = clazz.__className;
            self._initProp();
        }

        public init(...args:any[]) {
        }

        public dtor() {
            var self = this;
            if (self._hasDtored) return;
            self._hasDtored = true;
            self._dtor();
        }

        _dtor() {
        }
    }

    /**
     * 异步池
     */
    export class AsyncPool {
        private _srcObj = null;
        private _limit:number = 0;
        private _pool:any[] = [];
        private _iterator:Function = null;
        private _iteratorCtx:any = null;
        private _onEnd:Function = null;
        private _onEndCtx:any = null;
        private _results:any = null;
        private _isErr:boolean = false;

        /** 总大小 */
        public size:number = 0;
        /** 已完成的大小 */
        public finishedSize:number = 0;
        /** 正在工作的大小 **/
        public _workingSize:number = 0;

        constructor(srcObj:any, limit:number, iterator:Function, onEnd:Function, ctx?:any) {
            var self = this;
            self._srcObj = srcObj;
            self._iterator = iterator;
            self._iteratorCtx = ctx;
            self._onEnd = onEnd;
            self._onEndCtx = ctx;
            self._results = srcObj instanceof Array ? [] : {};

            self._each(srcObj, function (value:any, index?:any) {
                self._pool.push({index: index, value: value});
            });

            self.size = self._pool.length;//总大小
            self._limit = limit || self.size;
        }

        _each(obj, iterator:(value:any, index?:any)=>any, context?:any) {
            if (!obj) return;
            if (obj instanceof Array) {
                for (var i = 0, li = obj.length; i < li; i++) {
                    if (iterator.call(context, obj[i], i) === false) return;
                }
            } else {
                for (var key in obj) {
                    if (iterator.call(context, obj[key], key) === false) return;
                }
            }
        }

        public onIterator(iterator:Function, target:any):AsyncPool {
            this._iterator = iterator;
            this._iteratorCtx = target;
            return this;
        }

        public onEnd(endCb:Function, endCbTarget:any):AsyncPool {
            this._onEnd = endCb;
            this._onEndCtx = endCbTarget;
            return this;
        }

        private _handleItem():void {
            var self = this;
            if (self._pool.length == 0) return;//数组长度为0直接返回不操作了
            if (self._workingSize >= self._limit) return;//正在工作的数量应达到限制上限则直接返回
            var item:any = self._pool.shift();
            var value = item.value;
            var index = item.index;
            self._workingSize++;//正在工作的大小+1
            self._iterator.call(self._iteratorCtx, value, index, function (err) {
                if (self._isErr) return;//已经出错了，就直接返回了

                self.finishedSize++;//完成数量+1
                self._workingSize--;//正在工作的大小-1

                if (err) {
                    self._isErr = true;//设置成已经出错了
                    if (self._onEnd) self._onEnd.call(self._onEndCtx, err);//如果出错了
                    return
                }

                var arr = Array.prototype.slice.call(arguments);
                arr.splice(0, 1);//去除第一个参数
                self._results[this.index] = arr[0];//保存迭代器返回结果
                if (self.finishedSize == self.size) {//已经结束
                    if (self._onEnd) self._onEnd.call(self._onEndCtx, null, self._results);
                    return
                }

                if (engine._isMainLooping) {// 如果主循环已经开始执行了，就延迟到下一帧执行
                    hh.nextTick(self._handleItem, self);
                } else {
                    //实在没有就用自带的（浏览器环境下才会进）
                    _thisGlobal.setTimeout(function () {
                        self._handleItem();
                    }, 1);
                }
                //self._handleItem();//继续执行下一个
            }.bind(item), self);
        }

        public flow():void {
            var self = this;
            var onFlow = function () {
                if (self._pool.length == 0) {
                    if (self._onEnd) self._onEnd.call(self._onEndCtx, null, []);//数组长度为0，直接结束
                } else {
                    for (var i = 0; i < self._limit; i++) {
                        self._handleItem();
                    }
                }
            };

            if (engine._isMainLooping) {
                hh.nextTick(onFlow);
            } else {
                //实在没有就用自带的（浏览器环境下才会进）
                _thisGlobal.setTimeout(function () {
                    onFlow();
                }, 1);
            }
        }

    }

    /**
     * 储藏室
     */
    export class Store {
        pool:any = {};
        tempPool:any = {};
        pool4Single:any = {};
        tempArgsMap:any = {};
        valuePool:any = {};

        register(owner:string, type:string, listener:Function, ctx:any, priority:number) {
            var pool = this.pool;
            var map = pool[owner];
            if (!map) {
                pool[owner] = map = {};
            }
            var arr = map[type];
            if (!arr) {
                arr = map[type] = [];
            }
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var obj = arr[i];
                if (!obj) continue;
                if (obj.listener == listener && obj.ctx == ctx) return;//避免重复注册
            }
            var info = {listener: listener, ctx: ctx, priority: priority};
            if (priority == null) {
                arr.push(info);
            } else {
                var index = 0;
                for (var i = 0, l_i = arr.length; i < l_i; i++) {
                    var obj = arr[i];
                    if (obj.priority == null || obj.priority <= priority) {//往后追加
                        index = i + 1;
                    } else if (obj.priority > priority) {
                        index = i;
                        break;
                    }
                }
                arr.splice(index, 0, info);
            }
        }

        unRegister(owner:string, type:string, listener:Function, ctx:any) {
            var pool = this.pool;
            var map = pool[owner];
            if (!map) return;
            var arr = map[type];
            if (!arr) return;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var obj = arr[i];
                if (obj.listener == listener && obj.ctx == ctx) {
                    arr.splice(i, 1);
                    return;
                }
            }
        }

        clear(owner:string, type:string) {
            var pool = this.pool;
            var map = pool[owner];
            if (!map) return;
            var arr = map[type];
            if (!arr) return;
            arr.length = 0;
        }

        registerSingle(owner:string, type:string, listener:Function, ctx:any) {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) {
                map = pool4Single[owner] = {};
            }
            map[type] = {listener: listener, ctx: ctx};
        }

        unRegisterSingle(owner:string, type:string) {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) return;
            delete map[type];
        }

        unRegisterAll(owner:string, type?:string) {
            var pool = this.pool, pool4Single = this.pool4Single;
            var map = pool[owner], map4Single = pool4Single[owner];
            if (arguments.length == 1) {//删除所有
                if (map) {
                    for (var key in map) {
                        delete map[key];
                    }
                }
                if (map4Single) {
                    for (var key in map4Single) {
                        delete map4Single[key];
                    }
                }
            } else {//删除指定的type。
                if (map) {
                    var arr = map[type];
                    if (arr) arr.length = 0;
                }
                if (map4Single) {
                    delete map4Single[type];
                }
            }
        }

        getTempArr(owner:string, type:string) {
            var pool = this.pool, tempPool = this.tempPool;
            var map = pool[owner];
            if (!map) return null;
            var arr = map[type];
            if (!arr) return null;

            var tempMap = tempPool[owner];
            if (!tempMap) {
                tempMap = tempPool[owner] = {};
            }
            var tempArr = tempMap[type];
            if (!tempArr) {
                tempArr = tempMap[type] = [];
            }
            tempArr.length = 0;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                tempArr.push(arr[i]);
            }
            return tempArr;
        }

        getSingle(owner:string, type:string):any {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) return null;
            return map[type];
        }

        getTempArgs(owner:string, type:string, args):any[] {
            var tempArgsMap = this.tempArgsMap;
            var map = tempArgsMap[owner];
            if (!map) {
                map = tempArgsMap[owner] = {};
            }
            var arr = map[type];
            if (!arr) {
                arr = map[type] = [];
            }
            if (arr.length > 0) {//如果长度大于0，证明还在使用该temp数组。这时候就重新new一个进行返回
                arr = [];
            }
            for (var i = 0, l_i = args.length; i < l_i; i++) {
                arr.push(args[i]);
            }
            return arr;
        }

        setValue(owner:string, type:string, args:any) {
            var valuePool = this.valuePool;
            var map = valuePool[owner];
            if (!map) {
                map = valuePool[owner] = {};
            }
            map[type] = args;
        }

        removeValue(owner:string, type:string):any {
            var valuePool = this.valuePool;
            var map = valuePool[owner];
            if (!map) return null;
            return map[type];
        }
    }

    var _OWNER_ON:string = 'on';
    var _OWNER_ON_NT:string = 'onNextTick';
    var _OWNER_ONCE:string = 'once';
    var _OWNER_ONCE_NT:string = 'onceNextTick';
    var _OWNER_ON_ASYNC:string = 'onAsync';
    var _OWNER_ONCE_ASYNC:string = 'onceAsync';

    var _emittersNextTick:Emitter[] = [];
    var _tempEmittersNextTick:Emitter[] = [];
    var _tempEmitters:Emitter[] = [];
    var _tempEventArr:any = [];
    var _tempArgsArr:any = [];
    export class Emitter {
        /** 类名 */
        public static __className:string = 'Emitter';

        static __recycler:any[] = [];
        static push(obj:any){
            this.__recycler.push(obj);
        }
        static pop(...args):any{
            var clazz = this;
            var obj = clazz.__recycler.pop();
            if(obj) return obj;
            else return clazz.create.apply(clazz, args);
        }

        /** 创建 */
        static create(...args:any[]):any {
            var Class:any = this;
            var obj:any = new Class();
            if (obj.init) obj.init.apply(obj, arguments);
            return obj;
        }

        /** 获取单例 */
        static getInstance(...args:any[]) {
            var Class:any = this;
            if (!Class._instance) {
                var instance:any = Class._instance = Class.create.apply(Class, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        }

        /** 释放单例 */
        static release() {
            var Class:any = this;
            var instance:any = Class._instance;
            if (instance) {
                if (instance.doDtor) instance.doDtor();
                Class._instance = null;
            }
        }

        /** 类名 */
        __className:string;
        /** 实例对应的类 */
        __class:any;
        /** 是否是单例 */
        _isInstance:boolean;
        /** 储藏室 */
        _store:Store;
        /** 是否已经释放了 */
        _hasDtored:boolean;

        _initProp():void {
            var self = this;
            self._store = new Store();
        }

        constructor() {
            var self = this;
            var clazz:any = self.__class = this['constructor'];
            self.__className = clazz.__className;
            self._initProp();
        }

        public init(...args:any[]) {
        }

        public dtor() {
            var self = this;
            if (self._hasDtored) return;
            self._hasDtored = true;
            self._dtor();
        }

        _dtor() {
        }

        //______________以上由于考虑到性能问题，故意重新写了一遍，减少继承____________

        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        on(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON, event, listener, ctx, priority);
            return self;
        }

        /**
         * 监听某个事件。可以注册多个。通过emit触发。（异步模式，listener的第一个传参为异步需要执行的cb）
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON_ASYNC, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。（异步模式，listener的第一个传参为异步需要执行的cb）
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON_ASYNC, event, listener, ctx, priority);
            return self;
        }

        /**
         * 监听某个事件，在下一帧执行。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON_NT, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onPriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ON_NT, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        once(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        oncePriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onceAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE_ASYNC, event, listener, ctx, null);
            return self;
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onceAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE_ASYNC, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        onceNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE_NT, event, listener, ctx, null);
            return self;
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        oncePriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.register(_OWNER_ONCE, event, listener, ctx, priority);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        single(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.registerSingle(_OWNER_ON, event, listener, ctx);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        singleAsync(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.registerSingle(_OWNER_ON_ASYNC, event, listener, ctx);
            return self;
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        singleNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.registerSingle(_OWNER_ON_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        un(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.unRegister(_OWNER_ON, event, listener, ctx);
            return self;
        }

        /**
         * 移除下一帧类型的事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        unNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.unRegister(_OWNER_ON_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除一次性的事件监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        unOnce(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.unRegister(_OWNER_ONCE, event, listener, ctx);
            return self;
        }

        /**
         * 移除下一帧执行的一次性的监听。
         * @param event
         * @param listener
         * @param ctx
         * @returns {mo_evt.Emitter}
         */
        unOnceNextTick(event:string, listener:Function, ctx?:any):Emitter {
            var self = this;
            self._store.unRegister(_OWNER_ONCE_NT, event, listener, ctx);
            return self;
        }

        /**
         * 移除单个类型的事件监听。
         * @param event
         * @returns {mo_evt.Emitter}
         */
        unSingle(event:string):Emitter {
            var self = this;
            self._store.unRegisterSingle(_OWNER_ON, event);
            return self;
        }

        /**
         * 移除单个类型的并且是下一帧执行类型的事件监听。
         * @param event
         * @returns {mo_evt.Emitter}
         */
        unSingleNextTick(event:string):Emitter {
            var self = this;
            self._store.unRegisterSingle(_OWNER_ON_NT, event);
            return self;
        }

        /**
         * 移除所有立即执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         * @returns {mo_evt.Emitter}
         */
        unAll(event?:string):Emitter {
            var self = this;
            var l = arguments.length;
            var arr = [
                _OWNER_ON,
                _OWNER_ONCE
            ];
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var owner = arr[i];
                if (l == 0) {
                    self._store.unRegisterAll(owner);
                } else {
                    self._store.unRegisterAll(owner, event);
                }
            }
            return self;
        }

        /**
         * 移除所有下一帧执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         * @returns {mo_evt.Emitter}
         */
        unAllNextTick(event?:string):Emitter {
            var self = this;
            var arr = [
                _OWNER_ON_NT,
                _OWNER_ONCE_NT
            ];
            var l = arguments.length;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var owner = arr[i];
                if (l == 0) {
                    self._store.unRegisterAll(owner);
                } else {
                    self._store.unRegisterAll(owner, event);
                }
            }
            return self;
        }

        _emitByListenerInfoArr(owner:string, event:string, arr, args:any[]) {
            if (arr) {
                var self = this;
                arr = arr instanceof Array ? arr : [arr];
                if (arr.length == 0) return;
                var args = self._store.getTempArgs(owner, event, args);
                args.push(event);//事件类型放在倒数第二位置
                args.push(self);//发送者放在最后一个位置
                for (var i = 0, l_i = arr.length; i < l_i; i++) {
                    var info = arr[i];
                    var listener = info.listener;
                    if (listener) {
                        listener.apply(info.ctx, args);
                    }
                }
                arr.length = 0;//清空引用
                args.length = 0;//清空参数
            }
        }

        /**
         * 立即发射事件。
         * @param event
         * @param args
         * @returns {mo_evt.Emitter}
         */
        emit(event:string, ...args):Emitter {
            var self = this, store = self._store, single, tempArr;
            //实例级别的注册
            //先执行单个的
            single = store.getSingle(_OWNER_ON, event);
            self._emitByListenerInfoArr(_OWNER_ON, event, single, args);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE, event);
            store.clear(_OWNER_ONCE, event);//进行清除
            self._emitByListenerInfoArr(_OWNER_ONCE, event, tempArr, args);
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON, event);
            self._emitByListenerInfoArr(_OWNER_ON, event, tempArr, args);

            //类级别的注册
            store = self.__class._store;
            //先执行单个的
            single = store.getSingle(_OWNER_ON, event);
            self._emitByListenerInfoArr(_OWNER_ON, event, single, args);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE, event);
            store.clear(_OWNER_ONCE, event);//进行清除
            self._emitByListenerInfoArr(_OWNER_ONCE, event, tempArr, args);
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON, event);
            self._emitByListenerInfoArr(_OWNER_ON, event, tempArr, args);

            return self;
        }

        /**
         * 立即发射事件。
         * @param event
         * @param args
         * @returns {mo_evt.Emitter}
         */
        emitAsync(event:string, onEnd:Function, ctx:any, ...args):Emitter {
            var self = this, store = self._store, single, tempArr;
            var arr = [];

            //实例级别的注册
            //先执行单个的
            single = store.getSingle(_OWNER_ON_ASYNC, event);
            if (single) arr.push(arr);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }
            store.clear(_OWNER_ONCE_ASYNC, event);//进行清除
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }

            //类级别的注册
            store = self.__class._store;
            //先执行单个的
            single = store.getSingle(_OWNER_ON_ASYNC, event);
            if (single) arr.push(arr);
            //再执行一次性的
            tempArr = store.getTempArr(_OWNER_ONCE_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }
            store.clear(_OWNER_ONCE_ASYNC, event);//进行清除
            //最后执行多次的
            tempArr = store.getTempArr(_OWNER_ON_ASYNC, event);
            if (tempArr) {
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    arr.push(tempArr[i]);
                }
            }

            var tempArgs:any[] = [null].concat(args);
            tempArgs.push(event);
            tempArgs.push(self);
            var asyncPool = new hh.AsyncPool(arr, 0, function (info, index, cb1) {
                tempArgs[0] = cb1;
                info.listener.apply(info.ctx, tempArgs);
            }, onEnd, ctx);
            asyncPool.flow();

            return self;
        }

        /**
         * 在下一帧才发射事件。而且，发射的事件只会发射最后调用emitNextTick的那次。
         * @param event
         * @param args
         * @returns {mo_evt.Emitter}
         */
        emitNextTick(event:string, ...args):Emitter {
            var self = this;
            self._store.setValue(_OWNER_ON_NT, event, args);
            if (_emittersNextTick.indexOf(self) < 0) _emittersNextTick.push(self);
            return self;
        }

        /**
         * 发射阶段性事件。before and after。
         * @param event
         * @param func
         * @param ctx
         * @param args
         * @returns {mo_evt.Emitter}
         */
        emitPhase(event:string, func:Function, ctx:any, ...args):Emitter {
            var self = this;
            return self;
        }

        /**
         * 在下一帧才发射阶段性事件。before and after。
         * 而且，发射的事件只会发射最后调用emitPhaseNextTick的那次。
         * @param event
         * @param func
         * @param ctx
         * @param args
         * @returns {mo_evt.Emitter}
         */
        emitPhaseNextTick(event:string, func:Function, ctx:any, ...args):Emitter {
            var self = this;
            return self;
        }


        //++++++++++++++++++++++++++++++静态方法 开始+++++++++++++++++++++++++++++++++

        static _store:Store = new Store();


        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static on(event:string, listener:Function, ctx?:any):any {
            return this.prototype.on.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onPriority.apply(this, arguments);
        }

        /**
         * 监听某个事件。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onAsync.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onAsyncPriority.apply(this, arguments);
        }

        /**
         * 监听某个事件，在下一帧执行。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onNextTick.apply(this, arguments);
        }

        /**
         * 通过优先级进行事件监听注册。通过emitNextTick触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static onPriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onPriorityNextTick.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static once(event:string, listener:Function, ctx?:any):any {
            return this.prototype.once.apply(this, arguments);
        }

        /**
         * 通过优先级进行一次性事件监听注册。通过emit触发。
         * @param event
         * @param priority
         * @param listener
         * @param ctx
         */
        static oncePriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.oncePriority.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onceAsync.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceAsyncPriority(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.onceAsyncPriority.apply(this, arguments);
        }

        /**
         * 注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static onceNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.onceNextTick.apply(this, arguments);
        }

        /**
         * 通过优先级注册一次性监听，触发了就移除。可以注册多个。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static oncePriorityNextTick(event:string, priority:number, listener:Function, ctx?:any):any {
            return this.prototype.oncePriorityNextTick.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static single(event:string, listener:Function, ctx?:any):any {
            return this.prototype.single.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emit触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static singleAsync(event:string, listener:Function, ctx?:any):any {
            return this.prototype.singleAsync.apply(this, arguments);
        }

        /**
         * 注册单个监听，每次都被最新注册的替换。通过emitNextTick触发。
         * @param event
         * @param listener
         * @param ctx
         */
        static singleNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.singleNextTick.apply(this, arguments);
        }

        /**
         * 移除事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static un(event:string, listener:Function, ctx?:any):any {
            return this.prototype.un.apply(this, arguments);
        }

        /**
         * 移除下一帧类型的事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unNextTick.apply(this, arguments);
        }

        /**
         * 移除一次性的事件监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unOnce(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unOnce.apply(this, arguments);
        }

        /**
         * 移除下一帧执行的一次性的监听。
         * @param event
         * @param listener
         * @param ctx
         */
        static unOnceNextTick(event:string, listener:Function, ctx?:any):any {
            return this.prototype.unOnceNextTick.apply(this, arguments);
        }

        /**
         * 移除单个类型的事件监听。
         * @param event
         */
        static unSingle(event:string):any {
            return this.prototype.unSingle.apply(this, arguments);
        }

        /**
         * 移除单个类型的并且是下一帧执行类型的事件监听。
         * @param event
         */
        static unSingleNextTick(event:string):any {
            return this.prototype.unSingleNextTick.apply(this, arguments);
        }

        /**
         * 移除所有立即执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         */
        static unAll(event?:string):any {
            return this.prototype.unAll.apply(this, arguments);
        }

        /**
         * 移除所有下一帧执行类型的事件监听。
         * 如果arguments.length == 0 那么就表示移除所有监听。
         * 如果arguments.length == 1 那么就表示移除指定类型的所有监听。
         * @param event
         */
        static unAllNextTick(event?:string):any {
            return this.prototype.unAllNextTick.apply(this, arguments);
        }

        /**
         * 格式化出before类型的event值。
         * @param event
         * @returns {string}
         */
        static formatBeforeEvent(event:string):string {
            return event + '.before';
        }

        /**
         * 格式化出after类型的event值。
         * @param event
         * @returns {string}
         */
        static formatAfterEvent(event:string):string {
            return event + '.after';
        }
    }


    // 为下一帧事件进行分发
    var _emit4NextTick = function () {
        _tempEmittersNextTick.length = 0;
        if (_emittersNextTick.length > 0) {
            //进行模板获取
            for (var i = 0, l_i = _emittersNextTick.length; i < l_i; i++) {
                var emitter = _emittersNextTick[i];
                var store = emitter._store;
                var valuePool = store.valuePool;
                var map = valuePool[_OWNER_ON_NT];
                for (var event in map) {
                    _tempEmitters.push(emitter);
                    _tempEventArr.push(event);
                    _tempArgsArr.push(map[event]);
                    delete map[event];//当前帧已经可以清除了
                }

            }
            _emittersNextTick.length = 0;
            for (var i = 0, l_i = _tempEmitters.length; i < l_i; i++) {
                var emitter = _tempEmitters[i];
                var event = _tempEventArr[i];
                var args = _tempArgsArr[i];

                var single, tempArr;
                //先执行单个的
                single = store.getSingle(_OWNER_ON_NT, event);
                emitter._emitByListenerInfoArr(_OWNER_ON_NT, event, single, args);
                //再执行一次性的
                tempArr = store.getTempArr(_OWNER_ONCE_NT, event);
                store.clear(_OWNER_ONCE_NT, event);//进行清除
                emitter._emitByListenerInfoArr(_OWNER_ONCE_NT, event, tempArr, args);
                //最后执行多次的
                tempArr = store.getTempArr(_OWNER_ON_NT, event);
                emitter._emitByListenerInfoArr(_OWNER_ON_NT, event, tempArr, args);

                //类级别的注册
                store = emitter.__class._store;
                //先执行单个的
                single = store.getSingle(_OWNER_ON_NT, event);
                emitter._emitByListenerInfoArr(_OWNER_ON_NT, event, single, args);
                //再执行一次性的
                tempArr = store.getTempArr(_OWNER_ONCE_NT, event);
                store.clear(_OWNER_ONCE_NT, event);//进行清除
                emitter._emitByListenerInfoArr(_OWNER_ONCE_NT, event, tempArr, args);
                //最后执行多次的
                tempArr = store.getTempArr(_OWNER_ON_NT, event);
                emitter._emitByListenerInfoArr(_OWNER_ON_NT, event, tempArr, args);
            }
            _tempEmitters.length = 0;
            _tempEventArr.length = 0;
            _tempArgsArr.length = 0;
        }
    };

    export class Engine extends Emitter {
        /** 循环事件，外部不要轻易使用，而是通过tt.tick进行注册 */
        static __TICK:string = '__tick';
        /** 下一帧执行事件，外部不要轻易使用，而是通过tt.nextTick进行注册 */
        static __NEXT_TICK:string = '__nextTick';
        /** 计算裁剪相关 */
        static __CAL_CLIP:string = '__calClip';
        /** 区域擦除事件，外部不要轻易使用 */
        static __CLEAR_RECT:string = '__clearRect';
        /** 绘制之后的循环，外部不要轻易使用，而是通过tt.nextTick进行注册 */
        static __TICK_AFTER_DRAW:string = '__tickAfterDraw';
        /** 处理点击事件 */
        static __HANDLE_TOUCH:string = '_handleTouch';
        /** 绘制帧率 */
        static __DRAW_FPS:string = '__drawFPS';
        /** 初始化引擎，外部不要轻易使用 */
        static __INIT_CTX:string = '__initCtx';

        /** 配置文件初始化后监听 */
        static AFTER_CFG:string = 'afterCfg';
        /** 引擎初始化后监听 */
        static AFTER_CTX:string = 'afterCtx';
        /** 启动后监听 */
        static AFTER_BOOT:string = 'afterBoot';

        /** 开始时间戳 */
        _startTime:number;
        /** 上一次时间戳 */
        _time:number;
        /** requestAnimationFrameId */
        _reqAniFrameId:number;
        /** 主循环是否已经执行 */
        _isMainLooping:boolean;
        /** canvas对象 */
        _canvas:any;
        /** canvas对应的context，注意这个不一定是最终的renderContext，因为引擎中还可能会根据具体需求定义renderContext */
        canvasCtx:IRenderingContext2D;
        /** 判断引擎是否已经初始化完毕 */
        isCtxInited:boolean;

        /** 矩阵计算队列 */
        _matrixQueue:any[];
        /** 裁剪计算队列 */
        _clipQueue:any[];
        /** 渲染命令队列 */
        _renderQueue:any[];

        /** 舞台，由具体实现传递 */
        stage:any;
        design:any;

        __fpsInfo:any;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._matrixQueue = [];
            self._clipQueue = [];
            self._renderQueue = [];
            self.design = {width:0, height:0};
            self.__fpsInfo = {
                // 次数
                count : 0,
                frameTime : 0,
                fps : 60,
                draw : 0,
                drawCount : 0,

                transCostCount : 0,
                matrixCostCount : 0,
                clipCostCount : 0,
                renderCostCount : 0,
                touchCostCount : 0,

                transCost : 0,
                matrixCost : 0,
                clipCost : 0,
                renderCost : 0,
                touchCost : 0
            };
        }

        //执行主循环
        run(){
            var self = this, clazz = self.__class;
            //设置开始时间
            self._startTime = Date.now();
            self._time = 0;
            self._isMainLooping = false;
            var _mainLoop = function () {
                var fpsInfo = self.__fpsInfo;
                // nextTick相关事件的分发
                if(self._isMainLooping) _emit4NextTick();
                self._isMainLooping = true;
                var curTime = Date.now() - self._startTime;
                var deltaTime = curTime - self._time;
                // 主循环tick传时间差
                self.emit(clazz.__TICK, deltaTime);
                // 如果舞台已经初始化好了，就可以开始进行转化了
                var d1 = Date.now();
                if(self.stage) self.stage._trans(self);
                var d2 = Date.now();

                var matrixQueue = self._matrixQueue;
                while(matrixQueue.length > 0){
                    var calFunc = matrixQueue.shift();//命令方法
                    var calFuncCtx = matrixQueue.shift();//命令上下文
                    calFunc.call(calFuncCtx, engine);
                }
                var d3 = Date.now();

                self.emit(clazz.__CAL_CLIP, self._clipQueue);
                var d4 = Date.now();

                // 进行上下文绘制区域擦除
                var ctx = self.canvasCtx;
                if(ctx){
                    self.emit(clazz.__CLEAR_RECT, ctx);
                    // 进行主渲染
                    var queue = self._renderQueue;
                    while(queue.length > 0){
                        var cmd = queue.shift();//命令方法
                        var cmdCtx = queue.shift();//命令上下文
                        if(cmd) cmd.call(cmdCtx, ctx, self);
                    }
                    // 主循环tick传时间差
                    self.emit(clazz.__TICK_AFTER_DRAW, deltaTime);
                }
                var d5 = Date.now();
                // 点击处理放在绘制完之后，这样可以使得坐标转换使用_trans之后获得的矩阵，可以提高性能
                self.emit(clazz.__HANDLE_TOUCH, deltaTime);
                var d6 = Date.now();
                // 进行下一帧分发
                self.emitNextTick(clazz.__NEXT_TICK);


                if(ctx){
                    fpsInfo.count++;
                    fpsInfo.frameTime += deltaTime;
                    fpsInfo.transCostCount += d2 - d1;
                    fpsInfo.matrixCostCount += d3 - d2;
                    fpsInfo.clipCostCount += d4 - d3;
                    fpsInfo.renderCostCount += d5 - d4;
                    fpsInfo.touchCostCount += d6 - d5;
                    var count = fpsInfo.count;
                    if(count == 60){
                        fpsInfo.fps = Math.round(count*1000/fpsInfo.frameTime);
                        fpsInfo.draw = Math.round(fpsInfo.drawCount/count);
                        fpsInfo.transCost = Math.round(fpsInfo.transCostCount/count);
                        fpsInfo.matrixCost = Math.round(fpsInfo.matrixCostCount/count);
                        fpsInfo.clipCost = Math.round(fpsInfo.clipCostCount/count);
                        fpsInfo.renderCost = Math.round(fpsInfo.renderCostCount/count);
                        fpsInfo.touchCost = Math.round(fpsInfo.touchCostCount/count);

                        fpsInfo.count = 0;
                        fpsInfo.frameTime = 0;
                        fpsInfo.drawCount = 0;
                        fpsInfo.transCostCount = 0;
                        fpsInfo.matrixCostCount = 0;
                        fpsInfo.clipCostCount = 0;
                        fpsInfo.renderCostCount = 0;
                        fpsInfo.touchCostCount = 0;
                    }
                    self.emit(clazz.__DRAW_FPS, ctx, fpsInfo);
                }

                self._reqAniFrameId = requestAnimationFrame(_mainLoop);
                self._time = curTime;
            };
            _mainLoop();
        }

        /**
         * 初始化canvas
         * @private
         */
        _initCanvas(){
            var self = this;
            var canvasId = project.canvas;
            var canvas:any = self._canvas = canvasId ? document.getElementById(canvasId) : document.getElementsByTagName('canvas')[0];
            var design = self.design;
            var w = design.width = project.design.width;
            var h = design.height = project.design.height;
            if(!canvas) throw '请添加canvas元素！';
            canvas.width = w;
            canvas.height = h;
            self.canvasCtx = canvas.getContext('2d');
        }
    }
    // 引擎主循环tick的触发器，内部使用
    export var engine:Engine = new Engine();

    export function tick(listener:Function, ctx?:any) {
        engine.on(Engine.__TICK, listener, ctx);
    }

    export function unTick(listener:Function, ctx?:any) {
        engine.un(Engine.__TICK, listener, ctx);
    }

    export function nextTick(listener:Function, ctx?:any) {
        engine.onceNextTick(Engine.__NEXT_TICK, listener, ctx);
    }

    export function unNextTick(listener:Function, ctx?:any) {
        engine.unOnceNextTick(Engine.__NEXT_TICK, listener, ctx);
    }


    // js加载完之后处理
    var _onAfterJs = function(cb){
        // 启动主循环，但事实上，绘制的主循环还没被注册进去
        engine.run();
        // 加载完js之后，首先先加载配置文件，这样才能保证引擎相关初始化能够直接通过配置文件读取
        project.load(function(){
            if(!(<any>hh).isNative){//如果是h5版本，则进行title的设置
                var titleEle = document.getElementsByTagName('title')[0];
                if(titleEle){
                    titleEle.innerHTML = hh.project.appName;
                }else{
                    titleEle = document.createElement('title');
                    titleEle.innerHTML = hh.project.appName;
                    document.getElementsByTagName('head')[0].appendChild(titleEle);
                }
            }

            // 进行日志初始化
            logger.initByConfig(project);

            // 分发配置文件加载后监听
            engine.emit(Engine.AFTER_CFG);
            // 分发异步方式的配置文件加载后监听
            engine.emitAsync(Engine.AFTER_CFG, function(){
                //初始化canvas相关
                engine._initCanvas();
                // 分发引擎初始化监听，此时进行引擎的初始化操作
                engine.emit(Engine.__INIT_CTX);
                // 分发引擎初始化后监听
                engine.emit(Engine.AFTER_CTX);
                // 分发异步方式的引擎初始化后监听
                engine.emitAsync(Engine.AFTER_CTX, function(){
                    // 分发启动后监听
                    engine.emit(Engine.AFTER_BOOT);
                    // 分发异步方式的启动后监听
                    engine.emitAsync(Engine.AFTER_BOOT, function(){
                        if(cb) cb();
                    }, null);
                }, null);
            }, null);
        });
    };

    export function boot(modules:string[], cb?:Function){
        if((<any>hh).MainContext){// TODO 这时候证明是打包模式
            _onAfterJs(cb);
        }else{
            var asyncPool = new AsyncPool(modules, 0, function(item, index, cb1){
                hh.net.loadJson(item + '/__module.json', cb1);
            }, cb);
            asyncPool.onEnd(function(err, moduleJsons){
                var list = [];
                for (var i = 0, l_i = modules.length; i < l_i; i++) {
                    var moduleDir = modules[i];
                    var moduleInfo = moduleJsons[i];
                    var source = moduleInfo['source'] || '';

                    if(moduleDir != '' && moduleDir.substring(moduleDir.length - 1) != '/') moduleDir += '/';
                    if(source != '' && source.substring(source.length - 1) != '/') source += '/';
                    var file_list = moduleInfo['file_list'];
                    for (var j = 0, l_j = file_list.length; j < l_j; j++) {
                        list.push(moduleDir + source + file_list[j]);
                    }
                }
                hh.net.loadJs(list, function(){
                    //接下来加载配置文件
                    logger.log('js文件加载成功！');
                    _onAfterJs(cb);
                });
            }, null);
            asyncPool.flow();
        }
    }
}