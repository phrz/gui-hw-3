'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

let build_dir = './build/';
let source_dir = './src/';

let paths = {
	html: source_dir + '**/*.html',
	css: source_dir + '**/*.css',
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

gulp.task('ts', (done) => {
	let project = ts.createProject('tsconfig.json');
	gulp
	.src(paths.ts, { base: source_dir })
	.pipe(project())
	.pipe(gulp.dest(build_dir));
	done();
});

gulp.task('bootstrap', (done) => {
	gulp.src('./node_modules/bootstrap/dist/**/*.*', { base: 'node_modules/bootstrap/dist' })
	.pipe(gulp.dest(build_dir + 'vendor/bootstrap'));
	done();
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
	setTimeout(() => {
		browserSync.init({
			server: build_dir
		});
	}, 100);
});

gulp.task('build', gulp.series('bootstrap', gulp.parallel('html', 'css', 'ts')));
gulp.task('default', gulp.parallel('build'));
gulp.task('run', gulp.series('clean','build','serve','watch'));
