module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    clean: ['dist'],

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/'},
          {expand: true, cwd: 'src', src: ['res/**/*'], dest: 'dist/'},
          {expand: true, cwd: 'src', src: ['*.ico'], dest: 'dist/'}
        ]
      }
    },

    less: {
      development: {
        options: {
          paths: ['css']
        },
        files: {
          'src/css/style.css': 'src/less/importer.less'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['style.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // Add in the array more JS files if you want grunt to minify them
    uglify: {
      my_target: {
        files: {
          'dist/js/built.min.js': ['src/js/configure.js', 'src/js/scripts.js']
        }
      }
    },

    watch: {
      files: {
        files: ['src/*.html'],
        tasks: ['copy']
      },
      styles: {
        files: ['src/less/*.less'],
        tasks: ['less', 'cssmin']
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 9191,
          base: 'dist'
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'less', 'cssmin', 'uglify', 'connect', 'watch']);
};
