/**
 * This is a server code loader that remove "import" request for assets, such as scss files which should not be
 * imported in the server.
 */

module.exports = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'string-replace-loader',
    query: {
        multiple: [{
            flags: 'gi',
            search: "import.*scss.*",
            replace: ''
        }]
    }
}
