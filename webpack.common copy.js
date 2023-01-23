/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const WebpackDashboard = require("webpack-dashboard/plugin");
const PAGES = require("./entries.config");

module.exports = {
  entry: PAGES.reduce((config, page) => {
    config[page] = `./app/front/js/pages/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].[contenthash].js",
    library: "[name]",
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name].[contenthash][ext]"),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: true,
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["babel-loader", "source-map-loader"],
        exclude: "/node_modules/",
      },
      {
        test: /\.mp4$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources/videos", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources/images", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources/images/svg",
            "[name].[contenthash][ext]"
          ),
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources/fonts", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
            },
          },
          "postcss-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [].concat(
    PAGES.map(
      (page) =>
        new HtmlWebpackPlugin(
          // eslint-disable-next-line prefer-object-spread
          Object.assign(
            {},
            {
              inject: true,
              template: `./app/${page}.html`,
              filename: `${page}.html`,
              chunks: [page],
            },
            process.env.NODE_ENV === "production"
              ? {
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
                }
              : undefined
          )
        )
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join(`styles/`, `[name].[contenthash].css`),
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join("app", "static"),
              destination: "dist",
            },
          ],
        },
      },
    }),
    new WebpackDashboard(),
    new ESLintPlugin()
    // <- here goes array(s) of other plugins
  ),
};
