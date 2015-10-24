/**
 * Created by SmallAiTT on 2015/7/13.
 */
module hh.ARR {
    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    LOG.initLogger(hh.ARR, 'ARR');

    /**
     * 删除某个对象
     * @function
     * @param {Array} arr Source Array
     * @param {*} delObj  remove object
     */
    export function rm (arr:Array<any>, delObj:any) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == delObj) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    /**
     * @function
     * @param {Array} srcSrr Source Array
     * @param {Array} minusArr minus Array
     */
    export function rmInArr (srcSrr:Array<any>, minusArr:Array<any>) {
        for (var i = 0, l = minusArr.length; i < l; i++) {
            rm(srcSrr, minusArr[i]);
        }
    }

    /**
     * 数组操作：移动一个元素到新的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    export function mvTo(arr:any[], oldIndex:number, newIndex:number) {
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    }

    /**
     * 数组操作：交换两个元素的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    export function swap(arr:any[], oldIndex:number, newIndex:number) {
        arr[oldIndex] = arr.splice(newIndex, 1, arr[oldIndex])[0];
        return arr;
    }

    /**
     * 排序功能的option函数模板。
     *      例子：
     *      var arr = [
     *          {"key1":"a", "key2":"b", "key3":"c", "key4":"d"},
     *          ...
     *      ]
     *      hh.ARR.sort(arr, {
     *          list : ["key1", "key2", {name:"key3", type:1}, "key4"]
     *      });
     *      意思是一次按照数组的顺序为优先级进行排序，默认为为降序。当定义type为1的时候，为升序。
     * @param arr
     * @param ctx
     * @returns {any[]}
     */
    export function sort(arr:any[], ctx:any):any[]{
        if(!arr) return arr;
        arr.sort((function(a:any, b:any){
            var list:any[] = this.list;
            for(var i = 0, li = list.length; i < li; ++i){
                var key = list[i];
                var type = -1;
                if(typeof key == "object"){
                    type = key.type;
                    key = key.name;
                }
                if(a[key] < b[key]){
                    return type <= 0 ? 1 : -1;
                }else if(a[key] > b[key]){
                    return type <= 0 ? -1 : 1;
                }
            }
            return 0;
        }).bind(ctx));
        return arr;
    }

    /**
     *
     * @param arr
     * @param ctx
     * @returns {any[]}
     */
    export function filter(arr:any[], ctx:any):any[]{
        if(!arr) return arr;
        return arr.filter((function(value:any, index:number, ar?:any){
            var list:any[] = this.list;
            if(!list || list.length == 0){// 如果没有则认为不进行过滤
                return true;
            }
            for(var i = 0, li = list.length; i < li; i++){
                var filterOptArr = list[i];
                if(filterOptArr.length == 0){
                    continue;
                }
                // 第一个字段表示过滤的字段名
                var key = filterOptArr[0];
                // 后面表示过滤的字段值内容参考，如果不在这个内容中，则认为要过滤掉。
                var newArr = filterOptArr.slice(1, filterOptArr.length);
                if(newArr.length > 0 && newArr.indexOf(value[key]) < 0){
                    return false;
                }
            }
            return true;
        }).bind(ctx));
        throw new Error("Not implemented yet");
    }

    /**
     * 重置数组，清除掉null的项。
     * @param arr
     */
    export function reset(arr){
        if(arr){
            for(var i = arr.length - 1; i >= 0; --i){
                if(arr[i] == null){
                    arr.splice(i, 1);
                }
            }
        }
    }
}
