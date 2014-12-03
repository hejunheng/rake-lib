var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var transport = require('gulp-cmd-transport')
var cssmin = require('gulp-minify-css')
var rimraf = require('gulp-rimraf')
var gulpif = require('gulp-if')
var rename = require('gulp-rename')
var clone = require('gulp-clone')
var cloneSink = clone.sink()

var path = require('path')

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

gulp.task('clean', function() {
    return gulp.src(paths.dist.path).pipe(rimraf())
})

gulp.task('build-gallery', ['clean'], function() {
    return gulp.src(paths.source.gallery)
        .pipe(gulpif(skipSeaFiles, transport()))
        .pipe(cloneSink)
        .pipe(rename(function(path) {
            path.basename += '.debug'
        }))
        .pipe(cloneSink.tap())
        .pipe(gulpif(skipDebugFiles, uglify()))
        .pipe(gulp.dest(paths.dist.gallery))
})

gulp.task('watch', function() {
    gulp.watch(paths.source.gallery, ['build-gallery'])
})

gulp.task('default', ['clean', 'build-gallery', 'watch'])