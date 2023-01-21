const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PAGES = [
  "index",
  "about",
];

module.exports = {
  entry: PAGES.reduce((config, page) => {
    config[page] = `./app/front/js/pages/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].js",
    publicPath: "",
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
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
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
    new MiniCssExtractPlugin(),
    // <- here goes array(s) of other plugins
  ),
};
