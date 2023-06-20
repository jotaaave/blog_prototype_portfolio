const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './Src', './public', 'index.ts'),
  output: {
    path: path.resolve(__dirname, './Src', './public', './assets', './js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_module/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
};
