const { merge } = require('webpack-merge')
const webpackMaster = require('../webpack/webpackMaster')

module.exports = {
  webpackFinal: async (config) => {
    return merge(config, webpackMaster);
  },
  "stories": [
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}