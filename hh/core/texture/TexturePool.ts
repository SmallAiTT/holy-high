module hh{
    export class TexturePool extends Emitter{
        // 对象池
        _pool:any;
        // 计数器
        _counter:any;
        // 需要移除的列表
        _delList:string[];

        //@override
        _initProp(){
            super._initProp();
            var self = this;
            self._pool = {};
            self._counter = {};
            self._delList = [];
            self.onNextTick('del', self._onDelNextTick, self);
        }

        _delListened:boolean;
        _onDelNextTick(){
            // 延迟到下一帧才做真正的删除操作
            var self = this;
            var delList = self._delList;
            var counter = self._counter;
            var pool = self._pool;
            delete self._delListened;// 设置成还没监听
            for(var i = 0, l_i = delList.length; i < l_i; ++i){
                var key = delList[i];
                var count = counter[key] || 0;
                if(count > 0) continue;// 证明还有
                delete counter[key];
                delete pool[key];// 进行释放
            }
        }
        addCount(key:string, count:number){
            var self = this;
            var counter = self._counter;
            var delList = self._delList;
            var total = counter[key] = (counter[key] || 0) + count;
            if(total <= 0 && delList.indexOf(key) < 0){
                delete counter[key];
                delList.push(key);// 加到待删除列表中
                if(!self._delListened){
                    self._delListened = true;// 设置成已经监听
                    self.emitNextTick('del');// 进行下一帧事件分发
                }
            }
        }
        set(key:string, texture:Texture){
            this._pool[key] = texture;
        }
        get(key:string):Texture{
            return this._pool[key];
        }
        del(key:string){
            var pool = this._pool;
            delete pool[key];
        }
        setByGrid(texture:Texture, grid:number[]){

        }
    }
    export var texturePool:TexturePool = new TexturePool();
}
