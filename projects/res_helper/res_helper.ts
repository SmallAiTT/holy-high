/**
 * Created by SmallAiTT on 2015/7/1.
 */

module res_helper{

    export function getItemUrl(resId:number):string{
        return 'item/' + hh.STR.fill(resId, '00000') + '.png';
    }

    export function getS9gUrl(resId:number):string{
        return 's9g/' + hh.STR.fill(resId, '00000') + '.png';
    }

}
