var globbing = require('gulp-css-globbing');
var config = require('./config');
var gulp = require('gulp');
var util = require('gulp-util');
var size = require('gulp-size');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

function styles(debug) {
    var debug = debug ? debug : false;
    var pipe = gulp.src(config.src.scss + '/**/*.{sass,scss}') 
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass()
        .on('error', notify.onError(function (error) {
            return error.message;
        })))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))

    if (!debug) {
        pipe.pipe(minify());
    }

    pipe.pipe(gulp.dest(config.dest.css))
    .pipe(browserSync.stream())
    .pipe(size({title: 'styles'}));

    return pipe;
}

gulp.task('styles:prod', function () {
    return styles(false);
});

gulp.task('styles:dev', function () {
    return styles(true);
});