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
  {
    filename: 'pageModel', //文件名，
    title: '后台管理系统-pageModel', // 标题
    src: './view/chenzhaoyi/PageModel/index.jsx' //登陆页面
  },
  {
    filename: 'lotteryModel', //文件名，
    title: '后台管理系统-lotteryModel', // 标题
    src: './view/chenzhaoyi/lottery/index.jsx' //登陆页面
  },
  {
    filename: 'BallFall', //文件名，
    title: '后台管理系统-BallFall', // 标题
    src: './view/chenzhaoyi/BallFall/index.jsx' //登陆页面
  },
  {
    filename: 'LoadingShow', //文件名，
    title: '后台管理系统-LoadingShow', // 标题
    src: './view/chenzhaoyi/LoadingShow/index.jsx' //登陆页面
  },
  {
    filename: 'DialogModel', //文件名，
    title: '后台管理系统-DialogModel', // 标题
    src: './view/chenzhaoyi/DialogModel/index.jsx' //登陆页面
  },
  {
    filename: 'ReduxDemo', //文件名，
    title: '后台管理系统-ReduxDemo', // 标题
    src: './view/chenzhaoyi/ReduxDemo/index.jsx' //登陆页面
  },
];

module.exports = entry;
