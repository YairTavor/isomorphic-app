const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = new CopyWebpackPlugin(
    [
        {
            context: 'src/public',
            from: '**/*',
        }
    ],
    {copyUnmodified: true}
);