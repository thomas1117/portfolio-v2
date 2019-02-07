const path = require('path');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackMd5Hash = require('webpack-md5-hash');
// similiar to extract text plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    transformLocalManifest,
    transformProductionManifest
} = require('./webpack-format');
const BundleTracker = require('webpack-bundle-tracker');
require('dotenv').config();
// process.env.CSS_LOCAL_BUILD || false not working...
const BUILD_LOCAL_CSS = false;
const PORT = 8080;
const JS_ROOT = '/base/static/src/js';
// export as a function to pass context
module.exports = (env, argv) => {
    // console.log(env, argv);
    // const build = argv && argv.mode ? argv.mode : 'development';
    const mode = env && env.mode ? env.mode : argv.mode;
    const prod = mode == 'production';

    const webpackObj = {
        mode: mode,
        entry: {
            main: path.join(__dirname, `${JS_ROOT}/main.js`),
        },
        devServer: {
            host: 'localhost', // Defaults to `localhost`
            port: PORT, // Defaults to 8080
            hot: true,
            inline: true,
        },
        output: {
            path: path.resolve(path.join(__dirname, '/base/static'), 'dist'),
            filename: prod ? '[name].[contenthash].js' : '[name].js',
            publicPath: '/dist/'
            // publicPath: prod ? '/static/dist/' : 'http://localhost:8080/dist/',
        },
        devtool: prod ? '' : 'cheap-module-eval-source-map',
        module: {
            rules: [{
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use: {
                        loader: 'eslint-loader',
                        options: {
                            configFile: path.join(__dirname, '/.eslintrc'),
                            failOnWarning: false,
                            failOnError: false,
                            emitWarning: true,
                            fix: true
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /vendor\/.+\.(jsx|js)$/,
                    loader: 'imports?jQuery=jquery,$=jquery,this=>window'
                },
                {
                    test: /\.scss$/,
                    use: [
                        prod || BUILD_LOCAL_CSS ? MiniCssExtractPlugin.loader : 'style-loader?sourceMap',
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ]
                },
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'vue-loader',
                        options: {
                            // extractCSS: true
                        }
                    },
                },
            ]
        },
        resolve: {
            alias: {
                vue: prod ? 'vue/dist/vue.min' : 'vue/dist/vue.js',
                '@': path.resolve(__dirname, 'base/static/src/js/')
                // $: 'jquery',
                // jquery: 'jQuery',
                // 'window.jQuery': 'jquery'
            },
            extensions: ['*', '.js', '.vue'],
        },
        optimization: {},
        plugins: [
            // this breaks custom manifest
            // new CleanWebpackPlugin(['base/static/dist']),
        ],
        performance: {
            hints: false
        },
    };

    if (prod || BUILD_LOCAL_CSS) {
        webpackObj.plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: prod ? '[name].[contenthash].css' : '[name].css',
            chunkFilename: '[id].css'
        }));
    }

    if (prod) {
        webpackObj.optimization = {
            splitChunks: {
                // chunks: "initial",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial',
                    }
                }
            }
        };
    }

    const manifestConfig = {
        output: 'manifest.json',
        space: 2,
        writeToDisk: false,
        assets: {},
        publicPath: prod ? '/static/dist/' : '/dist/',
        sortManifest(a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    };

    const transformer = new WebpackAssetsManifest(manifestConfig);

    if (!prod) {
        transformer.hooks.transform.tap('transformation', (assets) => transformLocalManifest(assets, Object.keys(webpackObj.entry), `http://localhost:${PORT}`, BUILD_LOCAL_CSS));
    } else {
        transformer.hooks.transform.tap('transformation', (assets) => transformProductionManifest(assets));
    }

    webpackObj.plugins.push(transformer);

    // webpackObj.plugins.push(new BundleTracker({filename: './base/static/dist/manifest.json', publicPath: prod ? '/static/dist/' : 'http://localhost:8080/dist/'}));//publicPath: '/static/dist/'}));
    return webpackObj;
};
