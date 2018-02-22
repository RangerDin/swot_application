import path from 'path';

import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

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
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js'],
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
if (ENV === 'production') {
    configToExport = webpackMerge([commonConfig, productionConfig]);
} else {
    configToExport = webpackMerge([commonConfig, developmentConfig]);
}

export default configToExport;
