/**
 * Created by liyufeng on 16/9/7.
 */

var fs = require('fs');
var async = require('async');

var filePaths = [];

function scanPath(path) {
    if(fs.statSync(path).isDirectory()){
        var paths = [path];
        while (paths.length){
            var firstPath = paths[0];
            var files = fs.readdirSync(firstPath);
            for (var i=0; i< files.length; i++){
                var file= firstPath +'/'+files[i];
                var stat = fs.statSync(file);
                if (stat.isFile()){
                    filePaths.push(file);
                }else{
                    paths.push(file);
                }
            }
            paths.shift();
        }
    }
}

scanPath('..');

var ocFiles = [];
var rule = [];

async.eachSeries(filePaths,function (item, cb) {
    var index = item.lastIndexOf('.');
    var name = item.substring(index+1);
    if(name == 'php'){
        ocFiles.push(item);
    }
    async.nextTick(function () {
        cb();
    });
},function (err) {
    async.eachSeries(ocFiles,function (item, cb) {
        fs.readFile(item,null,function (err, data) {
            var string = data.toString();
            var rex = /class([\s]*)([a-zA-Z_][a-zA-Z0-9_]*)([\s]*)extend([\s]*)([a-zA-Z_][a-zA-Z0-9_]*)/g;
            var classes ;
            while (classes = rex.exec(string)){
                rule.push({source:classes[2],dest:classes[5]});
            }
            async.nextTick(function () {
                cb();
            });
        });
    },function (err) {
        var dependencies = JSON.stringify({links:rule});
        var fileString = 'var dependencies = \n'+dependencies;
        var filePath = './origin.js';
        fs.writeFile(filePath,fileString,{encoding:'utf-8'},function (err) {
            console.log(err);
        });
    });
});
