var path = require('path');
var fs = require('fs');

function del(dir){
    var files = fs.readdirSync(dir);
    for(var i = 0; i < files.length; ++i){
        var file = files[i];
        var filePath = path.join(dir, file);
        if(!fs.statSync(filePath).isFile()){
            del(filePath);
        }else{
            var str = '.d.ts';
            var index = file.indexOf(str);
            if(index > 0 && index == file.length - str.length){
                console.log(filePath);
                fs.unlinkSync(filePath);
            }
        }
    }
}
del(path.join(__dirname, './hh/core'));
