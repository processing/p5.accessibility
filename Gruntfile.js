module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/createHTMLstructure.js' ,'src/_data.js','src/registry.js','src/interceptorHelperFunctions.js','src/baseInterceptor.js', 'src/entities/entity.min.js', 'src/ntc.min.js' , 'src/textInterceptor/*.js','src/gridInterceptor/*.js','src/soundInterceptor/*.js'],
        // the location of the resulting JS file
        dest: 'dist/p5-accessibility.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! p5-accessibility */\n'
      },
      dist: {
        files: {
          'dist/p5-accessibility.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
     files: ['<%= concat.dist.src %>'],
     tasks: ['concat']
   }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
