var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
    entry: './inc/js/init.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap"
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            Popper: ['popper.js', 'default'],
            PrimeUI: 'primeui'
        })
    ]

}

// var $ = require('jquery');
// require('jquery-ui');