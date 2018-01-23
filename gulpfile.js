'use-strict'

var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    tsProject = ts.createProject("tsconfig.json");


gulp.task('clean:lib', () => {
    return del(['./src/**/*.js', './dist/**/*.js', './*.config.js']);
});

gulp.task('tsc', () => {
    return tsProject.src().pipe(tsProject());
});

gulp.task('default', ['clean:lib', 'tsc'], () => {

});