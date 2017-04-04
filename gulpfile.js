'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');

let build_dir = './build/';
let source_dir = './src/';

gulp.task('html', () => {
	gulp.src(source_dir + '**/*.html', { base: source_dir })
	.pipe(gulp.dest(build_dir));
});

gulp.task('ts', () => {
	let project = ts.createProject('tsconfig.json');
	let tsc = gulp
		.src(source_dir + '**/*.ts', { base: source_dir })
		.pipe(project())
		.pipe(gulp.dest(build_dir));
});

gulp.task('bootstrap', () => {
	gulp.src('./node_modules/bootstrap/dist/**/*.*', { base: 'node_modules/bootstrap/dist' })
	.pipe(gulp.dest(build_dir + 'vendor/bootstrap'));
});

gulp.task('clean', () => {
	return del([build_dir + '*']);
});

gulp.task('sync', () => {
	browserSync.init({
		server: {
			baseDir: build_dir
		}
	});
});

gulp.task('build', ['html', 'ts', 'bootstrap']);
gulp.task('run', ['clean', 'build', 'sync']);

gulp.task('default', ['build']);
