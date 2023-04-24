import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const config = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' })
  ]
}

export default config
