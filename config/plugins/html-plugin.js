var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  new HtmlWebpackPlugin({
    template: './src/modules/app/index.html',
    filename: '../index.html',
    excludeChunks: ['server']
});