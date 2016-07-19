var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var size = require('gulp-size');
var config = require('./config');
var del = require('del');

gulp.task('images', function() {
    del.sync([config.dest.images]);
    return gulp.src(config.src.images + '/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.dest.images))
        .pipe(size({
            title: "images"
        }));
});
