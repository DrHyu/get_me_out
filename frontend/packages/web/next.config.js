const path = require("path");
const withTM = require("next-transpile-modules")(["@getmeout/common"]);

module.exports = withTM({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });
    // config.resolve.alias.react = path.resolve(
    //   __dirname,
    //   ".",
    //   "node_modules",
    //   "react"
    // );
    return config;
  },
});
