/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = moduleName_imageData;

    unit.addMenuItem4Ctx('ColorPicker', function(ctx:RenderingContext2D, param){
        var canvas = hh.context._canvas;
        function pick(event) {
            var x = event.layerX;
            var y = event.layerY;
            var pixel = ctx.getImageData(x, y, 1, 1);
            var data = pixel.data;
            var rgba = 'rgba(' + data[0] + ',' + data[1] +
                ',' + data[2] + ',' + data[3] + ')';

            ctx.clearRect(300, 200, 200, 200);
            ctx.fillStyle = rgba;
            ctx.fillRect(300, 300, 100, 100);
            ctx.fillStyle = 'black';
            ctx.fillText(rgba, 300, 300);
        }
        canvas.addEventListener('mousemove', pick);
        param.pick = pick;

        resHelper.loadImage(resHelper.getItemUrl(11001), function(err, img){
            ctx.drawImage(img, 0, 0);
        });
    }, function (param) {
        var canvas = hh.context._canvas;
        canvas.removeEventListener('mousemove', param.pick);
    });
}