/**
 * create by wangzhiyong
 * date:2017-08-15
 * desc webpack打包时的入口的脚本文件
 * 如果是单页面，请只写一个入口脚本文件
 *  */

//如果是单页面
let entry = [
  
  {
    filename: 'datagrid', //文件名，
    title: 'datagrid组件', // 标题
    src: './view/datagrid/index.jsx' //脚本路径
  },
  
  {
    filename: 'login', //文件名，
    title: 'datagrid组件', // 标题
    src: './view/login/index.jsx' //脚本路径
  },
];

module.exports = entry;
