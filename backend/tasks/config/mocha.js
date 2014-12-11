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
      // all describe blocks are run SYNC !!!
      'test/e2e/user-spec.js',  // should be executed before travel-order because travel-order use
                                // user object in association, look at global.share variable
                                // USE: travel-order
      'test/e2e/budget-source-spec.js', // USE: travel-order
      'test/e2e/currency-spec.js', // USE: travel-order, country
      'test/e2e/country-spec.js', // USE: travel-order
      'test/e2e/travel-order-item-spec.js', // USE: travel-order
      'test/e2e/travel-order-spec.js'
    ],
  }
});

grunt.loadNpmTasks('grunt-mocha-test');

};
