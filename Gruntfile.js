module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '_source/assets/css/app.css': 'scss/app.scss'
        }
      }
    },

    uglify: {
      js: {
        files: {
          '_source/assets/js/app.min.js': [
            'bower_components/foundation/js/foundation.js',
            'bower_components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js'
          ],
          '_source/assets/js/jquery.min.js': 'bower_components/jquery/dist/jquery.js',
          '_source/assets/js/modernizr.min.js': 'bower_components/modernizr/modernizr.js'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}