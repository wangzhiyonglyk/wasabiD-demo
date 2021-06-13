
import api from "./api"
const APP_ENV =env==="development"?"dev":"pro"||"dev";

const config = {
  dev: {
    url: 'http://localhost:7007',//开发的后台服务地址
    rock: 'rock',// 有用，用管系统
  },
  pro: {
    url: 'http://emap-server.sz.bocsys.cn',// 正式后台服务地址
    rock: 'rock',// 有用，用管系统 
  },
}

//初始化 todo
let init = function () {
window.api=api;//全部设置请求方式
}
init();//初始化


export default { ...config[APP_ENV] }
