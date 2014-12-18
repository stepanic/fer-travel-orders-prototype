module.exports = function (grunt) {
  grunt.registerTask('test:e2e', ['mochaTest:e2e']);
	grunt.registerTask('test', ['test:e2e']);
};
