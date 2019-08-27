// next.config.js
const path = require('path');
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withPlugins = require("next-compose-plugins");
const Dotenv = require('dotenv-webpack');
const withImages = require('next-images');

module.exports = withPlugins(
    [
        withSass,
        withImages
    ],
    {
        webpack (config, options) {
            config.resolve.alias['components'] = path.join(__dirname, 'src/components');
            config.resolve.alias['src'] = path.join(__dirname, 'src/');
            return config
        }
    },
    {
        webpack(config) {
            config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

            return config
        }
    },
);
