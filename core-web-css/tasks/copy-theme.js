/*******************************
          Build Task
*******************************/

var // dependencies
  gulp = require('gulp-help')(require('gulp')),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
  // config
  config = require('./config/user'),
  install = require('./config/project/install'),
  // task sequence
  tasks = [];

// sub-tasks
if (config.rtl) {
  require('./collections/rtl')(gulp);
}
require('./collections/build')(gulp);

const themes = require('../src/semantic-themes.json').themes;
module.exports = function(callback) {
  console.info('Building Semantic');

  if (!install.isSetup()) {
    console.error(
      'Cannot find semantic.json. Run "gulp install" to set-up Semantic',
    );
    return 1;
  }

  console.info('Building Semantic UI themes');
  // tasks.push('build-assets');
  for (var i = 0; i < themes.length; i++) {
    // tasks.push('build-javascript'); -- Semantic UI Javascript is not used.
    const theme = themes[i];
    console.info(`Adding tasks for theme ${theme}`);

    gulp.task(`Copy theme ${theme} config`, function() {
      return gulp
        .src(`./src/themes/${theme}/theme.config`)
        .pipe(gulp.dest('./src'));
    });
    tasks.push(`Copy theme ${theme} config`);
  }
  runSequence(tasks, callback);
};
