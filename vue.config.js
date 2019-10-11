const path = require("path");
module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.resolve.alias.set("@", path.join(__dirname, "/src"));
      }
    }
  }
};
