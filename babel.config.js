module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: true
        }
      }
    ]
  ],
  plugins: ["babel-plugin-macros", "@babel/plugin-proposal-optional-chaining"]
};
