/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = sty.moduleName_image;

    unit.addMenuItem4Ctx('绘制', function(ctx:RenderingContext2D){
        resHelper.loadImage(resHelper.getItemUrl(10001), function(err, img){
            // 普通绘制
            ctx.drawImage(img,0,0);

            // 默认为平滑过度
            //(<any>ctx).mozImageSmoothingEnabled = false;
            //(<any>ctx).webkitImageSmoothingEnabled = false;
            //(<any>ctx).msImageSmoothingEnabled = false;
            //(<any>ctx).imageSmoothingEnabled = false;

            // 简单投射绘制，image, x, y, width, height
            // 图标根据绘制区域进行拉伸
            ctx.drawImage(img, 300, 0, 150, 50);

            var w = img.width, h = img.height;
            var sx = w/4, sy = h/4, sw = w/4, sh = h/4;
            var ox = 300, oy = 100;
            // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
            ctx.drawImage(img, sx, sy, sw, sh, ox, oy, 200, 200);
        });
    });
}