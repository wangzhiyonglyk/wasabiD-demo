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
    title: '首页', // 标题
    src: './view/index/index.jsx', //脚本路径
    hide:true,
  },
  {
    filename: 'home', //文件名，
    title: '主页', // 标题
    src: './view/home/index.jsx' //脚本路径
  },
  {
    filename: 'login', //文件名，
    title: '登录', // 标题
    src: './view/login/index.jsx' //脚本路径
  },
  {
    filename: 'button', //文件名，
    title: '按钮', // 标题
    src: './view/button.jsx' //脚本路径
  },
 
  {
    filename: 'msg', //文件名，
    title: '消息框', // 标题
    src: './view/msg/index.jsx' //脚本路径
  },
  {
    filename: 'form', //文件名，
    title: '表单', // 标题
    src: './view/form/index.jsx' //脚本路径
  },
  {
    filename: 'excel', //文件名，
    title: 'excel组件', // 标题
    src: './view/excel/index.jsx' //脚本路径
  },
  {
    filename: 'datagrid', //文件名，
    title: 'datagrid组件', // 标题
    src: './view/datagrid/index.jsx' //脚本路径
  },
];

module.exports = entry;
