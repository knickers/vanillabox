module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		env: process.env,
		pkg: grunt.file.readJSON('package.json'),

		'closure-compiler': {
			frontend: {
				js: 'vanillabox/jquery.vanillabox.js',
				jsOutputFile: 'vanillabox/jquery.vanillabox-<%= pkg.version %>.min.js',
				noreport: true,
				options: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					externs: [
						'<%= env.CLOSURE_PATH %>/contrib/externs/jquery-1.7.js',
						'src/js/externs.js'
					]
				}
			}
		},
		jsdoc: {
			dist: {
				src: ['vanillabox/jquery.vanillabox.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		qunit: {
			all: ['test/**/*.html']
		},
		sass: {
			dist: {
				files: {
					'demo/style.css': 'src/css/demo/style.scss',
					'vanillabox/theme/bitter/vanillabox.css': 'src/css/theme/bitter/bitter.scss',
					'vanillabox/theme/bitter_frame/vanillabox.css': 'src/css/theme/bitter_frame/bitter_frame.scss'
				},
				options: {
					style: 'expanded'
				}
			}
		},
		watch: {
			css: {
				files: 'src/css/**/*.scss',
				tasks: ['sass']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');
};
