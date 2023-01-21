const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackDashboard = require('webpack-dashboard/plugin');


const PAGES = ["index", "about"];

module.exports = {
  entry: PAGES.reduce((config, page) => {
    config[page] = `./app/front/js/pages/${page}.js`;
    return config;
  }, {}),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].[contenthash].js",
    library: "[name]",
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name].[contenthash][ext]"),
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
      new TerserPlugin({
        terserOptions: { format: { comments: false } },
        extractComments: false,
        parallel: true,
      }),
    ],
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    port: 8080,
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
        use: "babel-loader",
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
              importLoaders: 1,
            },
          },
          { loader: "postcss-loader" },
          { loader: "resolve-url-loader" },
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
    new webpackDashboard(),
    // <- here goes array(s) of other plugins
  ),
};
