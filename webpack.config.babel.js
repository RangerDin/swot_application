import path from 'path';

import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';
const isModeDevelopment = ENV === 'development';

const ExtractSCSS = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true,
    disable: isModeDevelopment
});

const commonConfig = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ExtractSCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isModeDevelopment,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isModeDevelopment,
                                plugins: [
                                    autoprefixer({ browsers: ['last 2 versions'] }),
                                    cssnano()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isModeDevelopment,
                                includePaths: [path.resolve(__dirname, './src/')]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        ExtractSCSS
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.scss'],
        modules: [path.resolve('./src'), path.resolve('./node_modules')]
    }
};

const developmentConfig = {
    output: {
        filename: 'bundle.dev.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './src'
    },
    devtool: 'inline-source-map'
};

const productionConfig = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map'
};

let configToExport;
if (isModeDevelopment) {
    configToExport = webpackMerge([commonConfig, developmentConfig]);
} else {
    configToExport = webpackMerge([commonConfig, productionConfig]);
}

export default configToExport;
