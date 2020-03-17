var del = require('del');
var flatten = require('gulp-flatten');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge');
var replace = require('gulp-replace');
var webpack = require('webpack');


// region Clean

gulp.task('clean:dist:amd', () => {
    return del([__dirname + '/dist/amd']);
});

gulp.task('clean:build:amd:normal', () => {
    return del([__dirname + '/build/amd/normal']);
});

gulp.task('clean:build:amd:minified', () => {
    return del([__dirname + '/build/amd/minified']);
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

// region Webpack

gulp.task('webpack:amd:normal', gulp.series([
    'clean:build:amd:normal'
], (done) => {
    webpackBuild(require('./webpack.config.amd'), done);
}));

gulp.task('webpack:amd:minified', gulp.series([
    'clean:build:amd:minified'
], (done) => {
    webpackBuild(require('./webpack.config.amd'), done, {
        minify: true
    });
}));

gulp.task('webpack:amd', gulp.series([
    'webpack:amd:normal',
    'webpack:amd:minified'
]));

gulp.task('webpack:bower:normal', gulp.series([
    'clean:build:bower:normal'
], (done) => {
    webpackBuild(require('./webpack.config.bower'), done);
}));

gulp.task('webpack:bower:minified', gulp.series([
    'clean:build:bower:minified'
], (done) => {
    webpackBuild(require('./webpack.config.bower'), done, {
        minify: true
    });
}));

gulp.task('webpack:bower', gulp.series([
    'webpack:bower:normal',
    'webpack:bower:minified'
]));

gulp.task('webpack:browser:normal', gulp.series([
    'clean:build:browser:normal'
], (done) => {
    webpackBuild(require('./webpack.config.browser'), done);
}));

gulp.task('webpack:browser:minified', gulp.series([
    'clean:build:browser:minified'
], (done) => {
    webpackBuild(require('./webpack.config.browser'), done, {
        minify: true
    });
}));

gulp.task('webpack:browser', gulp.series([
    'webpack:browser:normal',
    'webpack:browser:minified'
]));

gulp.task('webpack', gulp.series([
    'webpack:amd',
    'webpack:browser'
]));

// endregion

// region Sourcemaps

gulp.task('sourcemap:copy:amd', gulp.series(['webpack:amd'], () => {
    return gulp.src('build/amd/**/*.map')
        .pipe(flatten())
        .pipe(replace(__dirname + '\\', ''))
        .pipe(replace(__dirname.replace(/\\/g, '/') + '/', ''))
        .pipe(gulp.dest('dist/amd/'));
}));

gulp.task('sourcemap:copy:bower', gulp.series(['webpack:bower'], () => {
    return gulp.src('build/bower/**/*.map')
        .pipe(flatten())
        .pipe(replace(__dirname + '\\', ''))
        .pipe(replace(__dirname.replace(/\\/g, '/') + '/', ''))
        .pipe(gulp.dest('dist/bower/'));
}));

gulp.task('sourcemap:copy:browser', gulp.series(['webpack:browser'], () => {
    return gulp.src('build/browser/**/*.map')
        .pipe(flatten())
        .pipe(replace(__dirname + '\\', ''))
        .pipe(replace(__dirname.replace(/\\/g, '/') + '/', ''))
        .pipe(gulp.dest('dist/browser/'));
}));

// endregion

// region Transpile

gulp.task('clean:lib', () => {
    return del([__dirname + '/lib']);
});

gulp.task('build:transpile', gulp.series([
    'clean:lib'
], () => {
    var babel = require('gulp-babel');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(__dirname + '/lib'));
}));
// endregion

// region Build

gulp.task('build:amd', gulp.series([
    'clean:dist:amd',
    'webpack:amd',
    'sourcemap:copy:amd'
], function() {
    return gulp
        .src(__dirname + '/build/amd/**/*.js')
        .pipe(flatten())
        .pipe(gulp.dest(__dirname + '/dist/amd'));
}));

gulp.task('build:bower', gulp.series([
    'clean:dist:bower',
    'webpack:bower',
    'sourcemap:copy:bower'
], function() {
    return gulp.src(__dirname + '/build/bower/**/*.js')
        .pipe(flatten())
        .pipe(gulp.dest(__dirname + '/dist/bower'));
}));

gulp.task('build:browser', gulp.series([
    'clean:dist:browser',
    'webpack:browser',
    'sourcemap:copy:browser'
], function() {
    return gulp.src(__dirname + '/build/browser/**/*.js')
        .pipe(flatten())
        .pipe(gulp.dest(__dirname + '/dist/browser'));
}));

gulp.task('build', gulp.series([
    'build:amd',
    'build:bower',
    'build:browser',
    'build:transpile'
]));

// endregion

// region Helpers

function webpackBuild(config, callback, options) {
    options = typeof options !== 'undefined' && options !== null ? options : {};

    // Clone configuration
    config = merge(true, {
        plugins: []
    }, config);

    // Process options
    if(options.minify) {
        // Enable uglify plugin
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
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
