
/**
 * create by wangzhiyong
 * date:2017-08-15
 * desc webpack打包时的入口的脚本文件
 * 如果是单页面，请只写一个入口脚本文件
 *  */

/*这是多页面
let demo=require("./demoe");
let entry=[  {
    filename:"index",//文件名，
    title:"蓝风信子-首页",// 标题
    src:'./view/index.jsx'//脚本路径
}].concat(demo);
module.exports=entry;

*/

//如果是单页面
let entry= [
    {
<<<<<<< HEAD
     filename:"index", //文件名，
     title:"微信公众号管理", // 标题
=======
     filename:"index",//文件名，
     title:"wasabiD框架的demo",// 标题
>>>>>>> bab5a1ecae6bcd93d8051dcc8fdd5f51351c887e
     src:'./view/index.jsx'//脚本路径
 },
 {
    filename:"button",//文件名，
    title:"按钮的demo",// 标题
    src:'./view/buttons/button.jsx'//脚本路径
}
]

module.exports=entry;
