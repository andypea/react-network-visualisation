// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
// import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/react-simple-network-graph.cjs",
        format: "cjs",
      },
      {
        file: "dist/react-simple-network-graph.js",
        format: "es",
      },
    ],
    plugins: [
      commonjs(),
      // babel({ extensions, babelHelpers: "runtime" }),
      typescript(),
      resolve({ extensions }),
    ],
    external: [
      /@babel\/runtime/,
      "react",
      "react-dom",
      "react/jsx-runtime",
      "prop-types",
    ],
  },
  {
    input: "dist/dts/index.d.ts",
    output: [{ file: "dist/react-simple-network-graph.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
