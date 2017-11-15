/**
 * Created by wangzy
 * date 2017-02-08
 * edit date:2017-08-15
 * desc:打包入口
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const host = '127.0.0.1';//地址
const port = 8081;//端口号
let entry = require("./config");//打包的配置文件

//根据打包入口的配置文件，生成对应要打包的配置
let entryconfig = {};
entry.forEach((item, index) => {
    entryconfig[item.filename] = item.src;
});

/*插件：动态生成html，在webpack完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果。*/
let htmlplugin = entry.map((item, index) => {
    return new HtmlWebpackPlugin({
        title: item.title,//页面标题
        filename: item.filename + ".html",//生成的html存放路径，相对于 path
        template: "template.html", //html模板路径
        inject: true,    //允许插件修改哪些内容，true/'head'/'body'/false,
        hash: true,
        chunks: ["load", "react", "api", "common", item.filename],//前面四个为公共脚本,用意见下面的配置
        minify: {
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: true, //删除空白符与换行符
            removeAttributeQuotes: true
        },

    })
})

module.exports = {
    //入口文件来源的路径
    context: path.resolve(__dirname, './src'),

    //页面入口文件配置
    entry: Object.assign({
        //将常用的插件独立打包，其他公共模块则放到common中
        react: ['react', 'react-dom'],
        api: ["wasabi-api"]
    }, entryconfig),//与其他需要独立打包的入口脚本

    // 出口文件输出配置
    output: {
        path: path.resolve(__dirname, './dist/'),//路径配置
        filename: 'js/[name][chunkhash:8].js',//文件名称
        publicPath: ''  // 
    },

    module: {
        // 加载器配置
        rules: [
            //.css 文件使用 style-loader 和 css-loader 来处理,注意这里要引用ExtractTextPlugin,独立出来
            { test: /\.(css)$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }) },
            { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }) },
            { test: /\.(less)$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }) },
            // .js 文件使用babel 来编译处理,react 需要几个插件
            {
                test: /\.jsx?$/, loader: 'babel-loader', options: {
                    presets: ['react',
                        "es2015",
                        'stage-0']
                }
            },
            // 下面的方式也是可以的 exclude 参数是否需要请根据情况而定，一般不需要
            //   { test: /\.js[x]?$/, use: [{ loader: 'babel-loader', options: { presets: ['react', 'es2015', 'stage-0'] }}], exclude: /node_modules/ },
            //
            // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64,并且指定文件名称与路径
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./img/[name].[ext]' },
            //打包字体
            //{test: 使用file-loader 来处理，并且指定文件名称与路径
            { test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, loader: 'url-loader?name=./font/[name].[ext]' }
        ]
    },
    resolve: {
        //指定模块路径，可以不设置，有默认值,方便更快的打包
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        //其它解决方案配置 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', ".jsx", '.json', 'css','.scss', 'sass', 'less']
    },

    //插件项
    plugins: [
        //提取公共代码的插件，用于提取多个入口文件的公共脚本部分 第一个就是公共脚本，第二第三个是单独将react,api两个模块独立出来，第四个为自动生成的模块加载器，渲染时load放在第一个位置
        new webpack.optimize.CommonsChunkPlugin({ name: ['common', "react", "api", "load"], minChunks: 2 }),

        // *插件：单独使用style标签加载css文件.contenthash代表的是文本文件内容的hash值，也就是只有style文件的hash值*/
        new ExtractTextPlugin({ filename: 'css/[name][chunkhash:8].css' }),
        //在文件开头插入banner
        new webpack.BannerPlugin("The file is creted by wangzhiyonglyk.--" + new Date()),
        //压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: true,
            // 删除所有的注释
            comments: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        })

    ].concat(htmlplugin), //生成对应的html文件,在htmlplugin中

    // devtool: '#source-map',
    devtool: '#eval-source-map',  // eval-source-map is faster for development
    // 启动服务器
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),  // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        inline: true, // 实时刷新
        historyApiFallback: false, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: host,
        port: port

    }
};