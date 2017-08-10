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

     //入口文件来源的路径
    context: path.resolve(__dirname, './src'),

    //插件项
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: true
        }),
         // // 获取打包css，独立文件，名称与输出一样,disable 设置false  allChunks参数设置成true，则插件会所有独立样式打包各自打包成一个css文件 在2.0中似乎没有用
        new ExtractTextPlugin({filename: 'css/[name].css', disable:false,  allChunks: true}),  

       //公共文件
        new webpack.optimize.CommonsChunkPlugin({name:['common',"react","api","load"],minChunks: 2}),  

        // 热加载 添加HMR插件 | 对应启动参数 --hot  
        new webpack.HotModuleReplacementPlugin(),
    ],

    //页面入口文件配置
    entry: {
        button: './view/button/index.jsx',
       add: './view/order/add.jsx',
        order: './view/order/index.jsx',
           //将哪些文件作为common的打包
        react: ['react','react-dom'],
        api:["wasabi-api"]
    },

    // 出口文件输出配置
    output: {
        path: path.resolve(__dirname, './dist/'),//路径配置
        filename: 'js/[name].js',//文件名称
        publicPath: ''  // 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径，暂时不需要
    },

    module: {
        // 加载器配置
        rules: [
              //.css 文件使用 style-loader 和 css-loader 来处理,注意这里要引用ExtractTextPlugin,独立出来
            { test: /\.(css)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})},
            { test: /\.(sass|scss)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
            { test: /\.(less)$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']})},
            // .js 文件使用babel 来编译处理,react 需要几个插件
            {test: /\.jsx?$/, use: [{ loader: 'babel-loader', options: { presets: ['react', 'es2015', 'stage-0'] }}] },
            // exclude 参数是否需要请根据情况而定，一般不需要
            //   { test: /\.js[x]?$/, use: [{ loader: 'babel-loader', options: { presets: ['react', 'es2015', 'stage-0'] }}], exclude: /node_modules/ },
           //下面的方式也是可以的 
            //  { test: /\.jsx?$/,  loader: 'babel-loader', options: { presets: ['react', 'es2015', 'stage-0'] } },
            // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64,并且指定文件名称与路径
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=8192&name=./img/[name].[ext]'},
            //打包字体
            //{test: 使用file-loader 来处理，并且指定文件名称与路径
            {test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, use: 'file-loader?prefix=font/&name=./font/[name].[ext]'}
        ]
    },

   
    resolve: {
        //
         modules: ['node_modules', path.join(__dirname, './node_modules')],
         //其它解决方案配置 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions:['.js', ".jsx", '.json', '.scss','sass','less']
    },
    // 用来生成源码文件 必须是 'source-map' 或者 'inline-source-map'
    devtool:'source-map',
    // 启动服务器
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),  // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        inline: true, // 实时刷新
        historyApiFallback: false, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: host,
        port: port
        
    }
};