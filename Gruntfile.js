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
				'css/print.css': 'styl/print.styl',
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

    csso: {
		files: {
			'css/screen_min.css': ['css/screen.css']
		}
	},

	watch: {
		style: {
			files: 'styl/*.styl',
			tasks: ['stylus', 'autoprefixer'],
		},
		// css: {
		// 	files: 'css/*.css',
		// 	tasks: ['csso'],
		// },
	},
 //    csscomb: {
 //        options: {
 //            config: 'csscomb.json'
 //        },
 //        files: {
 //            src: 'styl/screen.styl'
 //        },         grunt.loadNpmTasks('grunt-csscomb');
 //    }
});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask( 'default', ['watch']);
	grunt.registerTask( 'release', ['stylus', 'autoprefixer', 'csso']);
};





