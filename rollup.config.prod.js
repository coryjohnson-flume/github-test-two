import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

export default {
  input: 'index.ts', // entry point
  external: [...Object.keys(pkg.devDependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    svgr({
      typescript: true
    }),
    commonjs(),
    postcss({
      minimize: true
    }),
    json(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    terser()
  ]
}
