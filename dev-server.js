const webpack =  require("webpack");
const config = require("./webpack.config.dev");
const compiler = webpack(config);
const WebpackDevServer=require("webpack-dev-server");
const server = new WebpackDevServer(compiler,{
    publicPath: "/assets/",
    hot: false,
    quiet: true,
    noInfo: false,
    inline:true,
    historyApiFallback: false,
    stats: { colors: true },
    watchOptions: {
        aggregateTimeout: 200,
        poll: true
    }
});
server.listen(8080,'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});