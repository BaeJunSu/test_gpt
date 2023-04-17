module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    publicPath: 'resource/',
  },
  devtool: 'none',
  externals: {
    uxp: 'uxp',
    os: 'os',
    scenegraph: 'scenegraph',
    application: 'application',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
