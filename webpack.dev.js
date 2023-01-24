/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const PAGES = require("./entries.config");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    hot: true,
    compress: true,
    port: 8080,
    open: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [].concat(
    PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./app/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
    // <- here goes array(s) of other plugins
  ),
});
