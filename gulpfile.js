let gulp = require('gulp'),
    pug = require('gulp-pug');

gulp.task('pug', function() {
    return gulp.src('views/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('views/**/*.pug', gulp.series('pug'));
});