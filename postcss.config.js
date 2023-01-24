/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    autoprefixer,
    purgecss({
      content: ["./**/*.html"],
    }),
    cssnano({ preset: "default" }),
  ],
};
