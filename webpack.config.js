var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: "/dist/",
    path: path.resolve(__dirname, 'dist')
  }
};
