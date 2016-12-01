require('app-module-path').addPath(__dirname);
require('dotenv').config({ silent: true });

const path = require('path');
const gulp = require('gulp');

const makeNodemonTask = require('gulp-tasks/nodemon-task');
const makeTestTask = require('gulp-tasks/test-task');
const makeScriptTask = require('gulp-tasks/script-task');
const makeWebpackConfig = require('gulp-tasks/webpack-config');
const makeRevTask = require('gulp-tasks/rev-task');

const dist = path.join(__dirname, 'dist');
const isDevelopment = process.env.NODE_ENV === 'development';

gulp.task('script.plugin', makeScriptTask({
  webpackConfig: makeWebpackConfig({
    entry: path.join(__dirname, 'client', 'plugin', 'index.js'),
    output: dist,
    modules: [path.join(__dirname, 'client', 'plugin')],
    fileName: 'plugin',
    sassLoader: {
      includePaths: [path.resolve(__dirname, 'client', 'plugin', 'style')]
    },
    env: {
      NODE_ENV: process.env.NODE_ENV,
      SD_API_URL: process.env.SD_API_URL
    },
    isDevelopment
  }),
  isDevelopment
}));

gulp.task('test', makeTestTask({ paths: ['./app-modules/**/_spec.js', './server/**/_spec.js'] }));

gulp.task('nodemon', makeNodemonTask({
  watch: ['./app-modules', './server', 'app.js']
}));

gulp.task('rev', ['script.plugin'], makeRevTask({
  entry: ['./dist/*/*.js', './dist/*/*.css'],
  output: './dist'
}));

gulp.task('build', ['rev']);

gulp.task('default', ['server', 'serve.plugin']);
