const APP_ENV = window.dev;
const config = {
  dev: {
    url: 'http://121.36.149.7:20010',//开发的后台服务地址
    rock: 'rock',// 有用，用管系统
  },
  pro: {
    url: 'http://emap-server.sz.bocsys.cn',// 正式后台服务地址
    rock: 'rock',// 有用，用管系统 
  },
}

//初始化 todo
let init = function () {
 
}
init();//初始化


export default { ...config[APP_ENV] }
