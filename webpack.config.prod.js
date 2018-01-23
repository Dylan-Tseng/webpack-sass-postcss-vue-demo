const webpack =  require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");//css文件打包
module.exports = {
    entry:{
        app:['./src/index'],//入口文件
        vendors: ['vue','vue-router',"vue-resource"]//核心库将打包进插件CommonsChunkPlugin vendor.js
    },
    output: {
        path: __dirname + '/assets/',
        filename: "bundle.js",//除核心库之外的logic代码会打包进bundle.js
        publicPath: '/assets/'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                loader:'babel-loader'
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test:/\.(png|jpg|gif)$/,//图片loader
                loader: "file-loader?name=images/[hash:8].[ext]"
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({//生产环境
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors'],
            filename: 'vendor.js'
        }),
         new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             },
             comments:false
         }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: { 'vue': 'vue/dist/vue.min.js' }
    }
};