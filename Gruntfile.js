/*
 * grunt-template-cache
 * https://github.com/fisherman/template-cache
 *
 * Copyright (c) 2016 Fisherman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
       // Configuration to be run (and then tested).
    'angular-template-cache': {
      default_options : {
        options: {
              startTag: '<!--TEMPLATE_START-->',
              endTag: '<!--TEMPLATE_END-->',
              appRoot: '',
              relative: true,
              fullName : false // test/fixtures/123.html  or 123.html   in script id 
          },
          files: {
            'index.html': ['test/fixtures/123.html','test/fixtures/testing.html']
           }
      }
          
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('template-cache', ['angular-template-cache']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['angular-template-cache']);

};
