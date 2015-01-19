/// <reference path="../../boot.ts" />
/**
 * asyncjs模块的api模拟。只模拟了部分觉得有用的api。
 */
module hh {
    /**
     * 序列执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     * @param atOnce
     */
    export function series(
        tasks:Array<(cb:(err?:any, arg?:any)=>void)=>void>,
        cb:(err:any, results:any[])=>void,
        ctx?:any, atOnce?:boolean):void{
        var asyncPool = new AsyncPool(tasks, 1, function(func, index, cb1){
            func.call(ctx, cb1);
        }, cb, ctx);
        asyncPool.flow(atOnce);
    }

    /**
     * 平行执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     * @param atOnce
     */
    export function parallel(
        tasks:Array<(cb:(err?:any, arg?:any)=>void)=>void>,
        cb:(err:any, results:any[])=>void,
        ctx?:any, atOnce?:boolean):void{
        var asyncPool = new AsyncPool(tasks, 0, function(func, index, cb1){
            func.call(ctx, cb1);
        }, cb, ctx);
        asyncPool.flow(atOnce);
    }

    /**
     * 瀑布模式执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     * @param atOnce
     */
    export function waterfall(
        tasks:Array<(...args:any[])=>void>,
        cb:(err:any, argFromLastTask?:any)=>void,
        ctx?:any, atOnce?:boolean):void{

        var args:any[] = [];//参数
        var asyncPool = new AsyncPool(tasks, 1, function(func, index, cb1){
            args.push(function(err){
                //在这里重新设置传递给各个任务的参数
                args = Array.prototype.slice.apply(arguments);//保存当前任务的返回值
                args.splice(0, 1);//去掉err项
                cb1.apply(null, arguments);
            });//将回调添加进去
            func.apply(ctx, args);
        }, function(err, results){
            if(!cb) return;//没有回调，不处理
            if(err) return cb.call(ctx, err);//如果出错了

            cb.call(ctx, null, results[results.length - 1]);
        }, null);
        asyncPool.flow(atOnce);
    }

    /**
     * 使用map方式迭代执行列表或者对象数据，进行异步操作。
     * @param tasks {Array|Object}
     * @param iterator  迭代的异步操作
     * @param cb
     * @param ctx
     * @param atOnce
     */
    export function map(
        tasks:any,
        iterator:(value:any, index:any, cb:(err:any, ...args:any[])=>void)=>void,
        cb:(err:any, results:any[])=>void,
        ctx?:any, atOnce?:boolean):void{
        var asyncPool = new AsyncPool(tasks, 0, iterator, cb, ctx);
        asyncPool.flow(atOnce);
    }

    /**
     * 使用map方式迭代执行列表或者对象数据，进行异步操作。但是可以限制每次并行的数量。
     * @param tasks {Array|Object}
     * @param limit 每次并行限制数量
     * @param iterator  迭代的异步操作
     * @param cb
     * @param ctx
     * @param atOnce
     */
    export function mapLimit(
        tasks:any,
        limit:number,
        iterator:(value:any, index:any, cb:(err:any, ...args:any[])=>void)=>void,
        cb:(err:any, results:any[])=>void,
        ctx?:any, atOnce?:boolean):void{
        var asyncPool = new AsyncPool(tasks, limit, iterator, cb, ctx);
        asyncPool.flow(atOnce);
    }

}