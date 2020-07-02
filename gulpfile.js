const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const kit = require("gulp-kit");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const zip = require("gulp-zip");
const del = require("del");
const plumber = require("gulp-plumber");
const notifier = require("gulp-notifier");

notifier.defaults({
    messages: {
        sass: "CSS was successfully compiled",
        js: "Javascript is ready!",
        kit: "HTML was delivered"
    },
    prefix: "=====",
    suffix: "=====",
    exclusions: ".map"
})

filesPath = {
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    imgs: './src/img/**/*.+(png|jpg|gif|svg)',
    html: './html/**/*.kit'
}

// scss
gulp.task("sass", function(done){
    return gulp
        .src([filesPath.sass, '!./src/sass/widget.scss'])
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        // .pipe(rename('./main.min.css'))
        .pipe(rename(function(path) {
            if(!path.extname.endsWith('.map')) {
                path.basename += '.min'
            }
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notifier.success("sass"))
    done();
})

// javascript
gulp.task("javascript", function(done){
    return gulp
        .src(filesPath.js)
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notifier.success("js"))
    done();
})

// images optimisation
gulp.task("imagemin", function(done){
    return (
        gulp.src(filesPath.imgs)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./dist/img/'))
    )
    done();
})

// HTML Kit templating
gulp.task("kit", function(done){
    return (
        gulp.src(filesPath.html)
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(kit())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(notifier.success("kit"))
    )
    done();
})

// watch task with browserSync
gulp.task("watch", function(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        // browser is optional
        browser: "google chrome"
    })
    gulp
        .watch(
            [
                filesPath.sass, 
                filesPath.html,
                filesPath.js,
                filesPath.imgs
            ], 
            gulp.parallel(["sass", "javascript", "imagemin", "kit"])
        )
        .on("change", browserSync.reload);
})

// clear image cache
gulp.task("clear-cache", function(){
    return cache.clearAll()
})

// serve
gulp.task("serve", gulp.parallel(["sass", "javascript", "imagemin", "kit"]))

// gulp default command
gulp.task("default", gulp.series(["serve", "watch"]))

// zip
gulp.task("zip", function(done){
    return (
        gulp.src(['./**/*', '!./node_modules/**/*'])
        .pipe(zip('project.zip'))
        .pipe(gulp.dest('./'))
    )
    done();
})

// clean 'dist'
gulp.task("clean-dist", function(done){
    return del(['./dist/**/*'])
    done();
})

// standard task template
// gulp.task("name", function(done){
//     return (

//     )
//     done();
// })