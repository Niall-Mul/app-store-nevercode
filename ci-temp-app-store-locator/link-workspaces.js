try {
  require('crna-make-symlinks-for-yarn-workspaces')(__dirname);
} catch (ex) {
  console.log('Symbolic links for Yarn Workspaces not used');
}
