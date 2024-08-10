const { src, dest, watch, parallel, series } = require('gulp')

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const fileinclude = require('gulp-file-include');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');


function htmlInclude() {
    return src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest('./app'))
        .pipe(browserSync.stream());
}



function fonts() {
    return src('./src/fonts/*.woff2',{ encoding: false })
        .pipe(dest('./app/fonts'))
}


const resources = () => {
    return src('./src/resources/*.*', { encoding: false })
      .pipe(dest('./app/resources'))
  }



const images = () => {
    return src([`./src/images/**/*.{jpg,jpeg,png,svg,webp,avif,mp4,gif}`], { encoding: false })
   
      .pipe(dest('./app/images'))
  };



function svgSprites() {
    return src('./src/images/**.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'

                }
            }
        }))
        .pipe(dest('./app/images'))
}

const scripts = () => {

    return src(
        ['./src/js/global.js', './src/js/components/**.js', './src/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify().on("error", notify.onError()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream());
}


function styles() {
    return src('./src/scss/**/*.scss')

        .pipe(sourcemaps.init())
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(scss({ outputStyle: 'expanded' }))
        // .pipe(scss({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/css'), { sourcemaps: '.' })
        .pipe(browserSync.stream());
}


function stylesProd() {
    return src('./src/scss/**/*.scss')

        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(scss({ outputStyle: 'expanded' }))
        // .pipe(scss({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('./app/css'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['app/*'])
}




function jsDev(cb) {
    return src('./src/js/main.js')
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpack({
            mode: "development",
            output: {
              filename: 'main.js',
            },
            module: {
                rules: [
                  {
                    test: /\.css$/i,
                    use: ["style-loader","css-loader"],
                  },
                  {
                                    test: /\.(js)$/,
                                    exclude: /(node_modules)/,
                                    loader: 'babel-loader',
                                    options: {
                                      presets: ['@babel/preset-env']
                                    }
                                  }
                ],
              }, devtool:'source-map'
          }))
        .pipe(dest('./app/js'))
        .pipe(browserSync.reload({stream: true}));
}

function jsProd(cb) {
    return src('./src/js/main.js')
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpack({
            mode: "production",
            output: {
              filename: 'main.js',
            },
            module: {
                rules: [
                  {
                    test: /\.css$/i,
                    use: ["style-loader","css-loader"],
                  },
                ],
              }
          }))
        .pipe(dest('./app/js'))
        .pipe(browserSync.reload({stream: true}));
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
    });
    watch(['./src/scss/**/*.scss'], styles);
    watch(['./src/js/**/*.js'], jsDev);
    watch('./src/partials/*.html', htmlInclude);
    watch('./src/*.html', htmlInclude);
    watch('./src/images/*.{jpg,jpeg,png,svg,webp,avif,mp4,gif}', images);
    watch('./src/images/**/*.{jpg,jpeg,png,webp,avif,mp4,gif}', images);
    watch('./src/fonts/*.woff2', fonts);
    watch('./src/resources/**', resources);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching

exports.images = images
exports.svgSprites = svgSprites
exports.fonts = fonts
exports.clean = clean
exports.htmlInclude = htmlInclude


exports.default = series(clean, htmlInclude, jsDev, styles, images, fonts, resources,watching);
exports.build = series(clean, htmlInclude, jsProd, stylesProd, images, fonts, resources);
