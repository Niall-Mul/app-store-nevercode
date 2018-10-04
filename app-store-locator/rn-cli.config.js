try {
  const getConfig = require('metro-bundler-config-yarn-workspaces');
  module.exports = getConfig(__dirname);
} catch (ex) {
  console.log('Metro bundler for Yarn Workspaces not used');
}
