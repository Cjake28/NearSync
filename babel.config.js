module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ["@babel/plugin-transform-private-methods", { loose: true }], // ✅ Use transform instead of proposal
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  };
};
