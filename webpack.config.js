const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /skybox_(nx|ny|nz|px|py|pz)\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'images/skybox/[name][ext][query]',
                }
            },
            {
                test: /\.(glb|gltf)$/i,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'models/',
                                name: '[name].[ext]'
                            }
                        }
                    ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Penguin Breaker",
            template: './src/index.html'
        })
    ],
    devtool: 'inline-source-map',
};