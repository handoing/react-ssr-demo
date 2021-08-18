const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:8]",
                exportLocalsConvention: "camelCaseOnly",
                namedExport: true,
              },
            },
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
}