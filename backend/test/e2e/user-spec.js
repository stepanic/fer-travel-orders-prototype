require('./sails-test-e2e-pre-config.js');

describe('User CRUD', function() {
  it('create-user', function(done) {
    request("http://localhost:1337/api/user").then(function(contents){
      console.log(contents[0].toJSON());
      done();
    }).catch(function(e){
      console.log(e);
    });
  });
});
