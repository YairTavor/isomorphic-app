const extractSass = require('../plugins/extract-scss-plugin');

module.exports =  {
    test: /\.scss$/,
    exclude: /(node_modules|bower_components)/,
    use: extractSass.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
};