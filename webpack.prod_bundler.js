/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const PAGES = require("./webpack.data.js");

const PATHS = {
  src: path.join(__dirname, "app"),
};

module.exports = {
  entry: path.join(__dirname, "app", "front-js", "bundle.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    library: "[name]",
    publicPath: "",
    assetModuleFilename: path.join("resources", "[name][ext]"),
  },
  optimization: {
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
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
          "source-map-loader",
          {
            loader: "webpack-strip-block",
            options: {
              start: "START_EXCLUDE_JS_BUNDLE",
              end: "END_EXCLUDE_JS_BUNDLE",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        // раскомментировать для получения html в несжатом виде
        // options: {
        //   pretty: true,
        // },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
          {
            loader: "string-replace-loader",
            options: {
              search:
                /\/\*\s*START_EXCLUDE_STYLE_BUNDLE\s*\*\/([\s\S]*?)\/\*\s*END_EXCLUDE_STYLE_BUNDLE\s*\*\//gi,
              replace: "",
              // strict: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("resources", "images", "[name][ext]"),
        },
      },
      {
        test: /\.(gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("resources", "gif", "[name][ext]"),
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources", "svg", "[name][ext]"),
        },
      },
      {
        test: /\.mp4$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources", "videos", "[name][ext]"),
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: path.join("resources", "fonts", "[name][ext]"),
        },
      },
      {
        test: /\.(glb|gltf)$/,
        type: "asset/resource",
        generator: {
          filename: path.join("models", "[name][ext]"),
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
    ),
    PAGES.map(
      (page) =>
        new FaviconsWebpackPlugin({
          logo: "./app/images/logo.svg",
          prefix: "",
          publicPath: "./resources/favicons",
          outputPath: "resources/favicons",
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
    new MiniCssExtractPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
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
