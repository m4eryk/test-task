const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../public'),
    assets: 'static/',
}
module.exports = {
    externals:{
        paths: PATH
    },
    entry: {
        app : PATH.src
    },
    output: {
        filename: `${PATH.assets}js/[name].js`,
        path: PATH.dist,
        publicPath: '/'
    },
    module:{
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options:{
                name: '[name].[ext]'
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader : 'css-loader',
                    options: { sourceMap: true }
                }
            ]
        }]
    },
    devServer: {
        overlay: true
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${PATH.assets}css/[name].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATH.src}/img` , to: `${PATH.assets}/img` },
            { from: `${PATH.src}/static`, to : '``' },
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATH.src}/index.html`,
            filename: './index.html'
        })
      ],
}