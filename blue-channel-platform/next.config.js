// const withCSS = require('@zeit/next-css');
//const path = require('path');
const webpack = require('webpack');
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

require('dotenv').config();
module.exports = withCSS(
  withImages({
    distDir: '_next',
    optimizeImages: false,

    webpack: config => {
      config.plugins = config.plugins || [];
      config.node = {
        fs: 'empty'
      };

      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});

      config.plugins.push(new webpack.DefinePlugin(env));

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('./src/polyfills.js');
        }
        return entries;
      };

      return config;
    }
  })
);
