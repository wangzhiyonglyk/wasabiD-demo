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
    title: '后台管理系统-主页', // 标题
    src: './view/home/index.jsx' //脚本路径
  },
  {
    filename: 'login', //文件名，
    title: '后台管理系统-登陆', // 标题
    src: './view/login/index.jsx' //登陆页面
  },
  {
    filename: 'flex', //文件名，
    title: '后台管理系统-flex布局', // 标题
    src: './view/flex/index.jsx' //登陆页面
  },
  {
    filename: 'modalDemo', //文件名，
    title: '后台管理系统-modalDemo', // 标题
    src: './view/modalDemo/index.jsx' //登陆页面
  },
  
];

module.exports = entry;
