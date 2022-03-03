import json from "rollup-plugin-json";
import resole from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
export default {
  input: "./index.js", //入口文件
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
    { file: pkg.browser, format: "umd" ,name:pkg.name},
  ],
  external: ["iconv-lite"],
  plugins: [
    json(),
    resole(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 防止打包node_modules下的文件
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    terser(),
  ],
};
