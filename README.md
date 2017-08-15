# wasabi Design PC框架测试DEMO<sup>React</sup>
	蓝风信子网络科技有限公司PC端前端框架
	此版本可以用来使用，也可以用于学习
	
### 简介
wasabi Design PC端框架是由蓝风信子前端团队基于react技术专为企业应用系统定制的技术平台。首先将前后端通信独立成一个类库，方便广大使用react技术的同学们无需引入jquery框架就可与后端通信。框架提供丰富的常规组件与功能组件，具体有良好的交互体验效果... 

### 安装 依赖项
npm install 原始安装所有依赖项
如果这样安装失败的请一个个安装依赖项
npm install babel-core --save
cnpm install 淘宝镜像安装方式 

### 运行
然后运行npm run build来编译
运行npm run dev 来启动服务

###开发说明
开发一个新功能后需要打包的，只要参考entryconfig/index.js 中参数即可。
多页面时比如CRM系统可将配置拆分为多个，最后在index.js中合并。
单页面，则只有一个index配置




