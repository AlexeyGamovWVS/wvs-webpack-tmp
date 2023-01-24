const presets = [
  [
    "@babel/preset-env",
    {
      targets: "last 10 versions",
      useBuiltIns: "entry",
      corejs: "3.27.2",
    },
  ],
];

module.exports = { presets };
