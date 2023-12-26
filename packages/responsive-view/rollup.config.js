const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const { uglify } = require("rollup-plugin-uglify");
const pkg = require("./package.json");

const extensions = [".tsx", ".ts", ".jsx", ".js"];

module.exports = {
  input: "./src/index.ts",
  output: [
    pkg.main && {
      file: pkg.main,
      format: "cjs",
    },
    pkg.module && {
      file: pkg.module,
      format: "esm",
    },
    pkg.unpkg && {
      file: pkg.unpkg,
      format: "umd",
      name: "ResponsiveView",
      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
  ],
  external: ["react"],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    process.env.NODE_ENV === "production" && uglify(),
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: "./node_module/**/*",
      extensions,
    }),
  ],
};
