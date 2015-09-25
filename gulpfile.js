var gulp = require('gulp');

var concat = require('gulp-concat'),
    size = require('gulp-size'),
    sass = require('gulp-sass'),
    mincss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('jade'),
    gulpJade = require('gulp-jade'),
    katex = require('katex'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util');

gulp.task('javascript', function() {
    gulp.src([
        'bower_components/angular/angular.js'
        ])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('repo/js'))
        .pipe(size())
        .on('error', gutil.log)
});

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(size())
        .pipe(mincss())
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('repo/css'))
        .pipe(size());
});

jade.filters.katex = katex.renderToString;
jade.filters.shoutFilter = function (str) {
    return str + '!!!!';
}

gulp.task('jade', function () {
    return gulp.src('jade/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('repo/'));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['jade/*.jade','jade/app/*.jade'], ['jade']);
    gulp.watch(['scss/*.scss', 'scss/app/*.scss'], ['sass']);
});