// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
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
  plugins: [commonjs(), babel({ babelHelpers: "runtime" }), resolve()],
  external: [
    /@babel\/runtime/,
    "react",
    "react-dom",
    "react/jsx-runtime",
    "prop-types",
  ],
};
