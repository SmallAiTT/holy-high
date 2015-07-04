/**
 * Created by SmallAiTT on 2015/7/1.
 */
///<reference path="../Res.ts" />
///<reference path="../../texture/Texture.ts" />
module hh{
    export class ImgParser extends ResParser{
        static __className:string = 'ImgParser';

        // override
        _load(rci:ResCfgItem){
            var self = this;
            var realUrl = self._getRealUrl(rci);
            var errMsg = '加载图片' + realUrl + '失败！';

            var img = document.createElement("img");
            img.setAttribute("url", rci.url);

            var winURL = window["URL"] || window["webkitURL"];

            if (realUrl.indexOf("http:") != 0 && realUrl.indexOf("https:") != 0 && winURL /*&& Browser.getInstance().isIOS()*/) {
                var xhr = hh.net.getXHR();
                xhr.open("get", realUrl, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    if (this.status == 200) {
                        var blob = this.response;

                        img.onload = function () {
                            winURL.revokeObjectURL(img.src); // 清除释放
                            // success
                            self._onFinish(null, img, rci);
                        };
                        img.onerror = function () {
                            // error
                            self._onFinish(errMsg, null, rci);
                        };
                        img.src = winURL.createObjectURL(blob);
                    }
                    else {
                        self._onFinish(errMsg, null, rci);
                    }
                };
                xhr.send();
            }
            else {
                img.onload = function () {
                    self._onFinish(null, img, rci);
                };
                img.onerror = function () {
                    self._onFinish(errMsg, null, rci);
                };
                img.src = realUrl;
            }
        }

        // override
        _parse(resData:any, rci:ResCfgItem){
            var texture = new Texture();
            texture.url = rci.url;
            texture.setData(resData);
            return texture;
        }
    }

    res.registerParser(ImgParser, 'png', 'jpg');
}