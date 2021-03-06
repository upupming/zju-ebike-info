// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getChargerInfo, getDateTime } = require('./util');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == 'production';

const getConfig = async () => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].js'
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new webpack.DefinePlugin({
            chargerInfo: JSON.stringify(await getChargerInfo),
            lastFetchTime: JSON.stringify(getDateTime())
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[chunkhash].css',
            chunkFilename: '[id]-[chunkhash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
});

module.exports = async () => {
    const config = await getConfig()

    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
