// next.config.js
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const withSass = require('@zeit/next-sass');
const withPlugins = require("next-compose-plugins");
const Dotenv = require('dotenv-webpack');

module.exports = withPlugins(
    [
        withSass
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
