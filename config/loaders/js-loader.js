const babelConfig  = require("../../package.json").babel;
module.exports =  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: babelConfig
    }
}
