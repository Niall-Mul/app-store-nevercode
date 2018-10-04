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
    // console.info(`Adding tasks for theme ${theme}`);
    //
    // gulp.task(`Copy theme ${theme} config`, function() {
    //   return gulp
    //     .src(`./src/themes/${theme}/theme.config`)
    //     .pipe(gulp.dest('./src/'));
    // });
    // console.info(`Copy ./src/themes/${theme}/theme.config to ./src/`);

    // tasks.push(`Copy theme ${theme} config`);

    // check for right-to-left (RTL) language
    if (config.rtl === true || config.rtl === 'Yes') {
      gulp.start('build-rtl');
      return;
    }

    if (config.rtl == 'both') {
      tasks.push('build-rtl');
    }

    // tasks.push('build-javascript');
    tasks.push('build-css');
    tasks.push('build-assets');

    gulp.task(`Copy CSS output ${theme}`, [`build-css`], function() {
      return gulp
        .src(`./dist/semantic.css`)
        .pipe(rename(`${theme}.css`))
        .pipe(gulp.dest(`../web/hello-world/src/semantic/build/`));
    });

    gulp.task(
      `Copy minimised CSS output ${theme}`,
      [`Copy CSS output ${theme}`],
      function() {
        return gulp
          .src(`./dist/semantic.min.css`)
          .pipe(rename(`${theme}.min.css`))
          .pipe(gulp.dest(`../web/hello-world/src/semantic/build/`));
      },
    );

    gulp.task(
      `Copy theme assets ${theme}`,
      [`Copy minimised CSS output ${theme}`],
      function() {
        return gulp
          .src(['./dist/themes/**/*'])
          .pipe(gulp.dest(`../web/hello-world/src/semantic/build/themes`));
      },
    );

    gulp.task(
      `Copy image assets ${theme}`,
      [`Copy theme assets ${theme}`],
      function() {
        return gulp
          .src(`./dist/themes/${theme}/assets/**/*`)
          .pipe(gulp.dest(`../web/hello-world/public/themes/${theme}/assets/`));
      },
    );

    // Dirty hack or now - needs to be changed to proper implementation later

    gulp.task(
      `Copy CSS output ${theme}2`,
      [`Copy image assets ${theme}`],
      function() {
        return gulp
          .src(`./dist/semantic.css`)
          .pipe(rename(`${theme}.css`))
          .pipe(gulp.dest(`../web/store-locator/src/semantic/build/`));
      },
    );

    gulp.task(
      `Copy minimised CSS output ${theme}2`,
      [`Copy CSS output ${theme}2`],
      function() {
        return gulp
          .src(`./dist/semantic.min.css`)
          .pipe(rename(`${theme}.min.css`))
          .pipe(gulp.dest(`../web/store-locator/src/semantic/build/`));
      },
    );

    gulp.task(
      `Copy theme assets ${theme}2`,
      [`Copy minimised CSS output ${theme}2`],
      function() {
        return gulp
          .src(['./dist/themes/**/*'])
          .pipe(gulp.dest(`../web/store-locator/src/semantic/build/themes`));
      },
    );

    gulp.task(
      `Copy image assets ${theme}2`,
      [`Copy theme assets ${theme}2`],
      function() {
        return gulp
          .src(`./dist/themes/${theme}/assets/**/*`)
          .pipe(
            gulp.dest(`../web/store-locator/public/themes/${theme}/assets/`),
          );
      },
    );

    // Dirty hack or now - needs to be changed to proper implementation later

    gulp.task(
      `Copy CSS output ${theme}3`,
      [`Copy image assets ${theme}2`],
      function() {
        return gulp
          .src(`./dist/semantic.css`)
          .pipe(rename(`${theme}.css`))
          .pipe(gulp.dest(`../web/grizzly-bear/src/semantic/build/`));
      },
    );

    gulp.task(
      `Copy minimised CSS output ${theme}3`,
      [`Copy CSS output ${theme}3`],
      function() {
        return gulp
          .src(`./dist/semantic.min.css`)
          .pipe(rename(`${theme}.min.css`))
          .pipe(gulp.dest(`../web/grizzly-bear/src/semantic/build/`));
      },
    );

    gulp.task(
      `Copy theme assets ${theme}3`,
      [`Copy minimised CSS output ${theme}3`],
      function() {
        return gulp
          .src(['./dist/themes/**/*'])
          .pipe(gulp.dest(`../web/grizzly-bear/src/semantic/build/themes`));
      },
    );

    gulp.task(
      `Copy image assets ${theme}3`,
      [`Copy theme assets ${theme}3`],
      function() {
        return gulp
          .src(`./dist/themes/${theme}/assets/**/*`)
          .pipe(
            gulp.dest(`../web/grizzly-bear/public/themes/${theme}/assets/`),
          );
      },
    );

    gulp.task(`Build complete for css ${theme}`, [
      `Copy image assets ${theme}3`,
    ]);

    tasks.push(`Build complete for css ${theme}`);
  }

  runSequence(tasks, callback);
};
