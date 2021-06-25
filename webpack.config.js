const path = require("path")
const webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = (env, argv) => {
  const dev = argv.mode === "development"
  const plugins = [new HtmlWebpackPlugin()]
  if (!dev) {
    plugins.concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      }),
      new DuplicatePackageCheckerPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ])
  }

  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return {
    entry: "./src/index.tsx",
    devtool: "source-map",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "ts-loader",
          // options: { presets: ['@babel/env'] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "bundle.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000",
      hotOnly: true,
    },
    plugins,

  }
}
