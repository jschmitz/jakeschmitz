/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    es = require('event-stream'),
    gzip = require('gulp-gzip');

var distDir = 'dist/';

// HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(minifyhtml())
//    .pipe(gzip())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'html task complete' }));
});

// Styles
gulp.task('styles', function() {

  return gulp.src(['src/bootstrap/css/*.min*','src/styles/*'])
    .pipe(minifycss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gzip())
    .pipe(notify({ message: 'Styles task complete' }));

});

//Bootsrtap
gulp.task('bootstrap', function() {
  return gulp.src('src/bootstrap/css/*.min*')
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(distDir + 'bootstrap/css/'))
    .pipe(notify({ message: 'Bootstrap task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(distDir + 'images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del([distDir + 'bootstrap/css',  distDir + '*', distDir + 'styles', distDir + 'images'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'styles', 'images');
});

