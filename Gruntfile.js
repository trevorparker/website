module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'bower_components/font-awesome/fonts',
          src: '*',
          dest: '_source/assets/fonts/'
        }]
      }
    },

    sass: {
      options: {
        includePaths: [
          'bower_components/foundation/scss',
          'bower_components/font-awesome/scss'
        ]
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
      copy: {
        files: [
          'bower_components/font-awesome/fonts/*'
        ],
        tasks: ['copy']
      },
      sass: {
        files: [
          'scss/**/*.scss',
          'bower_components/font-awesome/scss/*'
        ],
        tasks: ['sass']
      },
      uglify: {
        files: [
          'bower_components/**/*.js',
          'js/*.js'
        ],
        tasks: ['uglify']
      },
      hashres: {
        files: [
          '_source/assets/js/modernizr.min.js',
          '_source/assets/js/app.min.js',
          '_source/assets/css/app.min.css'
        ],
        tasks: ['hashres']
      }
    },

    hashres: {
      options: {
        fileNameFormat: '${name}.${ext}?${hash}',
        renameFiles: false
      },
      dist: {
        src: [
          '_source/assets/img/favicon*',
          '_source/assets/js/modernizr.min.js',
          '_source/assets/js/app.min.js',
          '_source/assets/css/app.min.css'
        ],
        dest: [
          '_source/_includes/head.html',
          '_source/_includes/foundation_js.html'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hashres');

  grunt.registerTask('build', ['copy','sass','uglify','hashres']);
  grunt.registerTask('default', ['build','watch']);
}

