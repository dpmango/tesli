var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var config      = require('../config');

// build html files with file-include
gulp.task('html', function() {
  gulp.src(config.src.pages+'/*.{html, php}')
    .pipe(fileinclude({
      prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('html:watch', function() {
  gulp.watch(config.src.pages+'/**/*.{html,php}', ['html']);
});
