'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('html', () => {
	gulp.src('/**/*.html', { base: 'src' })
	.pipe(gulp.dest('build'));
});

gulp.task('bootstrap', () => {
	gulp.src('/**/*.*', { base: 'node_modules/bootstrap/dist' })
	.pipe(gulp.dest('build'));
});

gulp.task('config', () => {
	gulp.src(['**/*.json'])
});

gulp.task('clean', () => {
	return del(['build/*']);
});

gulp.task('serve', () => {

});

gulp.task('build', ['html', 'config', 'bootstrap']);
gulp.task('run', ['build', 'serve'])

gulp.task('default', ['build']);
