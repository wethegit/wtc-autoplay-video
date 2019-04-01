const path = require('path');

module.exports = {
  target: 'web',
  entry: "./src/wtc-autoplay-video.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'wtc-autoplay-video.es5.js',
    library: 'WTCAutoplayVideo'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/env", {
            "targets": {
              "browsers": ["last 2 versions", "ie >= 11"]
            },
            useBuiltIns: "usage"
          }]]
        }
      }
    ]
  }
}