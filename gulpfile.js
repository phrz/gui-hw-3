'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const pump = require('pump');
const babel = require('gulp-babel');

let build_dir = './build/';
let source_dir = './src/';

let paths = {
	html: source_dir + '**/*.html',
	css: source_dir + '**/*.css',
	systemjs: [
		'node_modules/systemjs/dist/system.js',
		source_dir + 'systemjs.config.js',
		source_dir + 'systemjs-angular-loader.js'
	],
	vendor: [
		'node_modules/core-js/client/core.min.js',
		'node_modules/zone.js/dist/zone.js',
		'node_modules/reflect-metadata/Reflect.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js'
	],
	ts: source_dir + '**/*.ts'
}

gulp.task('html', (done) => {
	gulp
	.src(paths.html, { base: source_dir })
	.pipe(gulp.dest(build_dir));
	done();
});

gulp.task('css', (done) => {
	gulp
	.src(paths.css, { base: source_dir })
	.pipe(gulp.dest(build_dir))
	.pipe(browserSync.reload({stream: true}));
	done();
});

gulp.task('vendor', (done) => {
	gulp.src(paths.vendor)
	.pipe(gulp.dest(build_dir + 'vendor'));
	done();
});

gulp.task('systemjs', (done) => {
	gulp.src(paths.systemjs)
	.pipe(gulp.dest(build_dir + 'vendor'));
	done();
});

gulp.task('ts', (done) => {
	let project = ts.createProject(source_dir + 'tsconfig.json');
	gulp
	.src(paths.ts, { base: source_dir })
	.pipe(sourcemaps.init())
	.pipe(project())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(build_dir));
	done();
});

gulp.task('bootstrap', (done) => {
	gulp.src(['./node_modules/bootstrap/dist/css/*.*', './node_modules/bootstrap/dist/fonts/*.*'],
	{ base: 'node_modules/bootstrap/dist' })
	.pipe(gulp.dest(build_dir + 'vendor/bootstrap'));
	done();
});

gulp.task('clean', () => {
	return del([build_dir + '*']);
});

gulp.task('watch', () => {
	let rld = (file) => { browserSync.reload(); };
	gulp.watch(paths.html, ['html']).on('change', rld);
	gulp.watch(paths.js, ['js']).on('change', rld);
	gulp.watch(paths.css, ['css']).on('change', rld);
	gulp.watch(paths.ts, ['ts']).on('change', rld);
});

gulp.task('serve', () => {
	setTimeout(() => {
		browserSync.init({
			server: build_dir
		});
	}, 100);
});

gulp.task('build', gulp.series('bootstrap', gulp.parallel('html', 'css', 'ts', 'vendor', 'systemjs')));
gulp.task('default', gulp.parallel('build'));
gulp.task('run', gulp.series('clean','build','serve','watch'));
