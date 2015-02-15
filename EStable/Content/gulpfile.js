var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  shell = require('gulp-shell'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  streamqueue = require('streamqueue'), //not sure if we'll need this yet
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  cache = require('gulp-cache'); //we should use this but can add it later on


gulp.task('css', function () {
  gulp.start('header_css');
  return gulp.src('src/sass/*.scss')
  .pipe(sass({ style: 'expanded' }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('header_css', function(){
  gulp.src('src/sass/header/**/*.scss')
  .pipe(sass({style: 'expanded'}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(concat('header.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'));
})


gulp.task('javascript', function(){
  return gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('wizard.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js'], {read: false})
  .pipe(clean());
});

// Watch
gulp.task('watch', function () {
  var cssWatcher = gulp.watch(['src/sass/**/*.scss'], ['css']);
  cssWatcher.on('change', function(event) {
      console.log(event.type, event.path);
  });

  var jsWatcher = gulp.watch(['src/js/**/*.js'], ['javascript']);
  jsWatcher.on('change', function(event) {
      console.log(event.type, event.path);
  });
});

//*****DEFAULT****//
gulp.task('default', ['clean'], function() {
    gulp.start('css', 'javascript');
});
