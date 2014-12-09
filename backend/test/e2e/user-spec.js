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
        title:            "prof. dr. sc.",
        confirmPassword:  'ferko123',
        firstName:        'Ferko',
        lastName:         'Ferkić',
        roles:            ['user', 'admin'],
        email:            'ferko@fer.hr',
        department:       'ZPR'
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;
      expect(body.username).to.equal('ferko');
      expect(body.password).to.be.undefined;
      expect(body.confirmPassword).to.be.undefined;
      expect(body.firstName).to.equal('Ferko');
      expect(body.lastName).to.equal('Ferkić');
      expect(body.roles).include('user');
      expect(body.roles).include('admin');
      expect(body.email).to.equal('ferko@fer.hr');
      expect(body.department).to.equal('ZPR');

      share.user = body;
      share.user.password = "ferko123"

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});
