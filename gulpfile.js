const yaml = require('gulp-yaml')
const gulp = require('gulp')
const { parallel, series } = gulp
const del = require('del')
const minify = require('gulp-jsonminify')

function genSounds(cb) {
  gulp
    .src('./sounds.yml')
    .pipe(yaml({ space: 2 }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/'))
  cb()
}

function genCategories(cb) {
  gulp
    .src('./categories.yml')
    .pipe(yaml({ space: 2 }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/'))
  cb()
}

function genNotice(cb){
  gulp
    .src('./notice.yml')
    .pipe(yaml({ space: 2 }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/'))
  cb()
}

function copyAssets(cb) {
  gulp.src('*.*', { read: false }).pipe(gulp.dest('./dist/assets'))
  gulp.src('./assets/**/*').pipe(gulp.dest('./dist/assets'))
  cb()
}

function noJekyll(cb) {
  gulp.src('.nojekyll').pipe(gulp.dest('./dist'))
  cb()
}

function clean(cb) {
  del(['dist/*'])
  cb()
}

const genTask = parallel(genSounds, genCategories, genNotice, noJekyll, copyAssets)

const defaultTask = series(clean, genTask)

exports.default = defaultTask
