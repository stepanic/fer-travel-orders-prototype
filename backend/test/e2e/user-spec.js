require('./sails-test-e2e-pre-config.js');

describe('User CRUD', function() {
  it('create-user', function(done) {
    request({
      url: "http://localhost:1337/api/user",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        username:         'ferko',
        password:         'ferko123',
        confirmPassword:  'ferko123',
        firstName:        'Ferko',
        lastName:         'Ferkić',
        roles:            ['user', 'admin'],
        email:            'ferko@fer.hr'
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.username).to.equal('ferko');
      expect(body.password).to.be.undefined;
      expect(body.confirmPassword).to.be.undefined;
      expect(body.firstName).to.equal('Ferko');
      expect(body.lastName).to.equal('Ferkić');
      expect(body.roles).include('user');
      expect(body.roles).include('admin');
      expect(body.email).to.equal('ferko@fer.hr');

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});
