import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import svgr from '@svgr/rollup'
import typescript from 'rollup-plugin-typescript2'
import analyze from 'rollup-plugin-analyzer'

const pkg = require('./package.json')

export default {
  input: 'src/index.ts', // entry point
  external: [...Object.keys(pkg.devDependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    analyze({summaryOnly: true}),
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
    })
  ]
}
