const path = require("path")
const webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  const dev = argv.mode === "development"

  const plugins = [new HtmlWebpackPlugin()]

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
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
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
