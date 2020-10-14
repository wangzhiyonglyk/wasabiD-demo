/**
 * create by wangzhiyong
 * date:2017-08-15
 * desc webpack打包时的入口的脚本文件
 * 如果是单页面，请只写一个入口脚本文件
 *  */

//如果是单页面
let entry = [
  {
    filename: 'index', //文件名，
    title: '后台管理系统', // 标题
    src: './view/index/index.jsx' //脚本路径
  },
  
  {
    filename: 'home', //文件名，
    title: '后台管理系统', // 标题
    src: './view/home/index.jsx' //脚本路径
  },
];

module.exports = entry;
