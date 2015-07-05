/**
 * Created by SmallAiTT on 2015/6/30.
 */
module hh.STR{

    /**
     * 字符串补全。
     * @param src
     * @param fillStr
     * @param isPre
     * @returns {*}
     */
    export function fill(src:any, fillStr:string, isPre:boolean = true){
        src = src + "";
        var sl = src.length, fl = fillStr.length;
        if(sl >= fl) return src;
        if(isPre){
            return fillStr.substring(0, fl - sl) + src;
        }else{
            return src + fillStr.substring(sl);
        }
    }
}