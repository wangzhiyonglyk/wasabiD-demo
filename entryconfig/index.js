
/**
 * create by wangzhiyong
 * date:2017-08-15
 * desc webpack打包时的入口的脚本文件
 * 如果是单页面，请只写一个入口脚本文件
 *  */
let demo =require("./demo");//引入

//如果是单页面，请只写一个入口脚本文件 请看注释的实例

/* 
let entry= [
       {
        filename:"index",//文件名，
        title:"微信公众号管理",// 标题
        src:'./view/index.jsx'//脚本路径
    }
]

module.exports=entry;
*/

//这是多页面,默认多页面
let entry=[].concat(demo);
module.exports=entry;