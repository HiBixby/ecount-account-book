const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: { main: './public/js/index.js', report: './public/js/report.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 이전 빌드 결과 자동 삭제
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
        generator: {
          filename: 'icon/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './public/report.html',
      filename: 'report.html',
      chunks: ['report'],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
};
