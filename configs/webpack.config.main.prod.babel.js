/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * Webpack config for production electron main process
 */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv';
import DeleteSourceMaps from '../internals/scripts/DeleteSourceMaps';

CheckNodeEnv('production');
DeleteSourceMaps();

// eslint-disable-next-line import/no-default-export
export default merge(baseConfig, {
  devtool: process.env.DEBUG_PROD === 'true' ? 'source-map' : 'none',

  mode: 'production',

  target: 'electron-main',

  externals: {
    'node-hid': 'commonjs node-hid',
    usb: 'commonjs usb',
  },

  entry: './app/main.dev.ts',

  output: {
    path: path.join(__dirname, '..'),
    filename: './app/main.prod.js',
  },

  optimization: {
    minimizer: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // new TerserPlugin({}),
    ],
  },

  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
      E2E_BUILD: false,
      STX_NETWORK: process.env.STX_NETWORK,
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
});
