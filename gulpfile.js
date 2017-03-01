'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const path = require('path');


let sassSrc = 'src/sass/**/*.scss';
gulp.task('default', () => {
    console.info('hello');
    browserSync.init({
        server: {
            baseDir: "./src",
            port: 3000
        },
        ui: false,
    });
    gulp.src('./src/**/*.html')
        .pipe(watch('./src/**/*.html'))
        .on('change', browserSync.reload);
    gulp.src('./src/js/**/*.js')
        .pipe(watch('./src/js/**/*.js'))
        .on('change', browserSync.reload);
    gulp.watch(sassSrc, ['sass']);
});

gulp.task('sass', function () {
    return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});