module.exports = function(grunt) {
// Configure a mochaTest task
grunt.config.set('mochaTest', {
  test: {
    options: {
      ui: 'bdd',
      reporter: 'list',
      quiet: false, // Optionally suppress output to standard out (defaults to false)
      clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
      timeout: 2000
    },
    src: [
      'test/e2e/user-spec.js'
    ],
  }
});

grunt.loadNpmTasks('grunt-mocha-test');

};
