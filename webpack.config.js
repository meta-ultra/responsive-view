const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve("src", "index.ts"),
  output: {
    path: path.resolve("dist", "esm"),
    filename: "index.js",
    library: {
      type: "commonjs2",
    },
  },
  // devtool: "eval-cheap-module-source-map",
  devtool: false,
  // experiments: {
  //   outputModule: true,
  // },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    // Stop resolving immediately, once existing file has been found.
    // If there are both `App.jsx` and `app.js`, `import * from "./app"` would be resolved to `App.jsx`.
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve("src"),
    },
    modules: [path.resolve("node_modules")],
    mainFiles: ["index"],
  },
};
