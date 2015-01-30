module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
			server: {
				base: '/',
				hostname: 'localhost'
			}
		},

        clean: {
            scripts: ['js/scripts.js', 'js/scripts.min.js'],
            vendors: ['js/vendors.js', 'js/vendors.min.js'],
            angular_controllers: ['js/controllers/controllers.js'],
            angular_directives: ['js/directives/directives.js'],
            angular_filters: ['js/filters/filters.js'],
            angular_services: ['js/services/services.js'],
            styles: ['css/styles.css', 'css/styles.min.css']
        },

        // Concats all javascript and SASS
        concat: {
            scripts: {
                src: ['js/src/scripts/*.js'],
                dest: 'js/scripts.js'
            },
            vendors: {
                src: ['js/src/vendors/*.js'],
                dest: 'js/vendors.js'
            },
            angular_controllers: {
                src: ['js/controllers/src/*.js'],
                dest: 'js/controllers/controllers.js'
            },
            angular_directives: {
                src: ['js/directives/src/*.js'],
                dest: 'js/directives/directives.js'
            },
            angular_filters: {
                src: ['js/filters/src/*.js'],
                dest: 'js/filters/filters.js'
            },
            angular_services: {
                src: ['js/services/src/*.js'],
                dest: 'js/services/services.js'
            }
        },

        // Minifies javascript
        uglify: {
            scripts: {
                src: 'js/scripts.js',
                dest: 'js/scripts.min.js'
            },
            vendors: {
                src: 'js/vendors.js',
                dest: 'js/vendors.min.js'
            }
        },

        // Converts SASS to CSS
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    cacheLocation: 'css/src/.sass-cache'
                },
                files: {
                    'css/styles.css': 'css/src/vitamins.scss'
                }
            }
        },

        // Applies vendor prefixes to CSS
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            no_dest: {
                src: 'css/styles.css'
            }
        },

        // Minifies CSS
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css',
                src: ['styles.css'],
                dest: 'css',
                ext: '.min.css'
            }
        },

        // Watch command
        watch: {
            scripts: {
                files: 'js/src/scripts/**/*.js',
                tasks: ['clean:scripts', 'dist-scripts']
            },
            vendors: {
                files: 'js/src/vendors/**/*.js',
                tasks: ['clean:scripts', 'dist-vendors']
            },
            angular_controllers: {
                files: 'js/controllers/src/*.js',
                tasks: ['clean:angular_controllers', 'dist-angular_controllers']
            },
            angular_directives: {
                files: 'js/directives/src/*.js',
                tasks: ['clean:angular_directives', 'dist-angular_directives']
            },
            angular_filters: {
                files: 'js/filters/src/*.js',
                tasks: ['clean:angular_filters', 'dist-angular_filters']
            },
            angular_services: {
                files: 'js/services/src/*.js',
                tasks: ['clean:angular_services', 'dist-angular_services']
            },
            styles: {
                files: 'css/**/*.scss',
                tasks: ['clean:styles', 'dist-styles'],
                options: {
                    livereload: true,
                }
            }
        }

    });

    // Loads grunt dependencies
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Scripts distribution task
    grunt.registerTask('dist-scripts', ['clean:scripts', 'concat:scripts', 'uglify:scripts']);

    // Vendors distribution task
    grunt.registerTask('dist-vendors', ['clean:vendors', 'concat:vendors', 'uglify:vendors']);

    // Angular Controllers distribution task
    grunt.registerTask('dist-angular_controllers', ['clean:angular_controllers', 'concat:angular_controllers']);

    // Angular Directives distribution task
    grunt.registerTask('dist-angular_directives', ['clean:angular_directives', 'concat:angular_directives']);

    // Angular Filters distribution task
    grunt.registerTask('dist-angular_filters', ['clean:angular_filters', 'concat:angular_filters']);

    // Angular Services distribution task
    grunt.registerTask('dist-angular_services', ['clean:angular_services', 'concat:angular_services']);

    // Styles distribution task
    grunt.registerTask('dist-styles', ['clean:styles', 'sass', 'autoprefixer', 'cssmin']);

    // Full distribution task
    grunt.registerTask('dist', ['dist-scripts', 'dist-vendors', 'dist-angular_controllers', 'dist-angular_directives', 'dist-angular_filters', 'dist-angular_services', 'dist-styles']);

    // Default grunt task
    grunt.registerTask('default', ['dist', 'connect:server', 'watch']);

};