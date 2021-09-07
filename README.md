
### 安装 依赖项

##### 通过npm 方式安装
npm install 原始安装所有依赖项  
如果这样安装失败的请一个个安装依赖项  
npm install babel-core --save  
##### 通过yarn 安装
yarn 安装原始所有依赖项  
yarn add babel-core 安装指定的  

###  安装时 --save与--save-dev的参数的区别 
--save是默认的方法，存放在 dependencies目录下，项目实际依赖的第三方包都是这种安装方式，比如react  
--save-dev 存放在 devDependencies目录下，项目编译时所依赖的第三方  
npm install babel-core --save-dev  
yarn add babel-core --dev  

### 整体移除node_modules 
全局安装 npm install -g rimraf (苹果电脑 全局安装，命令前面都要加 sudo )  
安装后  执行： rimraf node_modules  

### webpack-cli打包问题
package.json 中虽然没有webpack-cli包提示  
但是编译如果有提示这个错误，请全局安装 ：npm install webpack-cli -g (苹果电脑 全局安装，命令前面都要加 sudo )  

### 淘宝镜像问题
最好不要使用cnpm 命令，下面是cnpm命令的安装方法  
 npm install -g cnpm --registry=https://registry.npm.taobao.org  
 可以更改npm的配置,命令如下
npm config set registry https://registry.npm.taobao.org  

### 版本说明
需要配置.babelrc文件来编译es6+，与react语法  

### 运行
运行npm run dev 来启动服务,访问 https://127.0.0.1:8081。  
自动热更新，但如果是config/index的打包配置改变，请重新启动  

### 生产
然后运行npm run build来编译 生成dist文件夹，将其放到服务器上  







