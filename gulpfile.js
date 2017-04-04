'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');

let build_dir = './build/';
let source_dir = './src/';

let paths = {
	html: source_dir + '**/*.html',
	css: source_dir + '**/*.css',
	ts: source_dir + '**/*.ts'
}

gulp.task('html', () => {
	gulp.src(paths.html, { base: source_dir })
	.pipe(gulp.dest(build_dir));
});

gulp.task('css', () => {
	gulp.src(paths.css, { base: source_dir })
	.pipe(gulp.dest(build_dir))
	.pipe(browserSync.stream());
});

gulp.task('ts', () => {
	let project = ts.createProject('tsconfig.json');
	let tsc = gulp
		.src(paths.ts, { base: source_dir })
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

gulp.task('watch', () => {
	let rld = (file) => { browserSync.reload(); };
	gulp.watch(paths.html, ['html']).on('change', rld);
	gulp.watch(paths.css, ['css']).on('change', rld);
	gulp.watch(paths.ts, ['ts']).on('change', rld);
});

gulp.task('serve', () => {
	browserSync.init({
		server: build_dir
	});
	gulp.start('watch');
});

gulp.task('run', ['build-and-clean'], () => { gulp.start('serve'); });

gulp.task('build-and-clean', ['clean'], () => { gulp.start('build'); });
gulp.task('build', ['html', 'css', 'ts', 'bootstrap']);
gulp.task('default', ['build']);
