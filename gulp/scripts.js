var config = require('./config');
var gulp = require('gulp');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

function scripts(debug) {
    var debug = debug ? debug : false;
    
    var pipe = browserify({
        entries: config.src.js + '/main.js',
        debug: debug
    })
    .transform('debowerify')
    .transform('partialify')
    .bundle()
        .on("error", notify.onError(function (error) {
            return error.message;
        }))
        .pipe(source('main.js'))
        .pipe(buffer());
    if (!debug) {
        pipe.pipe(uglify())
    }
    pipe.pipe(gulp.dest(config.dest.js))
        .pipe(browserSync.stream())
        .pipe(size({
            title: 'scripts'
        }));
    return pipe;
}

gulp.task('scripts:prod', function () {
    return scripts(false);
});

gulp.task('scripts:dev', function () {
    return scripts(true);
});