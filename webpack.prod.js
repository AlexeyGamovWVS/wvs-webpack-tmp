/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
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
    filename: "scripts/[name].[contenthash:8].js",
    library: "[name]",
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name].[contenthash:8][ext]"),
  },
  devServer: {
    watchFiles: path.resolve(__dirname, "./dist"),
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
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
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
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
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
        })
    ),
    PAGES.map(
      (page) =>
        new FaviconsWebpackPlugin({
          logo: "./app/images/favicon.svg",
          prefix: "",
          publicPath: "./resources/favicons",
          outputPath: "resources/favicons",
          chunks: [page],
          favicons: {
            appName: "Proton WebSite",
            appDescription: "Proton WebSite",
            developerName: "WebValley Studio",
            developerURL: "https://web-valley.ru",
            background: "#fff",
            theme_color: "#101A2D",
          },
          inject: (htmlPlugin) =>
            path.basename(htmlPlugin.options.filename) === `${page}.html`,
        })
    ),
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
    new MiniCssExtractPlugin({
      filename: path.join("styles", "[name].[contenthash:8].css"),
    }),
    new ESLintPlugin()
  ),
};
