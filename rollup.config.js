/*
 * @Date: 2022-01-10 16:58:24
 * @LastEditors: 曾令宇
 * @LastEditTime: 2022-01-11 17:47:57
 * @FilePath: /project-enigma-core/rollup.config.js
 */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
import json from '@rollup/plugin-json';


export default {
  input: './src/index.ts',
  plugins: [
    json(),
    clear({ target: './lib' }),
    typescript({
      sourceMap: true
    }),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: ['ts', 'js', 'd.ts'],
    }),
    nodeResolve(),
  ],
  output: [
    {
      file: 'lib/project-enigma-core.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/project-enigma-core.esm.min.js',
      format: 'esm', plugins: [terser()]
    },
    {
      file: 'lib/project-enigma-core.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/project-enigma-core.cjs.min.js',
      format: 'cjs', plugins: [terser()]
    },
    {
      file: 'lib/project-enigma-core.umd.js',
      format: 'umd',
      name: "EnigmaCore"
    },
    {
      file: 'lib/project-enigma-core.umd.min.js',
      format: 'umd', plugins: [terser()],
      name: "EnigmaCore"
    }
  ]
};