var chai = require("chai");
chai.use(require('chai-things'));
var expect = chai.expect;

var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

var moment = require('moment-timezone');

var Sails = require('sails');
var sails;

var Helper = require("../../lib/helpers.js");

var share = {}

global.console.log.verbose = Helper.verbose
global.request = request
global.parseJSON = Helper.parseJSON
global.expect = expect
global.share = share
global.moment = moment

// Global before hook
before(function (done) {
  this.timeout(6000);
  console.log("Lifting sails");
  // Lift Sails with test database
  Sails.lift(require('rc')('sails')
  , function(err, sailsInstance){
    if (err)
      return done(err);
    console.log("Sails lifted");
    sails = sailsInstance;
    done(err, sails);
  });
});


// Global after hook
after(function (done) {
  console.log('Lowering sails'); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});



