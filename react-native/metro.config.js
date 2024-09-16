const path = require("path");

const { getDefaultConfig } = require("@expo/metro-config");
const escape = require("escape-string-regexp");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const modules = [];

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,
    unstable_enablePackageExports: true,

    blacklistRE: exclusionList(
      modules.map((m) => new RegExp(`^${escape(require.resolve(m))}\\/.*$`))
    ),
  },
};

const projectRoot = __dirname;

config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];

module.exports = config;
