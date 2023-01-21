const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PAGES = ["index", "about"];

module.exports = {
  entry: PAGES.reduce((config, page) => {
    config[page] = `./app/front/js/pages/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].[contenthash].js",
    library: '[name]',
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name].[contenthash][ext]"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
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
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
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
              publicPath: '../'
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
        new HtmlWebpackPlugin({
          inject: true,
          template: `./app/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join(`styles/`, `[name].[contenthash].css`),
    })
    // <- here goes array(s) of other plugins
  ),
};
