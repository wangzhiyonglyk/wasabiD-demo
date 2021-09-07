
const APP_ENV =env;
console.log("env11",env)
const config = {
  dev: {
    url: 'http://localhost:7007',//开发的后台服务地址
   
  },
  pro: {
    url: 'http://emap-server.sz.bocsys.cn',// 正式后台服务地址
 
  },
}
export default { ...config[APP_ENV] }
