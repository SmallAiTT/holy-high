/// <reference path="../base/logger.ts" />
/// <reference path="../const/logCode.ts" />

module hh {
    export function numToColor():string{
        return null;
    }
    export function color(r, g?:number, b?:number){
        var length = arguments.length;
        var color = null;
        if(length == 1){

        }else if(length == 3){

        }else{
            error(logCode.e_2);
        }
        return color;
    }
}