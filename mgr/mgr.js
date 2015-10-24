/**
 * Created by SmallAiTT on 2015/6/9.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cfg = require("./config_mgr.js");

var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "mp3": "audio/mpeg",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var server = http.createServer(onGet);
server.addListener("error", function () {
    console.log("Error");
});


function onGet(request, response) {
    var pathname = url.parse(request.url).pathname;
    writeFile(pathname, response);
}

function writeFile(pathname, response) {
    var realPath = path.join(cfg.clientDir, pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            console.log(realPath);
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err.toString());
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Accept-Ranges': 'bytes',
                        'Content-Type': contentType,
                        'Content-Length': file.length,
                        'Access-Control-Allow-Origin': '*'
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}
server.listen(cfg.port, cfg.host, function(){
    console.log("http server %s:%s", cfg.host, cfg.port);
});
