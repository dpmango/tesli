var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');
var buffer      = require('vinyl-buffer');
var imagemin    = require('gulp-imagemin');
var config      = require('../../config');

gulp.task('sprite:png', function() {
    var spriteData = gulp.src(config.src.iconsPng + '/*.png')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite-png.scss',
        imgPath: '../img/sprite.png',
        retinaSrcFilter: config.src.iconsPng + '/*@2x.png',
        retinaImgName: 'sprite@2x.png',
        retinaImgPath: '../img/sprite@2x.png',
        padding: 10,
        algorithm: 'binary-tree',
        cssTemplate: __dirname + '/sprite.template.handlebars'
    }));
    spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(config.dest.img));
    spriteData.css
        .pipe(gulp.dest(config.src.sassGen));
});

gulp.task('sprite:png:watch', function() {
    gulp.watch(config.src.iconsPng + '/*.png', ['sprite:png']);
});
