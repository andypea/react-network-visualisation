// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.cjs",
      format: "cjs",
    },
    {
      file: "dist/bundle.js",
      format: "es",
    },
  ],
  plugins: [
    commonjs(),
    babel({ extensions, babelHelpers: "runtime" }),
    resolve({ extensions }),
  ],
  external: [
    /@babel\/runtime/,
    "react",
    "react-dom",
    "react/jsx-runtime",
    "prop-types",
  ],
};
