/**
 * Created by Administrator on 2015/6/28.
 */
///<reference path="sty_init.ts" />
module sty{
    unit.curModuleName = moduleName_imageData;

    unit.addMenuItem4Ctx('ColorPicker', function(ctx:IRenderingContext2D, param){
        var canvas = hh.engine._canvas;
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
        var canvas = hh.engine._canvas;
        canvas.removeEventListener('mousemove', param.pick);
    });

    unit.addMenuItem4Ctx('Gray', function(ctx:IRenderingContext2D){
        resHelper.loadImage(resHelper.getItemUrl(11001), function(err, img){
            var width = img.width, height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.drawImage(img, width, 0);
            var imageData = ctx.getImageData(0,0,width, height);
            var data = imageData.data;

            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i +1] + data[i +2]) / 3;
                data[i]     = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            }
            ctx.putImageData(imageData, 0, 0);
        });
    });

    unit.addMenuItem4Ctx('Invert', function(ctx:IRenderingContext2D){
        resHelper.loadImage(resHelper.getItemUrl(11001), function(err, img){
            var width = img.width, height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.drawImage(img, width, 0);
            var imageData = ctx.getImageData(0,0,width, height);
            var data = imageData.data;

            for (var i = 0; i < data.length; i += 4) {
                data[i]     = 255 - data[i];     // red
                data[i + 1] = 255 - data[i + 1]; // green
                data[i + 2] = 255 - data[i + 2]; // blue
            }
            ctx.putImageData(imageData, 0, 0);

            var grayscale = function() {
                for (var i = 0; i < data.length; i += 4) {
                    var avg = (data[i] + data[i +1] + data[i +2]) / 3;
                    data[i]     = avg; // red
                    data[i + 1] = avg; // green
                    data[i + 2] = avg; // blue
                }
                ctx.putImageData(imageData, 0, 0);
            };
        });
    });
}