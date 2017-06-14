/**
 * Created by wangzy
 * date 2017-02-08
 * desc:打包入口
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = '127.0.0.1';
const port = 8080;
const devAddress = 'http://${host}:${port}';


module.exports = {

    context: path.resolve(__dirname, './src'),

    //插件项
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: true
        }),

        new ExtractTextPlugin({filename: 'css/[name].css', disable: false, allChunks: true}),   // 获取打包css

        new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'js/common.js'}),

        // 热加载 添加HMR插件 | 对应启动参数 --hot
        new webpack.HotModuleReplacementPlugin(),
    ],

    //页面入口文件配置
    entry: {
        button: './src/Button.jsx',
        common: ['react','react-dom','react-tap-event-plugin','react-router']
    },

    // 入口文件输出配置
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'js/[name].js',
        publicPath: ''  // 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    },

    module: {
        // 加载器配置
        rules: [
              //.css 文件使用 style-loader 和 css-loader 来处理,注意这里要引用ExtractTextPlugin,独立出来
            { test: /\.(css)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})},
            { test: /\.(sass|scss)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
            { test: /\.(less)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']})},
            // .js 文件使用babel 来编译处理,"babel-loader"也是一个合法的名称,babel5.0预设插件不需要的
            { test: /\.js[x]?$/, use: [{ loader: 'babel-loader', options: { presets: ['react', 'es2015', 'stage-0'] }}], exclude: /node_modules/ },          
            // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=8192&name=../img/[name].[ext]'},
            //打包字体
            //{test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, use: 'file?name=../font/[name].[ext]'}
            {test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, use: 'file-loader?prefix=font/&name=font/[name].[ext]'}
        ]
    },

    //其它解决方案配置 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        extensions:['.js', ".jsx", '.json', '.scss','sass','less']
    },
    // 用来生成源码文件 必须是 'source-map' 或者 'inline-source-map'
    devtool:'source-map',
    // 启动服务器
    devServer: {
        contentBase: path.resolve(__dirname, './build/'),  // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
	//inline: true,
        historyApiFallback: false, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        //noInfo: true,
        host: host,
        port: port
    }
};