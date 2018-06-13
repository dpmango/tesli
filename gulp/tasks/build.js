var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');
var config      = require('../config');

// set build evnironment first and perform build() function
gulp.task('build:production', function(callback) {
  config.setEnv('production');
  config.logEnv();
  build(callback);
});

gulp.task('build:development', function(callback) {
  config.setEnv('development');
  config.logEnv();
  build(callback);
});


function build(callback) {
  runSequence(
    'clean:dist',
    'sass',
    'sprite:svg',
    'sprite:png',
    'html',
    // 'pug',
    'javascript',
    'images',
    'copy',
    // 'list-pages',
    callback
  );
}
