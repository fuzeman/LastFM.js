var del = require('del');
var flatten = require('gulp-flatten');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge');
var webpack = require('webpack');


gulp.task('build', [
    'build:amd',
    'build:bower',
    'build:browser',
    'build:transpile'
]);

gulp.task('webpack', [
    'webpack:amd',
    'webpack:browser'
]);

// region Transpile

gulp.task('build:transpile', [
    'clean:lib'
], () => {
    var babel = require('gulp-babel');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(__dirname + '/lib'));
});

gulp.task('clean:lib', () => {
    return del([__dirname + '/lib']);
});

// endregion

// region AMD

gulp.task('build:amd', [
    'clean:dist:amd',
    'webpack:amd'
], function() {
    return gulp
        .src([
            __dirname + '/build/amd/**/*.js',
            __dirname + '/build/amd/**/*.js.map'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(
            __dirname + '/dist/amd'
        ));
});

gulp.task('webpack:amd', [
    'webpack:amd:normal',
    'webpack:amd:minified'
]);

gulp.task('webpack:amd:normal', [
    'clean:build:amd:normal'
], (done) => {
    webpackBuild(require('./webpack.config.amd'), done);
});

gulp.task('webpack:amd:minified', [
    'clean:build:amd:minified'
], (done) => {
    webpackBuild(require('./webpack.config.amd'), done, {
        minify: true
    });
});

gulp.task('clean:build:amd:normal', () => {
    return del([__dirname + '/build/amd/normal']);
});

gulp.task('clean:build:amd:minified', () => {
    return del([__dirname + '/build/amd/minified']);
});

gulp.task('clean:dist:amd', () => {
    return del([__dirname + '/dist/amd']);
});

// endregion

// region Bower

gulp.task('build:bower', [
    'clean:dist:bower',
    'webpack:bower'
], function() {
    return gulp
        .src([
            __dirname + '/build/bower/**/*.js',
            __dirname + '/build/bower/**/*.js.map'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(
            __dirname + '/dist/bower'
        ));
});

gulp.task('webpack:bower', [
    'webpack:bower:normal',
    'webpack:bower:minified'
]);

gulp.task('webpack:bower:normal', [
    'clean:build:bower:normal'
], (done) => {
    webpackBuild(require('./webpack.config.bower'), done);
});

gulp.task('webpack:bower:minified', [
    'clean:build:bower:minified'
], (done) => {
    webpackBuild(require('./webpack.config.bower'), done, {
        minify: true
    });
});

gulp.task('clean:build:bower:normal', () => {
    return del([__dirname + '/build/bower/normal']);
});

gulp.task('clean:build:bower:minified', () => {
    return del([__dirname + '/build/bower/minified']);
});

gulp.task('clean:dist:bower', () => {
    return del([__dirname + '/dist/bower']);
});

// endregion

// region Browser

gulp.task('build:browser', [
    'clean:dist:browser',
    'webpack:browser'
], function() {
    return gulp
        .src([
            __dirname + '/build/browser/**/*.js',
            __dirname + '/build/browser/**/*.js.map'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(
            __dirname + '/dist/browser'
        ));
});

gulp.task('webpack:browser', [
    'webpack:browser:normal',
    'webpack:browser:minified'
]);

gulp.task('webpack:browser:normal', [
    'clean:build:browser:normal'
], (done) => {
    webpackBuild(require('./webpack.config.browser'), done);
});

gulp.task('webpack:browser:minified', [
    'clean:build:browser:minified'
], (done) => {
    webpackBuild(require('./webpack.config.browser'), done, {
        minify: true
    });
});

gulp.task('clean:build:browser:normal', () => {
    return del([__dirname + '/build/browser/normal']);
});

gulp.task('clean:build:browser:minified', () => {
    return del([__dirname + '/build/browser/minified']);
});

gulp.task('clean:dist:browser', () => {
    return del([__dirname + '/dist/browser']);
});

// endregion

// region Helpers

function webpackBuild(config, callback, options) {
    options = typeof options !== 'undefined' && options !== null ? options : {};

    // Clone configuration
    config = merge(true, config);

    // Process options
    if(options.minify) {
        // Enable uglify plugin
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }));

        // Update destination directory
        config.output.path += '/minified';

        // Update filename
        config.output.filename = 'lastfm.min.js';
    } else {
        config.output.path += '/normal';
    }

    // Build module
    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({}));
        callback();
    });
}

// endregion
