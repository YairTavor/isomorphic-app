const path = require('path');
const nodeExternals = require('webpack-node-externals');
const jsLoader = require('./loaders/js-loader');
const scssLoader = require('./loaders/scss-loader');
const removeAssetLoader = require('./loaders/remove-assets-loader');
const eslintLoader = require('./loaders/eslint-loader');
const extractScssPlugin = require('./plugins/extract-scss-plugin');
const htmlPlugin = require('./plugins/html-plugin');
const copyPublicFilePlugin = require('./plugins/copy-public-files');

const client = {
    entry: {
        client: './src/modules/app/client.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist/client/public')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            jsLoader,
            scssLoader,
            eslintLoader
        ]
    },
    plugins: [
        copyPublicFilePlugin,
        extractScssPlugin,
        htmlPlugin
    ]
};

const server = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    entry: {
        server: './src/modules/app/server.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            jsLoader,
            eslintLoader,
            removeAssetLoader,
        ]
    },
    plugins: []
};

module.exports = [client, server];