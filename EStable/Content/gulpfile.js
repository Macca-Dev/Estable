var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    streamqueue = require('streamqueue'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache');


gulp.task('css', function () {
      return gulp.src('src/sass/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});




gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js'], {read: false})
    .pipe(clean());


// Watch
gulp.task('watch', function () {
    var cssWatcher = gulp.watch(['src/sass/**/*.scss'], ['styles']);
    cssWatcher.on('change', function(event) {
        console.log(event.type, event.path);
    });

    // var jsWatcher = gulp.watch(['src/js/**/*.js'], ['scripts']);
    // jsWatcher.on('change', function(event) {
    //     console.log(event.type, event.path);
    // });
 });
});

//*****DEFAULT****//
gulp.task('default', ['clean'], function() {
    gulp.start('css');
});
