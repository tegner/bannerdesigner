// Rollup plugins
import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
  multiEntry(),
  typescript(),
  babel({
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: ['./src/index.ts'],
    output: {
      file: './public/notjs/bannerdesigner.js',
      format: 'iife',
      name: 'bd',
    },
    plugins,
  },
];
