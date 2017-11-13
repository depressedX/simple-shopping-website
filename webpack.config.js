const webpack = require('webpack');
const HtmlWebpackConfig = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const env={
    // 本地webpackdevserver测试环境
    'dev':{
        MODE:'dev',
        ROOT_ROUTE:'',
        API_ROOT_PATH:''
    },
    // 线上测试环境
    'debug':{
        MODE:'debug',
        ROOT_ROUTE:'',
        API_ROOT_PATH:'http://120.24.70.191:8080/SimpleShoppingWebsite'
    }
}
const consts = env.dev

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/main.js',
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        publicPath: "/"
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        host:'localhost',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // vue-loader options
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath:'assets/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackConfig({
            template:'./src/index.tmpl.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin(['public']),
        new webpack.DefinePlugin({
            API_ROOT_PATH: JSON.stringify(consts.API_ROOT_PATH),
            ROOT_ROUTE: JSON.stringify(consts.ROOT_ROUTE),
            MODE:JSON.stringify(consts.MODE)
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}
