'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	stylus: {
		compile: {
			options: {
				'include css': true,
			},
			files: {
				'css/screen.css': 'styl/screen.styl',
			}
		}
	},

	autoprefixer: {
        options: {
             browsers: ['last 3 version', 'ie >= 8']
        },
        files: {
            src: 'css/screen.css'
        },
    },

	watch: {
		files: 'styl/*.styl',
		tasks: ['stylus', 'autoprefixer'],
	},
});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask( 'default', ['watch']);
};