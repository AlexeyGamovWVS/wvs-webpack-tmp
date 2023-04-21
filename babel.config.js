const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "entry",
      corejs: "^3.30.1",
    },
  ],
];

module.exports = { presets };
