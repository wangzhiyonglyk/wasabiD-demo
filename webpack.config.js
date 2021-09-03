/**
 * Created by wangzhiyong
 * date 2017-02-08 1.x的配置
 * edit date:2017-08-15 2.x的配置
 * edit date:2020-03-10升级为4.x版本
 * edit 2020-04-07
 *  生产环境 不设置devtool
 * edit 2021-08-02 升级为webpack5
 * desc:打包入口
 */
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前先清空dist
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //分离js中的css
let CopyWebpackPlugin = require('copy-webpack-plugin');//引入静态资源
const host = '127.0.0.1' //地址
const port = 8081 //端口号

let entry = require('./config') //打包的配置文件,多页面的配置文件

//根据多页面配置文件，生成对应要入口配置
let entryconfig = {} //webpack入口配置

entry.forEach((item, index) => {
  entryconfig[item.filename] = item.src //文件名与路径对应
})



module.exports = (arg1, env) => {
  try {
    /*插件：动态生成html，在webpack完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果。*/
    //生成多个html页面
    let htmlplugin = entry.map((item, index) => {
      return new HtmlWebpackPlugin({
        title: item.title, //页面标题
        filename: item.filename + '.html', //生成的html存放路径，相对于 path
        template: (env.mode == "development" ? '../config/template.html' : '../config/buildtemplate.html'), //html模板路径
        //加上公共代码,item.filename就是页面中js的名称
        chunks: ['react', 'wasabi-api', 'editor', 'vendor', 'common', item.filename], //每个html引入对应的js和css

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
        assetModuleFilename: 'images/[name][hash:8][ext][query]'//资源存放地
      },
      //优化配置项 todo
      optimization: {
        splitChunks: {
          //提取公共代码
          cacheGroups: {
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/]react/,
              // async 仅提取按需载入的module
              // initial 仅提取同步载入的module
              // all 按需、同步都有提取
              chunks: 'initial',
              priority: 10,//权重
              // 如果 这个模块已经 被分到 上面的组，这里无需在分割 直接引用 分割后的
              reuseExistingChunk: true,

            },
            //提取wasabi-api代码
            wasabi: {
              name: 'wasabi-api',
              test: /[\\/]node_modules[\\/]wasabi-api/,
              chunks: 'initial',
              priority: 9,
              reuseExistingChunk: true,

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

            },
            common: { // 打包其余的的公共代码
              name: 'common', // 分离包的名字
              minChunks: 2, // 引入两次及以上被打包
              chunks: 'initial',
              priority: 7,//优先级低一点
              reuseExistingChunk: true
            }
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
              },

            ],
          },
          //.css 文件使用 style-loader 和 css-loader 来处理,注意这里可以使用要引用ExtractTextPlugin,独立出来
          {
            test: /\.(css)$/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../"
              }
            }, 'css-loader?minimize'],
          },
          {
            test: /\.(sass|scss)$/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../"
              }
            }, 'css-loader?minimize', 'sass-loader'],
          },
          {
            test: /\.(less)$/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../"
              }
            }, 'css-loader?minimize', 'less-loader'],
          },
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|bmp)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
            type: "asset/inline",//使用这种才能导出字体
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
        new webpack.DefinePlugin({
          'env': JSON.stringify(env.mode)
        }),
        new CleanWebpackPlugin(), // 打包前先清空,因为命名的采用了hash，不清空，打包文件越来越大
        //分离js中的css,独立打包
        new MiniCssExtractPlugin({
          ignoreOrder: true,//忽略警告
          filename: 'css/[name]-[hash:8].css', //对应于entry里面生成出来的文件名
          chunkFilename: 'css/[id].css', //未被列在entry中，却又需要被打包出来的文件命名配置，是一些公共代码

        }),

        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname + "/public", 'favicon.ico'),
            },

          ],
        })
      ].concat(htmlplugin), //生成对应的html文件,在htmlplugin中

      devtool: env.mode == "development" ? 'eval-source-map' : false, // eval-source-map is faster for development
      // 本地web服务器配置
      devServer: {
        contentBase: path.resolve(__dirname, './dist/'), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        inline: true, // 是否注入代理客户端 自动刷新
        host: host, //端口号
        compress: true, //服务端Gzip压缩是否开启
        port: port, //服务器IP地址,
        open: true, // 自动打开浏览器
        hot: true, //模块热替换
        //nginx 代理 请自行设置代理
        proxy: {
        }
      },

    }
  }
  catch (e) {
    console.log("error", e);
  }

}
