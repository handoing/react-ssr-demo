const nodeExternals = require('webpack-node-externals');
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
  externals: [ nodeExternals() ]
}