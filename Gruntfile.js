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
          '_source/assets/css/app.min.css': 'scss/app.scss'
        }
      }
    },

    uglify: {
      js: {
        files: {
          '_source/assets/js/app.min.js': [
            'bower_components/foundation/js/vendor/jquery.js',
            'bower_components/foundation/js/vendor/fastclick.js',
            'bower_components/foundation/js/foundation.js',
            'js/application.js'
          ],
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      uglify: {
        files: [
          'bower_components/**/*.js',
          'js/*.js'
        ],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass','uglify']);
  grunt.registerTask('default', ['build','watch']);
}

