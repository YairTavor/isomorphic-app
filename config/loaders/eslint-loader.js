const path = require('path');
const codeframeFormmatter = require('eslint-codeframe-formatter');

module.exports =  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'eslint-loader',
        options: {
            cache: true,
            configFile: path.resolve(__dirname, '../eslintrc.js'),
            formatter: codeframeFormmatter
        }
    }
};
