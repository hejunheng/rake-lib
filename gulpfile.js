var gulp = require('gulp')
var watch = require('gulp-watch')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var transport = require('gulp-cmd-transport')
var cssmin = require('gulp-minify-css')
var rimraf = require('gulp-rimraf')
var gulpif = require('gulp-if')
var rename = require('gulp-rename')
var clone = require('gulp-clone')

var paths = {
    dist: {
        path: './dist',
        gallery: './dist/gallery'
    },
    source: {
        gallery: ['./gallery/**/*.js']
    },
    fake: './fake/gallery'
}

function skipSeaFiles(file) {
    return !~file.path.indexOf('seajs')
}

function skipDebugFiles(file) {
    return !~file.path.indexOf('.debug')
}

gulp.task('clean', ['clean-gallery'])

// clean gallery dir
gulp.task('clean-gallery', function() {
    return gulp.src(paths.dist.gallery).pipe(rimraf())
})

// build gallery
gulp.task('build-gallery', ['clean-gallery'], function() {
    var cloneSink = clone.sink()

    return gulp.src(paths.source.gallery)
        // cmd transport
        .pipe(gulpif(skipSeaFiles, transport()))
        // duplicate source files
        .pipe(cloneSink)
        // rename debug files
        .pipe(rename(function(path) {
            path.basename += '.debug'
        }))
        //
        .pipe(cloneSink.tap())
        .pipe(gulpif(skipDebugFiles, uglify()))
        .pipe(gulp.dest(paths.dist.gallery))
})

gulp.task('watch', function() {
    gulp.watch(paths.source.gallery, ['build-gallery'])
})

gulp.task('default', ['clean', 'build-gallery', 'watch'])