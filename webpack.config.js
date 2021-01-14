/**
 * Created by wangzhiyong
 * date 2017-02-08 1.x的配置
 * edit date:2017-08-15 2.x的配置
 * edit date:2020-03-10升级为4.x版本
 * edit 2020-04-07
 *  生产环境 不设置devtool
 * desc:打包入口
 */
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前先清空dist
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //分离js中的css
let  CopyWebpackPlugin=require('copy-webpack-plugin');
const host = '127.0.0.1' //地址
const port = 8080 //端口号

let entry = require('./config') //打包的配置文件,多页面的配置文件

//根据多页面配置文件，生成对应要入口配置
let entryconfig = {} //webpack入口配置

entry.forEach((item, index) => {
  entryconfig[item.filename] = item.src //文件名与路径对应
})



module.exports =env=> {
/*插件：动态生成html，在webpack完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果。*/
//生成多个html页面
  let htmlplugin = entry.map((item, index) => {
    return new HtmlWebpackPlugin({
      title: item.title, //页面标题
      filename: item.filename + '.html', //生成的html存放路径，相对于 path
      template: (env.mode=="development"? '../config/template.html':'../config/buildtemplate.html')  , //html模板路径
      inject: true, //允许插件修y改哪些内容，true/'head'/'body'/false,
      hash: true, //避免缓存js。
      //加上公共代码,item.filename就是页面中js的名称
      chunks: ['react', 'wasabi', 'editor', 'vendor', 'common', item.filename], //每个html引入对应的js和css
      minify: {
        ////对html文件进行压缩
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //删除空白符与换行符
        minifyCSS: true, //压缩css  默认值false；
        minifyJS: true, //压缩js  默认值false；
        caseSensitive: true, //是否对大小写敏感，默认false
      },
    })
  })

  

  return {
  //入口文件来源的路径
  context: path.resolve(__dirname, './src'),

  //页面入口文件配置
  entry: entryconfig,

  // 出口文件输出配置
  output: {
    path: path.resolve(__dirname, './dist/'), //路径配置
    filename: 'js/[name][hash].js', //文件名称
    publicPath: '', // 配置发布打包时js,css资源的url前缀，
  },
  //优化配置项 todo
  optimization: {
    splitChunks: {
      //提取公共代码
      cacheGroups: {
        //提取react代码
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/]react/,
          // async 仅提取按需载入的module
          // initial 仅提取同步载入的module
          // all 按需、同步都有提取
          chunks: 'initial',
          priority: 10,
          // 如果 这个模块已经 被分到 上面的组，这里无需在分割 直接引用 分割后的
          reuseExistingChunk: true,
          enforce: true
        },
        //提取wasabi-api代码
        wasabi: {
          name: 'wasabi',
          test: /[\\/]node_modules[\\/]wasabi/,
          chunks: 'initial',
          priority: 9,
          reuseExistingChunk: true,
          enforce: true
        },
        editor: {//富文本框
          name: 'editor',
          test: /[\\/]node_modules[\\/]wangeditor/,
          chunks: 'initial',
          priority: 8, // 优先级
          reuseExistingChunk: true,
          enforce: true
        },
        //其他第三方库
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/, //打包第三方库
          chunks: 'initial',
          priority: 7, // 优先级
          reuseExistingChunk: true,
          enforce: true
        },
        // common: { // 打包其余的的公共代码
        //   name: 'common', // 分离包的名字
        //   minChunks: 2, // 引入两次及以上被打包
        //   chunks: 'all',
        //   priority: 5,//优先级低一点
        //   reuseExistingChunk: true
        // }
      },
    },
  },
  module: {
    // 加载器配置
    rules: [
      // // .js 文件使用babel 来编译处理,react 需要几个插件
      {
        test: /\.js[x]?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, //开启后用缓存，提升打包速度
            },
          },
        ],
      },
      //.css 文件使用 style-loader 和 css-loader 来处理,注意这里可以使用要引用ExtractTextPlugin,独立出来
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize'],
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'sass-loader'],
      },
      {
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'less-loader'],
      },

      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }, //解析vue
        ],
      },
      // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      {
        test: /\.(bmp|png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //是把小于8KB的文件打成Base64的格式，写入JS
              name: 'img/[name][hash:8].[ext]', //文件名

              publicPath: '../',
              esModule: false, // 这里设置为false,否则打包路径有问题,因为新版本的file-laoder这个参数esModule默认为true
            },
          },
        ],
      },

      //打包字体
      //{test: 使用url-loader 来处理，并且指定文件名称与路径
      // 引用字体图片和svg图片
      {
        test: /\.(eot|ttf|woff|svg|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name][hash:8].min.[ext]',
              esModule: false, // 这里设置为false,因为新版本的file-laoder这个参数esModule默认为true
            },
          },
        ],
      },
    ],
  },
  resolve: {
    //别名，快速访问
    alias: {
      '@': path.resolve(__dirname, './src'),
      component: path.resolve(__dirname, './src/component'),
    },
    //指定模块路径，可以不设置，有默认值,方便更快的打包
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    //其它解决方案配置 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.jsx', '.json', 'css', '.scss', 'sass', 'less'],
  },

  //插件项
  plugins: [
    new CleanWebpackPlugin(), // 打包前先清空,因为命名的采用了hash，不清空，打包文件越来越大
    new MiniCssExtractPlugin({
      //分离js中的css,独立打包
      //  filename，对应于entry里面生成出来的文件名
      //  chunkFilename，未被列在entry中，却又需要被打包出来的文件命名配置，是一些公共代码
      filename: 'css/[name]-[hash:8].css', //可以更变文件产生路径
      chunkFilename: 'css/common-[id].css', //公共文件
    }),

    new webpack.HotModuleReplacementPlugin(), //热加载插件
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       // from: path.resolve(__dirname+"/public", 'test.txt'),
    //     },
      
    //   ],
    // }) 
  ].concat(htmlplugin), //生成对应的html文件,在htmlplugin中

  //devtool: 'eval-source-map', // eval-source-map is faster for development
  // 本地web服务器配置
  devServer: {
    contentBase: path.resolve(__dirname, './dist/'), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    inline: true, // 是否注入代理客户端 自动刷新
    host: host, //端口号
    compress: true, //服务端压缩是否开启
    port: port, //服务器IP地址,
    open: true, // 自动打开浏览器
    hot: true, //模块热替换
  },
 
}}
