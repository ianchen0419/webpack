/* webpack.config.js ： Webpack 的設定檔 */
var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(scss|sass)$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            // Tether: 'tether', //4.0.0-alpha.6
            // tether: 'tether', //4.0.0-alpha.6
            Popper: ['popper.js', 'default'] //4.0.0-beta
        })
    ]

}