const webpack =  require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{
        app:["webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server", './src/index'],//热部署webpack-dev-server
        vendors: ['vue']//核心库将打包进插件CommonsChunkPlugin vendor.js
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
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors'],
            filename: 'vendor.js'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: { 'vue': 'vue/dist/vue.js' }
}
};