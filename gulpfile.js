var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var debug = require('gulp-strip-debug');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var postCss = require('gulp-postcss');
var autoPrefixer = require('autoprefixer');
var connect = require('gulp-connect');

var devMod = process.env.NODE_ENV == 'development';
console.log(devMod);

var folder = {
    src: 'src/',
    dist: 'dist/'
} 
gulp.task('html', function (done) {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'));
    done();
})
gulp.task('css', function (done) {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoPrefixer()]))
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + 'css/'));
    done();
})
gulp.task('js', function (done) {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'));
    done();
})
gulp.task('image', function (done) {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'));
    done();
})
gulp.task('server', function (done) {
    connect.server({
        port: '9999',
        livereload: true,
    });
    done();
})
gulp.task('watch', function (done) {
    gulp.watch(folder.src + 'html/*', gulp.series('html'));
    gulp.watch(folder.src + 'css/*', gulp.series('css'));
    gulp.watch(folder.src + 'js/*', gulp.series('js'));
    done();
})

gulp.task('default', gulp.series('html', 'css', 'js', 'image', 'watch', 'server'));