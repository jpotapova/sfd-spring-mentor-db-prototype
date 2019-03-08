module.exports = function () {
    const gulp = require('gulp');
    const clean = require('gulp-clean');
    const config = require('../gulp.config.js')();

    return gulp.src(config.dist, {read: false})
        .pipe(clean());
};
