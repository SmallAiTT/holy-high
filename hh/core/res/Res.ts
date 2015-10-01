/**
 * Created by SmallAiTT on 2015/6/30.
 */
module hh{
    export class ResCfgItem extends Emitter{
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

        setUrl(url:string):ResCfgItem{
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
            var queue = res._queue;
            for (var i = 0, l_i = queue.length; i < l_i; i++) {
                var rci = queue[i];
                if(rci == self){
                    queue.splice(i, 1);
                    break;
                }
            }
            if(!err) {// 成功了就进行数据保存
                res._pool[self.url] = resData;
            }
            self.emit(clazz.FINISH, err, resData);
            // 进行回收
            self.unAll();
            self.url = null;
            self.type = null;
            self.cb = null;
            self.ctx = null;
            clazz.push(self);
        }

    }
    export class ResParser extends Emitter{
        _map:any;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._map = {};
        }
        load(rci:ResCfgItem){
            var self = this;
            self._load(rci);
        }

        _getRealUrl(rci:ResCfgItem){
            var url = rci.url;
            if(url.indexOf("http:") == 0 || url.indexOf("https:") == 0) return url;
            return hh.PATH.join(res.root, url);
        }

        _load(rci:ResCfgItem){
            // 子类在此实现具体加载
        }

        _onFinish(err, resData:any, rci:ResCfgItem){
            var self = this, map = self._map;
            // 获取当前资源对应的rci
            // 移除
            if(err) {// 如果出错了就进行出错处理
                self._handleError(err, resData, rci);
            }else{// 成功了就进行发送
                rci._send(null, self._parse(resData, rci));
            }
        }

        _handleError(err, resData:any, rci:ResCfgItem){
            if(err) {
                // 子类决定如果错误了要怎么处理
                // 这里这么处理：如果错误了就直接返回
                logger.error(err);
                rci._send(null, null);
            }
        }

        _parse(resData:any, rci:ResCfgItem):any{
            // 子类实现具体的解析规则
            return resData;
        }
    }
    export class Res extends Emitter{
        _pool4Parser:any;
        _pool:any;
        _pool4JsData:any;
        _queue:ResCfgItem[];

        /** 资源跟目录 */
        root:string;

        //@override
        _initProp():void{
            super._initProp();
            var self = this;
            self._pool4Parser = {};
            self._pool = {};
            self._pool4JsData = {};
            self._queue = [];
            self.root = 'res';
        }

        _pushToQueue(urlOrRci:any, listener:Function, ctx?:any){
            var self = this;
            var url = urlOrRci.url || urlOrRci;
            var type = urlOrRci.type;
            var queue = self._queue;
            var RCI = ResCfgItem;
            var rci:ResCfgItem;
            for (var i = 0, l_i = queue.length; i < l_i; i++) {
                rci = queue[i];
                if(rci.url == url){
                    return rci.once(RCI.FINISH, listener, ctx);
                }
            }

            // 没有的话就从回收池中获取一个
            rci = RCI.pop();
            rci.setUrl(url);
            if(type) rci.type = type;
            rci.once(RCI.FINISH, listener, ctx);
            queue.push(rci);

            self._loadRci(rci);
        }

        _loadRci(rci:ResCfgItem){
            var parser = this.getParser(rci.type);
            parser.load(rci);
        }

        /**
         * 加载资源。
         * @param urls 数组或者单项
         * @param cb
         * @param ctx
         * @returns {hh.Res}
         */
        load(urls:any, cb:Function, ctx?:any):Res{
            var self = this;
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

                var resData = self.get(urlOrRci.url || urlOrRci);
                if(resData) {
                    // 如果已经加载了，那么就直接执行回调
                    handlePhase(null, resData);
                    continue;
                }

                self._pushToQueue(urlOrRci, function(err, resData:any){
                    handlePhase(err, resData);
                }, phase);
            }
            return self;
        }

        /**
         * 根据url获取资源数据。
         * @param url
         * @returns {*}
         */
        get(url):any{
            var self = this, pool4JsData = self._pool4JsData;
            var jsData = pool4JsData[url];
            if(jsData != null) return jsData;

            var pool = self._pool;
            var data = pool[url];
            if(data != null) return data;

            return null;
        }

        registerParser(ParserClass, ...types:string[]){
            var self = this;
            var parser = new ParserClass;
            var pool4Parser = self._pool4Parser;
            for (var i = 0, l_i = types.length; i < l_i; i++) {
                pool4Parser[types[i]] = parser;
            }
        }

        getParser(type:string):ResParser{
            return this._pool4Parser[type];
        }
    }

    export var res:Res = new Res();
}
