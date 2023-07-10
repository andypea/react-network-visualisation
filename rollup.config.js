// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
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
    plugins: [commonjs(), typescript(), resolve({ extensions })],
    external: ["react", "react-dom", "react/jsx-runtime", "prop-types"],
  },
  {
    input: "dist/dts/index.d.ts",
    output: [{ file: "dist/react-simple-network-graph.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
