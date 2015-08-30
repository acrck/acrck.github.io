module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    banner: " ____   __ __    ___  ____   ___ \n" +
            "|    \ |  |  |  /  _]|    \ /   \\n" +
            "|  o  )|  |  | /  [_ |  D  )     |\n" +
            "|     ||  |  ||    _]|    /|  O  |\n" +
            "|  O  ||  :  ||   [_ |    \|     |\n" +
            "|     ||     ||     ||  .  \     |\n" +
            "|_____| \__,_||_____||__|\_|\___/\n" +
            "____   __ __  ___ ___  ____   __ __  ___ ___\n" +
            "|    \ |  |  ||   |   ||    \ |  |  ||   |   |\n" +
            "|  o  )|  |  || _   _ ||  o  )|  |  || _   _ |\n" +
            "|     ||  |  ||  \_/  ||     ||  |  ||  \_/  |\n" +
            "|  O  ||  :  ||   |   ||  O  ||  :  ||   |   |\n" +
            "|     ||     ||   |   ||     ||     ||   |   |\n" +
            "|_____| \__,_||___|___||_____| \__,_||___|___|\n" ,

    bsSettings: {
      url: 'crck.arbeit',
    },

    dirs: {
      css: 'assets/css',
      js: 'assets/js'
    },

    jsFiles:  [ '<%= dirs.js %>/vendor/jquery/dist/jquery.js',
                '<%= dirs.js %>/vendor/underscore/underscore.js',
                '<%= dirs.js %>/vendor/modernizr/modernizr.js',

                '<%= dirs.js %>/source/main.js',
              ],


    watch: {
      options: {
        spawn: false
      },
      js: {
        files: ['<%= jsFiles %>', '!<%= dirs.js %>/build/**/*.js'],
        tasks: ['concat:dev', 'bsReload:js']
      },
    },


    concat: {
      options: {
        seperator: ';',
        banner: '/*!\n <%= banner %> \n*/\n'
      },
      dev: {
        options: {
          sourceMap: true
        },
        src: '<%= jsFiles %>',
        dest: '<%= dirs.js %>/build/app.js'
      }
    },

    uglify: {
      main: {
        options: {
          banner: '/*!\n <%= banner %> \n*/\n'
        },
        files: {
          '<%= dirs.js %>/build/app.min.js': '<%= jsFiles %>'
        }
      }
    },

    autoprefixer: {
        options: {
            browsers: ['last 2 versions', 'ie 9']
        },
        css: {
            src: '<%= dirs.css %>/main.css',
            dest: '<%= dirs.css %>/main.css'
        }
    },

    browserSync: {
        dev: {
            options: {
                watchTask: true,
                background: true,
                proxy: '<%= bsSettings.url %>',
                open: 'external',
                browser: 'google chrome'
            }
        }
    },

    bsReload: {
        css: {
            reload: '<%= dirs.css %>/main.css'
        },
        js: {
          reload: '<%= dirs.js %>/build/app.js'
        },
        all: {
            reload: true
        }
    },
  });

  grunt.registerTask('default', ['browserSync:dev', 'watch']);
  grunt.registerTask('deploy', ['uglify']);
};
