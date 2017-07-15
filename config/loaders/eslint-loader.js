const path = require('path');
const codeframeFormmatter = require('eslint-codeframe-formatter');
const isProd = process.env.NODE_ENV === 'production';

module.exports =  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'eslint-loader',
        options: {
            cache: !isProd,
            configFile: path.resolve(__dirname, '../eslintrc.js'),
            formatter: codeframeFormmatter,
            failOnError: isProd,
        }
    }
};
