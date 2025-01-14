const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    Components: path.resolve(__dirname, "src/Components"),
    Redux: path.resolve(__dirname, "src/Redux"),
    Assets: path.resolve(__dirname, "src/Assets"),
    Pages: path.resolve(__dirname, "src/Pages"),
    Routes: path.resolve(__dirname, "src/Routes"),
  };
  return config;
};
