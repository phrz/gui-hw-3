'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('html', () => {
	gulp.src('**/*.html', { base: 'src' })
	.pipe(gulp.dest('build'));
});

gulp.task('config', () => {
	gulp.src(['**/*.json'])
});

gulp.task('clean', () => {
	return del(['build/*']);
});
