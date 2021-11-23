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
    src: './view/index/index.jsx' //脚本路径
  },
  
  {
    filename: 'datagrid', //文件名，
    title: 'datagrid组件', // 标题
    src: './view/datagrid/index.jsx' //脚本路径
  },
  
  {
    filename: 'login', //文件名，
    title: 'login', // 标题
    src: './view/login/index.jsx' //脚本路径
  },
  {
    filename: 'users', //文件名，
    title: '用户管理', // 标题
    src: './view/users/index.jsx' //脚本路径
  },
  {
    filename: 'changePassword', //文件名，
    title: '修改密码', // 标题
    src: './view/changePassword/index.jsx' //脚本路径
  },
];

module.exports = entry;
