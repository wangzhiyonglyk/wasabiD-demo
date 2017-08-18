# wasabi Design PC框架测试DEMO<sup>React</sup>
	蓝风信子网络科技有限公司PC端前端框架
	此版本可以用来使用，也可以用于学习
	
### 框架简介
wasabi Design PC端框架是由蓝风信子前端团队基于react技术专为企业应用系统定制的技术平台。框架提供丰富的常规组件与功能组件，具体有良好的交互体验效果... 
wasabi-api 将前后端通信独立成一个类库，方便广大使用react技术的同学们无需引入jquery框架就可与后端通信。
 

### demo简介
config文件夹为 webpack打包时的入口文件，分为单页面与多页面两种情况，具体请见 config/index.js 
src 为开发文件夹
template.html为自动生成html的模板


### 安装 依赖项
npm install 原始安装所有依赖项
如果这样安装失败的请一个个安装依赖项
npm install babel-core --save
cnpm install 淘宝镜像安装方式 

### 运行
运行npm run dev 来启动服务,访问 https://localhost:8080。
自动热更新，但如果是config/index的打包配置改变，请重新启动

### 生产
然后运行npm run build来编译 生成dist文件夹，将其放到服务器上






