var gulp = require('gulp'),
qunit = require('gulp-qunit');
gulp.task('test', function() {
return gulp.src('./qunit.html')
.pipe(qunit());
});
gulp.task('default', function() {

    gulp.run('test');

});