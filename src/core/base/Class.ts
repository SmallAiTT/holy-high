/// <reference path="../const/logCode.ts" />
/// <reference path="../const/const.ts" />
/// <reference path="logger.ts" />
/// <reference path="path.ts" />
module hh{
    export class Class{
        static __n:string;
        static __instanceIdCount:number = 1;
        static _instance:any;


        public static create(...args:any[]):any{
            var Class:any = this;
            var obj:any = new Class();
            if(obj.init) obj.init.apply(obj, arguments);
            return obj;
        }
        public static getInstance(...args:any[]):any{
            var Clazz:any = this;
            if(!Clazz._instance){
                var instance:any = Clazz._instance = Clazz.create.apply(Clazz, arguments);
                instance._isInstance = true;
            }
            return Clazz._instance;
        }
        public static purgeInstance(...args:any[]):any{
            var Clazz:any = this;
            var instance:any = Clazz._instance;
            if(instance){
                if(instance.release) instance.release();
                Clazz._instance = null;
            }

        }

        __instanceId:number;
        __c:any;
        __n:string;

        public constructor(){
            var self = this;
            self.__instanceId = Class.__instanceIdCount++;
            self._initProp();
            self._init();
        }

        _initProp():void{
            var self = this;
        }

        _init():void{
            var self = this;
        }

        public init(...args:any[]):void{
        }

        /** 释放已经释放过了 */
        _hasReleased:boolean;
        /** 进行释放 注意，该处子类一般不进行重写 */
        public release():void{
            var self = this;
            if(self._hasReleased) return;//避免重复释放
            self._hasReleased = true;
            self._release();
        }
        /** 进行释放的逻辑书写处 */
        _release():void{
        }
    }
}