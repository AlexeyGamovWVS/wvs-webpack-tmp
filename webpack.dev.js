/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const PAGES = require("./webpack.data.js");

module.exports = {
  entry: PAGES.reduce((config, page) => {
    config[page] = path.resolve(
      __dirname,
      "app",
      "front-js",
      "pages",
      `${page}.js`
    );
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: path.join("scripts", "[name].[contenthash:8].js"),
    library: "[name]",
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name].[contenthash:8][ext]"),
  },
  devtool: "inline-source-map",
  devServer: {
    watchFiles: path.resolve(__dirname, "./dist"),
    hot: "only",
    compress: true,
    port: 8080,
    open: true,
    client: {
      logging: "info",
      progress: true,
      reconnect: 5,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
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
          "css-loader",
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
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources",
            "images",
            "[name].[contenthash:8][ext]"
          ),
        },
      },
      {
        test: /\.(gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources",
            "gif",
            "[name].[contenthash:8][ext]"
          ),
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources",
            "svg",
            "[name].[contenthash:8][ext]"
          ),
        },
      },
      {
        test: /\.mp4$/,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources",
            "videos",
            "[name].[contenthash:8][ext]"
          ),
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: path.join(
            "resources",
            "fonts",
            "[name].[contenthash:8][ext]"
          ),
        },
      },
    ],
  },
  plugins: [].concat(
    PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: "body",
          template: path.join(__dirname, "app", "pages", `${page}.pug`),
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
    PAGES.map(
      (page) =>
        new FaviconsWebpackPlugin({
          logo: "./app/images/logo.svg",
          prefix: "",
          publicPath: "./resources/favicons",
          outputPath: "resources/favicons",
          chunks: [page],
          inject: (htmlPlugin) =>
            path.basename(htmlPlugin.options.filename) === `${page}.html`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:8].css",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
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
    new CircularDependencyPlugin(),
    new CaseSensitivePathsPlugin(),
    new DashboardPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new ESLintPlugin()
  ),
};
