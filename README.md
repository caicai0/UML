# UML
主要用于显示项目的继承关系,如果想显示项目的引用关系参考https://github.com/kimsungwhee/KSHObjcUML.
## 使用方法
1. `npm install`  安装 async 依赖.

2. `node extend.js` 运行extend.js,脚本会扫描'../'目录下的所有.h.m文件,并且匹配'@interface([\s]\*)([a-zA-z_][\S]\*)([\s]\*):([\s]\*)([a-zA-z_][\S]*)'把继承关系写到source.js文件中.
3. 用浏览器打开index.html.





