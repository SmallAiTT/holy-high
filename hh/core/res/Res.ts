/**
 * Created by SmallAiTT on 2015/6/30.
 */
module hh.R{
    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    LOG.initLogger(hh.R, 'R');

    export class CfgItem extends Emitter{
        static SUCCESS:string = "success";
        static ERROR:string = "error";
        static FINISH:string = "finish";

        url:string;
        type:string;

        cb:Function;
        ctx:any;

        // @override
        init(url?:string){
            super.init();
            this.setUrl(url);
        }

        setUrl(url:string):CfgItem{
            var self = this;
            self.url = url;
            if(url){
                var extname = hh.PATH.extname(url);
                if(extname){
                    self.type = extname.substring(1).toLowerCase();
                }
            }else{
                self.type = null;
            }
            return self;
        }

        _send(err, resData:any){
            var self = this, clazz = self.__c;
            // 从队列移除
            var queue = _queue;
            for (var i = 0, l_i = queue.length; i < l_i; i++) {
                var rci = queue[i];
                if(rci == self){
                    queue.splice(i, 1);
                    break;
                }
            }
            if(!err) {// 成功了就进行数据保存
                _pool[self.url] = resData;
            }
            self.emit(clazz.FINISH, err, resData);
            // 进行回收
            self.unAll();
            self.url = null;
            self.type = null;
            self.cb = null;
            self.ctx = null;
        }

    }
    export class Parser extends Emitter{
        _map:any;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._map = {};
        }
        load(rci:CfgItem){
            var self = this;
            self._load(rci);
        }

        _getRealUrl(rci:CfgItem){
            var url = rci.url;
            if(url.indexOf("http:") == 0 || url.indexOf("https:") == 0) return url;
            return hh.PATH.join(R.root, url);// 主意，这里必须是要加`R.`才可以，避免使用了内部对象导致的bug
        }

        _load(rci:CfgItem){
            // 子类在此实现具体加载
        }

        _onFinish(err, resData:any, rci:CfgItem){
            var self = this, map = self._map;
            // 获取当前资源对应的rci
            // 移除
            if(err) {// 如果出错了就进行出错处理
                self._handleError(err, resData, rci);
            }else{// 成功了就进行发送
                rci._send(null, self._parse(resData, rci));
            }
        }

        _handleError(err, resData:any, rci:CfgItem){
            if(err) {
                // 子类决定如果错误了要怎么处理
                // 这里这么处理：如果错误了就直接返回
                error(err);
                rci._send(null, null);
            }
        }

        _parse(resData:any, rci:CfgItem):any{
            // 子类实现具体的解析规则
            return resData;
        }
    }

    /** 资源跟目录 */
    export var root:string = '';
    export var _pool4Parser:any = {};
    export var _pool:any = {};
    export var _pool4JsData:any = {};
    export var _queue:CfgItem[] = [];
    export var _pool4CfgItem:Pool = new Pool();
    _pool4CfgItem.register(function(key:string){
        return new CfgItem();
    }, null, null);
    _pool4CfgItem.setLimit(CfgItem.__n, -1);

    var _pushToQueue = function(urlOrRci:any, listener:Function, ctx?:any){
        var url = urlOrRci.url || urlOrRci;
        var type = urlOrRci.type;
        var queue = _queue;
        var RCI = CfgItem;
        var rci:CfgItem;
        for (var i = 0, l_i = queue.length; i < l_i; i++) {
            rci = queue[i];
            if(rci.url == url){
                return rci.once(RCI.FINISH, listener, ctx);
            }
        }

        // 没有的话就从回收池中获取一个
        rci = _pool4CfgItem.get(RCI.__n);
        rci.setUrl(url);
        if(type) rci.type = type;
        rci.once(RCI.FINISH, listener, ctx);
        queue.push(rci);

        _loadRci(rci);
    };

    var _loadRci = function(rci:CfgItem){
        var parser = getParser(rci.type);
        parser.load(rci);
    };
    export function getParser(type:string):Parser{
        return _pool4Parser[type];
    }
    export function load(urls:any, cb:Function, ctx?:any){
        urls = urls instanceof Array ? urls : [urls];
        var phase = {
            isError:false,
            isCbCalled:false,
            results:[],
            length:urls.length,
            cb:cb,
            ctx:ctx
        };
        var handlePhase = function(err, resData:any){
            // 已经失败了或者已经执行回调了就不操作
            if(phase.isError || phase.isCbCalled) return;
            if(err) {
                // 如果失败，就直接返回失败
                phase.isError = true;
                phase.isCbCalled = true;
                // 下一帧执行
                hh.nextTick(function(){
                    phase.cb.call(phase.ctx, err);
                });
            }
            else {
                // 长度缩减
                phase.length--;
                if(phase.length == 0){// 都已经加载完了，就执行回调
                    phase.isCbCalled = true;
                    // 下一帧执行
                    hh.nextTick(function(){
                        phase.cb.call(phase.ctx);
                    });
                }
            }
        };
        for (var i = 0, l_i = urls.length; i < l_i; i++) {
            var urlOrRci = urls[i];

            var resData = get(urlOrRci.url || urlOrRci);
            if(resData) {
                // 如果已经加载了，那么就直接执行回调
                handlePhase(null, resData);
                continue;
            }

            _pushToQueue(urlOrRci, function(err, resData:any){
                handlePhase(err, resData);
            }, phase);
        }
    }
    export function get(url):any{
        var jsData = _pool4JsData[url];
        if(jsData != null) return jsData;
        var data = _pool[url];
        if(data != null) return data;
        return null;
    }
    export function registerParser(ParserClass, ...types:string[]){
        var parser = new ParserClass;
        var pool4Parser = _pool4Parser;
        for (var i = 0, l_i = types.length; i < l_i; i++) {
            pool4Parser[types[i]] = parser;
        }
    }
}
