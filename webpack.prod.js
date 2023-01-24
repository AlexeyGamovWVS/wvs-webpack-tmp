/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const PAGES = require("./entries.config");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", { name: "preset-default" }],
            ],
          },
        },
      }),
      new TerserPlugin({
        terserOptions: { compress: true, format: { comments: false } },
        extractComments: false,
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [].concat(
    PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./app/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        })
    )
    // <- here goes array(s) of other plugins
  ),
});
