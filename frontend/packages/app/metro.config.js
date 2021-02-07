/**
 * Metro Bundler configuration
 * https://facebook.github.io/metro/docs/en/configuration
 *
 * eslint-env node, es6
 */

const blacklist = require("metro-config/src/defaults/blacklist");
const getWorkspaces = require("get-yarn-workspaces");
const path = require("path");

function getConfig(appDir, options = {}) {
  const workspaces = getWorkspaces(appDir);

  // Add additional Yarn workspace package roots to the module map
  // https://bit.ly/2LHHTP0
  const watchFolders = [
    path.resolve(appDir, "..", "..", "node_modules"),
    path.resolve(appDir, "..", "common"),
    // ...workspaces.filter((workspaceDir) => !(workspaceDir === appDir)),
  ];

  return {
    watchFolders,
    resolver: {
      blacklistRE: blacklist([
        // Ignore other resolved react-native installations outside of
        // myapp-native - this prevents a module naming collision when mapped.
        /^web\\node_modules\\.*/,
        // Ignore react-native-svg dependency in myapp-ui, mapped below.
        // react-native-svg must only be included once due to a side-effect. It
        // has not been hoisted as it requires native module linking here.
        // http://bit.ly/2LJ7V4b
        // /myapp-ui[\/\\]node_modules[/\\]react-native-svg[/\\].*/,
      ]),
      //   extraNodeModules: {
      //     // Resolve all react-native module imports to the locally-installed version
      //     "react-native": path.resolve(appDir, "node_modules", "react-native"),
      //     react: path.resolve(appDir, "node_modules", "react"),
      //     "react-dom": path.resolve(appDir, "node_modules", "react-dom"),
      //     // Resolve additional nohoist modules depended on by other packages
      //     "react-native-svg": path.resolve(
      //       appDir,
      //       "node_modules",
      //       "react-native-svg"
      //     ),
      //     // Resolve core-js imports to the locally installed version
      //     "core-js": path.resolve(appDir, "node_modules", "core-js"),
      //   },
    },
  };
}

module.exports = getConfig(__dirname);
